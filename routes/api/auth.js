const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const router = express.Router();

// @route GET api/auth
// @desc user authentication, get user info
// @access public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).send("Server Error");
    }
});

// @route GET api/auth
// @desc user login, sends auth token
// @access public
router.post(
    "/",
    [
        check("email", "A valid email is required").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            //check if email exists
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials." }] });
            }
            //Verify password
            const isMatch = await bcrypt.compare(
                password,
                existingUser.password
            );

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials." }] });
            }
            //gen jwt
            const payload = {
                user: {
                    id: existingUser.id,
                },
            };
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    expiresIn: 360000, // change in production STAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                },
                (err, token) => {
                    if (err) throw err;
                    res.send({ token });
                }
            );
        } catch (e) {
            console.error(e);
            return res.status(500).json({ errors: [{ msg: "Server Error" }] });
        }
    }
);

module.exports = router;
