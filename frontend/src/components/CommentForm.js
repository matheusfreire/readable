import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { create } from '../actions/comments';
import PropTypes from 'prop-types'

class CommentForm extends Component {

    static propTypes = {
        parentId: PropTypes.string.isRequired,
    }

    submit = (values) => {
        const uuidv4 = require('uuid/v4');
        this.props.add({ id: uuidv4(), timestamp: Date.now(), title: values.title, author: values.author, parentId: this.props.parentId }).then(() => {
            this.props.closeModal();
        })
    }

    render() {
        const { handleSubmit,submitting, reset } = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <div>
                    <label>Title</label>
                    <div>
                        <Field name="title" component="input" type="text" placeholder="Title" />
                    </div>
                </div>
                <div>
                    <label>Author</label>
                    <div>
                        <Field name="author" component="input" type="text" placeholder="Title" />
                    </div>
                </div>

                <div>
                    <label>Body</label>
                    <div>
                        <Field name="body" component="input" type="textarea" placeholder="Body" />
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={submitting}>
                        Submit
                            </button>
                    <button type="button" disabled={submitting} onClick={reset}>
                        Clear Values
                            </button>
                </div>
            </form>
        )
    }
}

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Title required'
    }
    if (!values.author) {
        errors.author = 'Author required'
    }

    return errors
}

CommentForm = reduxForm({ form: 'commentForm', validate })(CommentForm)

const mapStateToProps = state => ({ comment: state.commentReducer.comment })
const mapDispatchToProps = { create }
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
