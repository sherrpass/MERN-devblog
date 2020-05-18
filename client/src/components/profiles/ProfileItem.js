import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
    profile: { _id, user, status, company, location, skills },
}) => {
    return (
        <div className="profile bg-light">
            <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="round-img"
            />
            <div>
                <h2>{user.name}</h2>
                <p>
                    {status}
                    {company && <span> at {company}</span>}
                </p>
                {location && <p>{location}</p>}
                <Link to={`/profile/${user._id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            <ul>
                {skills.map((skill, index) => {
                    return (
                        <li className="text-primary" key={index}>
                            <i className="fas fa-check"></i>
                            {` `}
                            {skill}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
