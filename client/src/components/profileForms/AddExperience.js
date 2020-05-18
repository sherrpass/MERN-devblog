import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExporEdu } from "../../actions/profile";
import { Link } from "react-router-dom";

const AddExperience = ({ history, addExporEdu }) => {
    const initialState = {
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
    };
    const [formData, setFormData] = useState(initialState);
    const [disableToField, toggleDisableToField] = useState(false);

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description,
    } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        console.log("here");

        e.preventDefault();
        addExporEdu(formData, history, true);
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
                        placeholder="* Job Title"
                        name="title"
                        required
                        value={title}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        required
                        value={company}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
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
                        placeholder="Job Description"
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

AddExperience.propTypes = {
    addExporEdu: PropTypes.func.isRequired,
};

export default connect(null, { addExporEdu })(AddExperience);
