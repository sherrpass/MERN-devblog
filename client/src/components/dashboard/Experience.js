import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience = [], deleteExperience }) => {
    const experiences = experience.map(({ _id, title, company, from, to }) => {
        return (
            <tr key={_id}>
                <td>{company}</td>
                <td className="hide-sm">{title}</td>
                <td className="hide-sm">
                    <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
                    {to === null ? (
                        " Now"
                    ) : (
                        <Moment format="YYYY/MM/DD">{to}</Moment>
                    )}
                </td>
                <td>
                    <button
                        onClick={() => deleteExperience(_id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    });

    if (experience.length > 0) {
        return (
            <Fragment>
                <h2 className="my-2">Experience Credentials</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className="hide-sm">Title</th>
                            <th className="hide-sm">Duration</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{experiences}</tbody>
                </table>
            </Fragment>
        );
    } else {
        return (
            <>
                <h2 className="my-2">Experience Credentials</h2>
                <div>No Experience credentials added so far.</div>
            </>
        );
    }
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
