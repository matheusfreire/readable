import React, { Component } from 'react';
import { connect } from 'react-redux';
import { vote} from '../actions/comments';

import Paper from 'material-ui/Paper';
import { blue500 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import ActionAnnouncement from 'material-ui/svg-icons/action/announcement'
import { Container, Row, Col } from 'reactstrap';


const iconStyles = {
    marginRight: 10,
};

class CommentShow extends Component {

    handleClick = (comment, type) => {
        this.props.vote(comment, type)
    }

    render() {
        const {comment} = this.props
        return (
            <div>
                {comment && (
                    <Paper zDepth={2}>
                        <div className="text-shadow" >
                            {comment.author}
                        </div>
                        <br />
                        {comment.body}
                        <br/>
                        <Row>
                            <Col sm="4" >
                                <FontIcon className="material-icons icon-right" color={blue500} onClick={() => this.handleClick(comment, 'upVote')}>
                                    thumb_up
                                </FontIcon>
                                <span>
                                    {comment.voteScore}
                                </span>
                                <FontIcon className="material-icons icon-left" onClick={() => this.handleClick(comment, 'downVote')}>
                                    thumb_down
                                </FontIcon>
                            </Col>
                        </Row>
                    </Paper>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = {vote}
export default connect(null, mapDispatchToProps)(CommentShow)
