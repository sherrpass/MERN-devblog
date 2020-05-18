import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
    profile: {
        status,
        company,
        location,
        website,
        social,
        user: { avatar, name },
    },
}) => {
    const hasSocial = () => {
        if (social) {
            let icons = [];
            for (const key in social) {
                icons.push(
                    <a
                        key={key}
                        href={social[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className={`fab fa-${key} fa-2x`}></i>
                    </a>
                );
            }
            if (icons.length > 0) {
                return icons;
            }
        }
    };
    return (
        <div className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={avatar}
                alt={`Avatar of ${name}`}
            />
            <h1 className="large">{name}</h1>
            <p className="lead">
                {status}
                {company && <span> at {company}</span>}
            </p>
            <p>{location}</p>
            <div className="icons my-1">
                {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                    </a>
                )}
                {hasSocial()}
            </div>
        </div>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileTop;
