import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { create } from '../actions/comments';
import PropTypes from 'prop-types';
import {closeModal} from '../actions/comments';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
        <TextField
            hintText={label}
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            {...custom}
        />
    )



class CommentForm extends Component {


    static propTypes = {
        parentId: PropTypes.string.isRequired,
    }

    closeModal = () => {
        this.props.closeModal()
    }

    submit = (values) => {
        const uuidv4 = require('uuid/v4');
        this.props.create({ id: uuidv4(), timestamp: Date.now(), title: values.title, body: values.body, author: values.author, parentId: this.props.parentId })
    }

    render() {
        const { handleSubmit } = this.props
        const actions = [
            <FlatButton key="1" label="Cancel" primary={true} onClick={() => this.closeModal()} />,
            <FlatButton key="2" label="Submit" type="submit" primary={true} />
        ];
        return (
            <form onSubmit={handleSubmit(this.submit)} className="center">
                <div>
                    <Field name="title" component={renderTextField} label="Title" />
                </div>
                <div>
                    <Field name="author" component={renderTextField} label="Author" />
                </div>
                <div>
                    <Field name="body" component={renderTextField} label="Body" multiLine={true} />
                </div>
                <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
                    {actions}
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

    if (!values.body) {
        errors.body = 'Body required'
    }

    return errors
}

CommentForm = reduxForm({ form: 'commentForm', validate })(CommentForm)

const mapStateToProps = state => ({ comment: state.commentReducer.comment })
const mapDispatchToProps = { create,closeModal }
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
