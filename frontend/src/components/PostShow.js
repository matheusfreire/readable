import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, vote } from '../actions/post';
import {withRouter} from 'react-router-dom';
import { compose } from 'redux';

import ListComments from './ListComments';
import CommentModal from './CommentModal';
import Tag from './Tag';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import { blue500 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import ActionAnnouncement from 'material-ui/svg-icons/action/announcement'
import { Container, Row, Col } from 'reactstrap';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { Divider } from 'material-ui';

class PostShow extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        if (this.props.match.params.id !== 'undefined') {
            this.props.get(this.props.match.params.post_id).then(() => {
                this.setState({ loading: false })
            }).catch((err) => {
                this.props.history.push('/404')
            })
        }
    }

    handleClick = (post, type) => {
        this.props.vote(post, type)
    }

    editPost = (category,postId) => {
        let link = `/${category}/${postId}/edit`;
        this.props.history.push(link);
    }

    render() {
        const {post, message} = this.props
        return (
            <div >
                {this.state.loading ? (
                    <CircularProgress />
                ) : (
                    <Container>
                        <Card>
                            <CardHeader title={post.title} subtitle={post.author} actAsExpander={true}
                                showExpandableButton={true} />
                            <CardActions>
                                <Tag category={post.category} />
                                <Row>
                                    <Col sm="4" >
                                        <FlatButton  label="Edit" onClick={() =>{this.editPost(post.category,post.id)}} 
                                            icon={<ContentCreate />}/>
                                        <FontIcon className="material-icons icon-right" color={blue500}
                                            onClick={() => this.handleClick(post, 'upVote')}>
                                            thumb_up
                                        </FontIcon>
                                        <span className="span-style">
                                            {post.voteScore}
                                        </span>
                                        <FontIcon className="material-icons icon-left"
                                            onClick={() => this.handleClick(post, 'downVote')}>
                                            thumb_down
                                        </FontIcon>
                                    </Col>
                                    <Col sm="4">
                                        <CommentModal parentId={post.id} />
                                    </Col>
                                    <Col sm="4" className="right">
                                        <div className="right">
                                            <ActionAnnouncement /> {post.commentCount}
                                        </div>
                                    </Col>
                                </Row>
                            </CardActions>
                            <CardText expandable={true}>
                                <Divider />
                                {post.body}
                                <br />
                                <br />
                                <ListComments postId={post.id} />
                            </CardText>
                        </Card>
                        {message !== undefined ?
                            <Snackbar
                                open={message !== ''}
                                message={message}
                                autoHideDuration={4000}
                            />
                            : ''
                        }
                    </Container>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({ post: state.postReducer.post, message: state.postReducer.messagePost })
const mapDispatchToProps = { get, vote }
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(PostShow)
