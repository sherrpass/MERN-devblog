import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ addComment, postID }) => {
    const [text, setText] = useState("");
    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form
                class="form my-1"
                onSubmit={(e) => {
                    e.preventDefault();
                    addComment({ text: { text }, postID });
                    setText("");
                }}
            >
                <textarea
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    value={text}
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Comment on this post"
                    required
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postID: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(CommentForm);
