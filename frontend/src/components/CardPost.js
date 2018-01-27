import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import {withRouter} from 'react-router-dom';

function CardPost(props) {

    const handleClick = (postId) => {
        let link = `/posts/${postId}`;
        props.history.push(link);
    }
    return (<Card>
        <CardHeader title={props.post.title} subtitle={props.post.author}
            actAsExpander={true}
            showExpandableButton={true}/>
        <CardActions>
            <FlatButton label="Show comments" onClick={() =>{handleClick(props.post.id)}} />
        </CardActions>
        <CardText expandable={true}>
            {props.post.body}
        </CardText>
    </Card>)
}

export default withRouter(CardPost);