import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import Spinner from "../layout/spinner";
import ProfileItem from "./ProfileItem";

const Profiles = ({ profile: { loading, profiles }, getProfiles }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
    const profileList = () => {
        return profiles.map((profile) => {
            return <ProfileItem key={profile._id} profile={profile} />;
        });
    };
    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className="large text-primary">Developer</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i>
                        {` `}
                        Browse and connect with other developers
                    </p>
                    {profiles.length === 0 ? (
                        <Fragment>
                            <h4>No profiles found...</h4>
                        </Fragment>
                    ) : (
                        <div className="profiles">{profileList()}</div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
