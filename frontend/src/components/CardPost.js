import React from 'react';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';

import {withRouter} from 'react-router-dom';

function CardPost(props) {

    const handleClick = (category,postId) => {
        let link = `/${category}/${postId}`;
        props.history.push(link);
    }
    const editPost = (category,postId) => {
        let link = `/${category}/${postId}/edit`;
        props.history.push(link);
    }
    return (
        <div>
            <Card>
                <CardHeader title={props.post.title} subtitle={props.post.author}
                    actAsExpander={true}
                    showExpandableButton={true}/>
                <CardActions>
                    <FlatButton label="Show comments" onClick={() =>{handleClick(props.post.category,props.post.id)}} />
                    <FlatButton  label="Edit" onClick={() =>{editPost(props.post.category,props.post.id)}} 
                        icon={<ContentCreate />}/>
                </CardActions>
                <CardText expandable={true}>
                    {props.post.body}
                </CardText>
            </Card>
            <br />
        </div>
    )
}

export default withRouter(CardPost);