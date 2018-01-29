import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add } from '../actions/post';
import { Field, reduxForm } from 'redux-form';
import {getAllCategories} from '../actions/categories';
import { Redirect } from 'react-router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
        redirectToHome: false
    }


    componentWillMount(){
        this.props.getAllCategories()
    }

    submit = (values) => {
        const uuidv4 = require('uuid/v4');
        this.props.add({id: uuidv4(),timestamp: Date.now(),title: values.title, body: values.body, author: values.author, category:values.category}).then(() => {
            this.setState({redirectToHome: true})
        })
    }
    
    
    render() {
        
        if (this.state.redirectToHome) {
            return (
            <Redirect to="/"/>
            )
        } else {
            const { handleSubmit, reset, submitting } = this.props
            return (
                <form onSubmit={handleSubmit(this.submit)} className="center">
                    <div>
                        <Field name="title" component={renderTextField} label="Title"/>
                    </div>
                    <div>
                        <Field name="author" component={renderTextField} label="Author"/>
                    </div>
    
                    <div>
                        <Field name="body" component={renderTextField} label="Body" multiLine={true}/>
                    </div>
    
                    <div>
                        <Field name="category" component={renderSelectField} label="Category">
                            {this.props.categories.map((c, idx) => (
                                <MenuItem value={c.path} key={idx} primaryText={c.name} />
                            ))}
                        </Field>
                    </div>
                    <div>
                        <RaisedButton label="Submit" style={style} type="submit"/>
                        <RaisedButton label="Clear values" style={style} type="button" onClick={() => {reset}}/>
                        
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
