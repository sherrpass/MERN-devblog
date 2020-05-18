import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
    edu: { school, degree, from, to, description, fieldofstudy },
}) => {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
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
                <strong>Degree: </strong>
                {degree}
            </p>
            <p>
                <strong>Field of Study: </strong>
                {fieldofstudy}
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

ProfileEducation.propTypes = {
    edu: PropTypes.object.isRequired,
};

export default ProfileEducation;
