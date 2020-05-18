import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import setAlert from "../../actions/alert";

const PostForm = ({ addPost, setAlert }) => {
    const [formData, setFormData] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        addPost({ text: formData });
        setFormData("");
    };
    return (
        <div class="post-form">
            <div class="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form
                class="form my-1"
                onSubmit={(e) => {
                    onSubmit(e);
                }}
            >
                <textarea
                    value={formData}
                    onChange={(e) => {
                        setFormData(e.target.value);
                    }}
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    required
                ></textarea>
                <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
};

export default connect(null, { addPost, setAlert })(PostForm);
