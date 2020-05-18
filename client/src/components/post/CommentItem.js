import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
    auth,
    deleteComment,
    comment: { user, name, avatar, _id, text, date },
    postID,
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
                {auth.user._id === user && (
                    <button
                        onClick={() => {
                            deleteComment({ postID, commentID: _id });
                        }}
                        type="button"
                        className="btn btn-danger"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { deleteComment })(CommentItem);
