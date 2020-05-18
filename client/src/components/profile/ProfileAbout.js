import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: { name },
    },
}) => {
    const listSkills = () => {
        return skills.map((skill, index) => {
            return (
                <div key={index} className="p-1">
                    <i className="fa fa-check"></i>
                    {` `} {skill}
                </div>
            );
        });
    };
    return (
        <div className="profile-about bg-light p-2">
            <h2 className="text-primary">{`${
                name.trim().split(" ")[0]
            }s bio`}</h2>
            <p>{bio}</p>
            <div className="line"></div>
            {skills.length > 0 && (
                <Fragment>
                    <h2 className="text-primary">Skill Set</h2>
                    <div className="skills">{listSkills()}</div>
                </Fragment>
            )}
        </div>
    );
};

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
