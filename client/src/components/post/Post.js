import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import Spinner from "../layout/spinner";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const Post = ({ post: { post, loading }, getPost, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);
    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to="/posts" className="btn">
                Back to Posts
            </Link>
            <PostItem post={post} displayActions={false} />
            <CommentForm postID={post._id} />
            <h1>Comments</h1>
            {post.comments.map((comment) => {
                return (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        postID={post._id}
                    />
                );
            })}
        </Fragment>
    );
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        post: state.post,
    };
};

export default connect(mapStateToProps, { getPost })(Post);
