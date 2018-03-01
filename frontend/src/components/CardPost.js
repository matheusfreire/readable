import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { blue500 } from 'material-ui/styles/colors';
import { withRouter } from 'react-router-dom';
import ActionAnnouncement from 'material-ui/svg-icons/action/announcement'
import { Row, Col } from 'reactstrap';
import FontIcon from 'material-ui/FontIcon';

import {vote } from '../actions/post';

function CardPost(props) {

    const handleClick = (category, postId) => {
        let link = `/${category}/${postId}`;
        props.history.push(link);
    }
    const editPost = (category, postId) => {
        let link = `/${category}/${postId}/edit`;
        props.history.push(link);
    }

    const vote = (post, type) => {
        props.vote(post, type)
    }
    return (
        <div>
            <Card>
                <CardHeader title={props.post.title} subtitle={props.post.author}
                    actAsExpander={true}
                    showExpandableButton={true} />
                <CardActions>
                    <Row>
                        <Col sm="4" >
                            <FlatButton label="Edit" onClick={() => { editPost(props.post.category, props.post.id) }}
                                icon={<ContentCreate />} />
                            <FontIcon className="material-icons icon-right" color={blue500}
                                onClick={() => vote(props.post, 'upVote')}>
                                thumb_up
                                        </FontIcon>
                            <span className="span-style">
                                {props.post.voteScore}
                            </span>
                            <FontIcon className="material-icons icon-left"
                                onClick={() => this.vote(props.post, 'downVote')}>
                                thumb_down
                            </FontIcon>
                        </Col>
                        <Col sm="4">
                            <FlatButton label="Show comments" onClick={() => { handleClick(props.post.category, props.post.id) }} />
                        </Col>
                        <Col sm="4" className="right">
                            <div className="right">
                                <ActionAnnouncement /> {props.post.commentCount}
                            </div>
                        </Col>
                    </Row>
                    
                </CardActions>
                <CardText expandable={true}>
                    {props.post.body}
                </CardText>
            </Card>
            <br />
        </div>
    )
}

const mapDispatchToProps = { vote }
export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(CardPost)