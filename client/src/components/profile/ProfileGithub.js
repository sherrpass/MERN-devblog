import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRepos } from "../../actions/profile";

const ProfileGithub = ({ repos, username, getRepos }) => {
    useEffect(() => {
        getRepos(username);
    }, [getRepos, username]);
    return (
        <div className="profile-github">
            <h2 className="test-primary my1">Github Repos</h2>
            {repos.map((repo) => (
                <div key={repo.id} className="repo bg-white p-1 my-1">
                    <div>
                        <h4>
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: "20px" }}
                            >
                                {repo.name}
                            </a>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div>
                        <ul>
                            <li className="badge badge-primary">
                                Stars: {repo.stargazers_count}
                            </li>
                            <li className="badge badge-dark">
                                Watchers: {repo.watchers_count}
                            </li>
                            <li className="badge badge-light">
                                Forks: {repo.forks_count}
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

ProfileGithub.propTypes = {
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    getRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        repos: state.profile.repos,
    };
};

export default connect(mapStateToProps, { getRepos })(ProfileGithub);
