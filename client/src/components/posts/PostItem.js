import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike, deleteLike, deletePost, loading } from "../../actions/post";
import Moment from "react-moment";

const PostItem = ({
    addLike,
    deleteLike,
    deletePost,
    post: { _id: id, user, name, avatar, text, likes, comments, date },
    auth,
    displayActions = true,
    loading,
}) => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt={`Avatar of ${name}`}
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1" style={{ marginRight: "20px" }}>
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                {displayActions && (
                    <Fragment>
                        <button
                            onClick={() => {
                                addLike(id);
                            }}
                            type="button"
                            className="btn btn-light"
                        >
                            <i className="fas fa-thumbs-up"></i>{" "}
                            <span>{likes.length > 0 && likes.length}</span>
                        </button>
                        <button
                            onClick={() => {
                                deleteLike(id);
                            }}
                            type="button"
                            className="btn btn-light"
                        >
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link
                            to={`/posts/${id}`}
                            onClick={() => {
                                loading();
                            }}
                            className="btn btn-primary"
                        >
                            Discussion{" "}
                            {comments.length > 0 && (
                                <span className="comment-count">
                                    {comments.length}
                                </span>
                            )}
                        </Link>
                        {auth.user._id === user && (
                            <button
                                onClick={() => {
                                    deletePost(id);
                                }}
                                type="button"
                                className="btn btn-danger"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    );
};

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    deleteLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    displayActions: PropTypes.bool,
    loading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, {
    addLike,
    deleteLike,
    deletePost,
    loading,
})(PostItem);
