import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
    exp: { company, title, location, from, to, description },
}) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment>
                {to ? (
                    <span>
                        {" "}
                        - <Moment format="YYYY/MM/DD">{to}</Moment>
                    </span>
                ) : (
                    " - Now"
                )}
            </p>
            <p>
                <strong>Position: </strong>
                {title}
            </p>
            <p>
                {location && (
                    <Fragment>
                        <strong>Location: </strong>
                        {location}
                    </Fragment>
                )}
            </p>
            <p>
                {description && (
                    <Fragment>
                        <strong>Description: </strong>
                        {description}
                    </Fragment>
                )}
            </p>
        </div>
    );
};

ProfileExperience.propTypes = {
    exp: PropTypes.object.isRequired,
};

export default ProfileExperience;
