import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { blue500 } from 'material-ui/styles/colors';
import { withRouter } from 'react-router-dom';
import ActionAnnouncement from 'material-ui/svg-icons/action/announcement'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { Row, Col } from 'reactstrap';
import FontIcon from 'material-ui/FontIcon';
import { vote, remove } from '../actions/post';

class CardPost extends Component {

    handleClick = (category, postId) => {
        let link = `/${category}/${postId}`;
        this.props.history.push(link);
    }
    editPost = (category, postId) => {
        let link = `/${category}/${postId}/edit`;
        this.props.history.push(link);
    }

    removePost = (post) => {
        this.props.remove(post)
    }

    vote = (post, type) => {
        this.props.vote(post, type)
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader title={this.props.post.title} subtitle={this.props.post.author}
                        actAsExpander={true}
                        showExpandableButton={true} />
                    <CardActions>
                        <Row>
                            <Col sm="4" >
                                <FlatButton label="Edit" onClick={() => { this.editPost(this.props.post.category, this.props.post.id) }}
                                    icon={<ContentCreate />} />
                                <FontIcon className="material-icons icon-right" color={blue500}
                                    onClick={() => this.vote(this.props.post, 'upVote')}>
                                    thumb_up
                                            </FontIcon>
                                <span className="span-style">
                                    {this.props.post.voteScore}
                                </span>
                                <FontIcon className="material-icons icon-left"
                                    onClick={() => this.vote(this.props.post, 'downVote')}>
                                    thumb_down
                                </FontIcon>
                            </Col>
                            <Col sm="4">
                                <FlatButton label="Show comments" onClick={() => { this.handleClick(this.props.post.category, this.props.post.id) }} />
                            </Col>
                            <Col sm="4" className="right">
                                <div className="right">
                                    <FlatButton label="" onClick={() => { this.removePost(this.props.post) }}
                                        icon={<ActionDelete />} />
                                    <ActionAnnouncement /> {this.props.post.commentCount}
                                </div>
                            </Col>
                        </Row>

                    </CardActions>
                    <CardText expandable={true}>
                        {this.props.post.body}
                    </CardText>
                </Card>
                <br />
            </div>
        )
    }

}

const mapDispatchToProps = { vote, remove }
export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(CardPost)