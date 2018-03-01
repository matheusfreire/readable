import React, { Component } from 'react';

import {compose} from 'redux';
import { connect } from 'react-redux';
import { add, update, get } from '../actions/post';
import { Field, reduxForm } from 'redux-form';
import { getAllCategories } from '../actions/categories';
import { withRouter } from 'react-router-dom';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import swal from 'sweetalert';

const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom,
    value
}) => (
        <TextField
            hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            value={value}
            {...input}
            {...custom}
        />
    )

const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => (
        <SelectField
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            onChange={(event, index, value) => input.onChange(value)}
            children={children}
            {...custom}
        />
    )
const style = {
    margin: 12,
};

class PostForm extends Component {

    state = {
        loading: true,
        editPost: false,
    }

    componentWillMount() {
        if (this.props.match.params.post_id !== undefined) {
            this.props.get(this.props.match.params.post_id).then(() => {
                this.setState({ loading: false, editPost: true })
                this.handleInitialize()
            });
        } else {
            this.setState({ loading: false })
        }
        this.props.getAllCategories()
    }

    handleInitialize() {
        const initData = {
            "title": this.props.post.title,
            "body": this.props.post.body,
            "author": this.props.post.author,
            "category": this.props.post.category,
        };
        this.props.initialize(initData);
    }


    showSwal(post, message) {
        swal("Succes", message, "success").then((value) => {
            this.redirectToPost(post)
        });
    }


    submit = (values) => {
        if (this.state.editPost) {
            this.props.update({ id: this.props.match.params.post_id, title: values.title, body: values.body, category: values.category }).then((res) => {
                this.showSwal(res.post,"Post updated successfully")
            })
        } else {
            const uuidv4 = require('uuid/v4');
            this.props.add({ id: uuidv4(), timestamp: Date.now(), title: values.title, body: values.body, author: values.author, category: values.category }).then((res) => {
                this.showSwal(res.post,"Post added successfully")
            })
        }
    }

    redirectToPost(post) {
        let link = `/${post.category}/${post.id}`;
        this.props.history.push(link);
    }

    reset = () => {
        this.props.history.push('/');
    }


    render() {

        const { handleSubmit } = this.props
        return (
            <div>
                {this.state.loading ?
                    (<CircularProgress />) :
                    (<form onSubmit={handleSubmit(this.submit)} className="center">

                        <div>
                            <Field name="title" value={this.props.post.title} component={renderTextField} label="Title" />
                        </div>
                        <div>
                            <Field name="author" value={this.props.post.author} component={renderTextField} label="Author" />
                        </div>

                        <div>
                            <Field name="body" value={this.props.post.body} component={renderTextField} label="Body" multiLine={true} />
                        </div>

                        <div>
                            <Field name="category" component={renderSelectField} label="Category">
                                {this.props.categories.map((c, idx) => (
                                    <MenuItem value={c.path} key={idx} primaryText={c.name} />
                                ))}
                            </Field>
                        </div>
                        <div>
                            <RaisedButton label="Submit" style={style} type="submit" />
                            <RaisedButton label="Back" style={style} type="button" onClick={() => { this.reset() }} />

                        </div>
                    </form>)
                }
            </div>
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

const mapStateToProps = state => ({ post: state.postReducer.post, categories: state.categoriesReducer.categories })
const mapDispatchToProps = { add, getAllCategories, update, get }
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(PostForm)
