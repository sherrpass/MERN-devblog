import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileByID } from "../../actions/profile";
import Spinner from "../layout/spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
    match,
    auth,
    profile: { profile, loading },
    getProfileByID,
}) => {
    useEffect(() => {
        getProfileByID(match.params.id);
    }, [getProfileByID, match.params.id]);
    const editProfile = () => {
        if (
            auth.isAuthenticated &&
            !auth.loading &&
            auth.user._id === profile.user._id
        ) {
            return (
                <Link to="/edit-profile" className="btn btn-dark">
                    Edit Profile
                </Link>
            );
        }
    };
    const experienceList = () => {
        return profile.experience.map((exp) => {
            return <ProfileExperience key={exp._id} exp={exp} />;
        });
    };
    const educationList = () => {
        return profile.education.map((edu) => {
            return <ProfileEducation key={edu._id} edu={edu} />;
        });
    };
    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">
                        Back to Profiles
                    </Link>
                    {editProfile()}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0 ? (
                                experienceList()
                            ) : (
                                <h4>No Experience Credentials.</h4>
                            )}
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0 ? (
                                educationList()
                            ) : (
                                <h4>No Education Credentials.</h4>
                            )}
                        </div>
                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername} />
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    match: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfileByID: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profile,
    };
};

export default connect(mapStateToProps, { getProfileByID })(Profile);
