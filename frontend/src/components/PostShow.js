import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, vote } from '../actions/post';
import ListComments from './ListComments';
import CommentModal from './CommentModal';
import Tag from './Tag';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { blue500 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import ActionAnnouncement from 'material-ui/svg-icons/action/announcement'
import { Container, Row, Col } from 'reactstrap';


class PostShow extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        if (this.props.match.params.id !== 'undefined') {
            this.props.get(this.props.match.params.id).then(() => {
                this.setState({ loading: false })
            })
        }
    }

    handleClick = (post, type) => {
        this.props.vote(post, type)
    }

    render() {
        const post = this.props.objeto
        return (
            <div >
                {this.state.loading ? (
                    <span>Carregando</span>
                ) : (
                        <Container>
                            <Card>
                                <CardHeader title={post.title} subtitle={post.author} actAsExpander={true}
                                    showExpandableButton={true} />
                                <CardActions>
                                    <Tag category={post.category} />
                                    <Row>
                                        <Col sm="4" >
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
                                    <ListComments postId={post.id} />
                                </CardText>
                            </Card>
                        </Container>
                    )}
            </div>
        );
    }
}

const mapStateToProps = state => ({ objeto: state.postReducer.post })
const mapDispatchToProps = { get, vote }
export default connect(mapStateToProps, mapDispatchToProps)(PostShow)
