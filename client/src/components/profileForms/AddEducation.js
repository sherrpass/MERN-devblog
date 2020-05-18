import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExporEdu } from "../../actions/profile";
import { Link } from "react-router-dom";

const AddEducation = ({ history, addExporEdu }) => {
    const initialState = {
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
    };
    const [formData, setFormData] = useState(initialState);
    const [disableToField, toggleDisableToField] = useState(false);

    const {
        school,
        degree,
        from,
        to,
        current,
        description,
        fieldofstudy,
    } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        addExporEdu(formData, history, false);
    };
    return (
        <>
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any
                developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School"
                        name="school"
                        required
                        value={school}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree"
                        name="degree"
                        required
                        value={degree}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Field of Study"
                        name="fieldofstudy"
                        value={fieldofstudy}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date *</h4>
                    <input
                        type="date"
                        name="from"
                        value={from}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            checked={current}
                            value={current}
                            onChange={(e) => {
                                setFormData({ ...formData, current: !current });
                                toggleDisableToField(!disableToField);
                            }}
                        />{" "}
                        Current Job
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        disabled={disableToField ? "disabled" : ""}
                        value={to}
                        onChange={(e) => onChange(e)}
                    />
                    {/* if disabled, value of to in formData will be null */}
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={(e) => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </>
    );
};

AddEducation.propTypes = {
    addExporEdu: PropTypes.func.isRequired,
};

export default connect(null, { addExporEdu })(AddEducation);
