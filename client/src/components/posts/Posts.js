import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        console.log("post useeffect");

        getPosts();
    }, [getPosts]);
    return (
        <Fragment>
            <h1 class="large text-primary">Posts</h1>
            <p class="lead">
                <i class="fas fa-user"></i> Welcome to the community!
            </p>
            <PostForm />
            <div className="posts">
                {loading ? (
                    <Spinner />
                ) : (
                    posts.map((post) => {
                        return <PostItem key={post._id} post={post} />;
                    })
                )}
            </div>
        </Fragment>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        post: state.post,
    };
};

export default connect(mapStateToProps, { getPosts })(Posts);
