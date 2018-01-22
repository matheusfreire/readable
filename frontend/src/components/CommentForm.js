import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router'
import { add } from '../actions/comments';

class PostForm extends Component {

    state = {
        showButton: true,
        showFormComplete: false
    }

    submit = (values) => {
        const uuidv4 = require('uuid/v4');
        this.props.add({ id: uuidv4(), timestamp: Date.now(), title: values.title, author: values.author, parentId: this.props.parentId }).then(() => {
            this.setState({ showFormComplete: false, showButton: true })
        })
    }

    
    clickOpenForm = () =>{
        this.setState({showButton: false})
    }
    
    render() {
        if (this.state.redirectToHome) {
            return (
                <button onClick={() => clickOpenForm}></button>
            )
        } else {
            const { handleSubmit, reset, submitting } = this.props
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

PostForm = reduxForm({ form: 'postForm', validate })(PostForm)

const mapStateToProps = state => ({ post: state.postReducer.post, categories: state.categoriesReducer.categories })
const mapDispatchToProps = { add, getAllCategories }
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
