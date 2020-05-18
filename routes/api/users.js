const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

const router = express.Router();

// @route POST api/users
// @desc register users
// @access public
router.post(
    "/",
    [
        check("name", "Name is required")
            .not()
            .isEmpty(),
        check("email", "A valid email is required").isEmail(),
        check(
            "password",
            "Password needs to be at least 6 chars long"
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password, name } = req.body;
        try {
            //check if email is unique
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }
            //retrieve gravatar
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm",
            });
            //create user instance
            const user = new User({
                name,
                email,
                password,
                avatar,
            });
            //gen password hash w bcrypt
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            //save user into db
            await user.save(); //.save will modify the user document that it is called on to provide other properties like _id and date that is defined by default by the model/ db

            //gen jwt
            const payload = {
                user: {
                    id: user.id,
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
