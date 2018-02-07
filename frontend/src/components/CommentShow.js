import React, { Component } from 'react';
import { connect } from 'react-redux';
import { vote, remove} from '../actions/comments';

import Paper from 'material-ui/Paper';
import { blue500 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import { Row, Col } from 'reactstrap';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';



class CommentShow extends Component {

    handleClick = (comment, type) => {
        this.props.vote(comment, type)
    }

    deleteComment = (comment) => {
        this.props.remove(comment)
    }

    render() {
        const {comment} = this.props
        return (
            <div>
                {comment && (
                    <Paper zDepth={2}>
                        <Row>
                            <Col sm="4"  >
                                <div className="text-shadow" >
                                    {comment.author}
                                </div>
                            </Col>
                            <Col sm={{size: 4, offset: 4}} className="right">
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton><MoreVertIcon /></IconButton>
                                    }
                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                    >
                                    <MenuItem primaryText="Edit" onClick={() => {this.editComment(comment)}}/>
                                    <MenuItem primaryText="Delete" onClick={() => {this.deleteComment(comment)}}/>
                                    </IconMenu>
                            </Col>
                        </Row>
                        {comment.body}
                        <br/>
                        <Row>
                            <Col sm="4" >
                                <FontIcon className="material-icons icon-right" color={blue500} onClick={() => this.handleClick(comment, 'upVote')}>
                                    thumb_up
                                </FontIcon>
                                <span className="span-style">
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

const mapDispatchToProps = {vote, remove}
export default connect(null, mapDispatchToProps)(CommentShow)
