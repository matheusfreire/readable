import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { create, update } from '../actions/comments';
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
    state = {
        loading: true,
        editComment: false
    }

    static propTypes = {
        parentId: PropTypes.string.isRequired,
    }

    closeModal = () => {
        this.props.closeModal()
    }

    submit = (values) => {
        if(this.state.editComment){
            this.props.update({ id:this.props.comment.id,body: values.body, author: values.author}).then(() => {
                this.closeModal();
            })
        } else {
            const uuidv4 = require('uuid/v4');
            this.props.create({ id: uuidv4(), timestamp: Date.now(), title: values.title, body: values.body, author: values.author, parentId: this.props.parentId })
        }
    }

    componentDidMount(){
        if(this.props.comment.id !== undefined){
            this.setState({editComment:true})
            this.handleInitialize()
        }
    }

    handleInitialize(){
        const initData = {
            "title": this.props.comment.title,
            "body": this.props.comment.body,
            "author": this.props.comment.author,
        };
        this.props.initialize(initData);
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
const mapDispatchToProps = { create,closeModal, update }
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
