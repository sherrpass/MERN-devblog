import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner";
import Experience from "./Experience";
import Education from "./Education";
import { deleteUser } from "../../actions/profile";

const Dashboard = ({
    auth: { user },
    profile: { loading, profile },
    getCurrentProfile,
    deleteUser,
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return loading && profile === null ? (
        <Spinner />
    ) : (
        <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user">Welcome {user && user.name}</i>
            </p>
            {profile !== null ? (
                <>
                    <Link to="/edit-profile" className="btn btn-light">
                        <i className="fas fa-user-circle text-primary"></i> Edit
                        Profile
                    </Link>
                    <Link to="/add-experience" className="btn btn-light">
                        <i className="fab fa-black-tie text-primary"></i> Add
                        Experience
                    </Link>
                    <Link to="/add-education" className="btn btn-light">
                        <i className="fas fa-graduation-cap text-primary"></i>{" "}
                        Add Education
                    </Link>
                    <Experience experience={profile.experience}></Experience>
                    <Education education={profile.education}></Education>
                    <div className="my-2">
                        <button
                            className="btn btn-danger"
                            onClick={() => deleteUser()}
                        >
                            <i className="fas fas-user-minus"></i>
                            Delete Account
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p>
                        You have not yet setup a profile, please add some info.
                    </p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create a profile
                    </Link>
                </>
            )}
        </>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profile,
    };
};

export default connect(mapStateToProps, { getCurrentProfile, deleteUser })(
    Dashboard
);
