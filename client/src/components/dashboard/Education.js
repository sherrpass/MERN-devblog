import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education = [], deleteEducation }) => {
    const educations = education.map(({ _id, school, degree, from, to }) => {
        return (
            <tr key={_id}>
                <td>{school}</td>
                <td className="hide-sm">{degree}</td>
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
                        onClick={() => deleteEducation(_id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    });

    if (education.length > 0) {
        return (
            <Fragment>
                <h2 className="my-2">Education Credentials</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Duration</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{educations}</tbody>
                </table>
            </Fragment>
        );
    } else {
        return (
            <>
                <h2 className="my-2">Education Credentials</h2>
                <div>No Education credentials added so far.</div>
            </>
        );
    }
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
