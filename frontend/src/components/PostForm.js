import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add } from '../actions/post';
import { Field, reduxForm } from 'redux-form';
import {getAllCategories} from '../actions/categories'

class PostForm extends Component {


    componentWillMount(){
        this.props.getAllCategories()
    }

    submit = (title, body,author, category) => {
        const uuidv4 = require('uuid/v4');
        this.props.add({id: uuidv4(),timestamp: Date.now(),title: title, body: body, author: author, category:category}).then(() => {

        })
    }
    
    render() {
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
                    <label>Categories</label>
                    <div>
                        <Field name="category" component="select">
                            <option value="">Select a category...</option>
                            {this.props.categories.map((c, idx) => (
                                <option value={c.path} key={idx}>
                                    {c.name}
                                </option>
                            ))}
                        </Field>
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
    if (!values.body) {
        errors.body = 'Body required'
    }
    if (!values.author) {
        errors.author = 'Author required'
    }
    if (!values.category) {
        errors.category = 'Category required'
    }
    return errors
}

PostForm = reduxForm({ form: 'postForm', validate })(PostForm)

const mapStateToProps = state => ({ post: state.postReducer.post,categories: state.categoriesReducer.categories })
const mapDispatchToProps = { add, getAllCategories }
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
