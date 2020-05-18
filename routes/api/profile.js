const express = require("express");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");
const config = require("config");
const axios = require("axios");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

const router = express.Router();

// @route GET api/profile/me
// @desc get logged in user's profile
// @access private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res
                .status(400)
                .json({ msg: "No profile for user is found." });
        }
        res.json(profile);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Server error.");
    }
});

// @route POST api/profile
// @desc create or update a user profile
// @access private
router.post(
    "/",
    [
        auth,
        [
            check("status", "Status is required")
                .not()
                .isEmpty(),
            check("skills", "Skills are required")
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        //validate all required fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //destructure all possible fields form req
        const {
            company,
            location,
            website,
            bio,
            skills,
            status,
            githubusername,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook,
        } = req.body;
        //build profile fields
        const profileFields = {
            company,
            location,
            website:
                website === "" ? "" : normalize(website, { forceHttps: true }),
            bio,
            skills: Array.isArray(skills)
                ? skills.map(
                      (skill) =>
                          skill[0].toUpperCase() + (skill[1] && skill.slice(1))
                  )
                : skills.split(",").map((skill) => {
                      skill.trim();
                      return (
                          skill[0].toUpperCase() + (skill[1] && skill.slice(1))
                      );
                  }),
            status,
            githubusername,
            social: {
                youtube,
                twitter,
                instagram,
                linkedin,
                facebook,
            },
        };
        for (const [key, value] of Object.entries(profileFields.social)) {
            if (value !== "") {
                profileFields.social[key] = normalize(
                    profileFields.social[key],
                    { forceHttps: true }
                );
            }
        }

        try {
            const profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true }
            );
            res.json(profile);
        } catch (error) {
            console.error(error);
            return res.status(500).send("Server Error");
        }
    }
);

// @route GET api/profile
// @desc get all profiles
// @access public
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", [
            "name",
            "avatar",
        ]);
        res.json(profiles);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Server error.");
    }
});

// @route GET api/profile/user/:user_id
// @desc get profile by the user_id
// @access public
router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id,
        }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res.status(400).json({ msg: "Profile not found." });
        }
        res.json(profile);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Server error.");
    }
});

// @route DEL api/profile
// @desc delete logged in profile, user, and his/her posts
// @access private
router.delete("/", auth, async (req, res) => {
    try {
        //@TODO delete posts by user
        await Post.deleteMany({ user: req.user.id });
        //delete profile
        await Profile.findOneAndDelete({ user: req.user.id });

        //delete user
        await User.findByIdAndDelete({ _id: req.user.id });
        res.json({ msg: "Profile, User and Posts deleted" });
    } catch (e) {
        console.error(e);
        return res.status(500).send("Server error.");
    }
});

// @route PUT api/profile/experience
// @desc add experience to profile
// @access private
router.put(
    "/experience",
    [
        auth,
        [
            check("title", "Title is required")
                .not()
                .isEmpty(),
            check("company", "Company required")
                .not()
                .isEmpty(),
            check("from", "Start date is required")
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            from,
            to,
            location,
            current,
            description,
        } = req.body;

        const newExperience = {
            title,
            company,
            from,
            to,
            location,
            current,
            description,
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExperience);
            await profile.save();
            res.json(profile);
        } catch (e) {
            console.error(e);
            return res.status(500).send("Server error.");
        }
    }
);

// @route DEL api/profile/experience/:expid
// @desc delete exprience by exp_id
// @access private
router.delete("/experience/:exp_id", auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(404).json({ msg: "Profile not found." });
        }
        console.log(req.params.exp_id);
        console.log(profile);

        const index = profile.experience.findIndex(
            (experience) => experience._id.toString() === req.params.exp_id
        );
        console.log(index);
        //its not using the default indexOf array method. Mongoose wraps the array with MongooseArray which has its own indexOf method. This method allows a objectId to be equal to a string version of the ObjectId.
        if (index === -1) {
            return res.status(404).json({ msg: "Experience not found." });
        }
        profile.experience.splice(index, 1);
        await profile.save();
        res.json(profile);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Server error.");
    }
});
module.exports = router;

// @route PUT api/profile/education
// @desc add education to profile
// @access private
router.put(
    "/education",
    [
        auth,
        [
            check("school", "School required")
                .not()
                .isEmpty(),
            check("degree", "Degree required")
                .not()
                .isEmpty(),
            check("fieldofstudy", "Field of Study required.")
                .not()
                .isEmpty(),
            check("from", "Start date is required")
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        } = req.body;

        const newEducation = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(newEducation);
            await profile.save();
            res.json(profile);
        } catch (e) {
            console.error(e);
            return res.status(500).send("Server error.");
        }
    }
);

// @route DEL api/profile/education/:edu_id
// @desc delete education by edu_id
// @access private
router.delete("/education/:edu_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(404).json({ msg: "Profile not found." });
        }
        const ids = profile.education.map((education) => {
            return education._id;
        });
        const index = ids.indexOf(req.params.edu_id);
        //its not using the default indexOf array method. Mongoose wraps the array with MongooseArray which has its own indexOf method. This method allows a objectId to be equal to a string version of the ObjectId.
        if (index === -1) {
            return res.status(404).json({ msg: "Education not found." });
        }
        profile.education.splice(index, 1);
        await profile.save();
        res.json(profile);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Server error.");
    }
});
module.exports = router;

// @route GET api/profile/github/:username
// @desc get github repos by username
// @access public
router.get("/github/:username", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.github.com/users/${req.params.username}/repos`,
            {
                params: {
                    per_page: "5",
                    sort: "created:asc",
                    client_id: config.get("githubClientID"),
                    client_secret: config.get("githubClientSecret"),
                },
                // headers: {
                //     "user-agent": "node.js",
                // },
            }
        );

        res.json(response.data);
    } catch (e) {
        if (e.response.status === 404) {
            return res.status(404).json({ msg: "Github user not found." });
        }
        console.error(e);
        return res.status(500).send("Server error.");
    }
});
module.exports = router;
