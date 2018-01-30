import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, vote} from '../actions/post'
import ListComments from './ListComments';
import CommentModal from './CommentModal';
import Paper from 'material-ui/Paper';
import Tag from './Tag';
import Divider from 'material-ui/Divider';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import ImageTagFaces from 'material-ui/svg-icons/image/tag-faces';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

class PostShow extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        if(this.props.match.params.id !== 'undefined'){
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
            <div>
                {this.state.loading ? (
                    <span>Carregando</span>
                ):( 
                    <div>
                        <Paper zDepth={2} />
                        <div>
                            <h1>Post: {post.title} -  By {post.author} 
                                <div className="right">
                                    <Tag category={post.category}/>
                                </div>
                            </h1>
                            
                        </div>
                        <div>
                            {post.body}
                            <div className="right">
                                <Badge badgeContent={post.voteScore} primary={post.voteScore > 0} secondary={post.voteScore <= 0} badgeStyle={{top: 12, right: 12}}>
                                    <IconButton tooltip="Score">
                                        {post.voteScore > 0 ?
                                            <ActionThumbUp color={blue500}/>
                                        : <ActionThumbDown color={red500}/> 
                                        }
                                    </IconButton>
                                </Badge>
                            </div>
                            <br />
                            <button onClick={() => this.handleClick(post, 'upVote')}>UP</button>
                            <button onClick={() => this.handleClick(post, 'downVote')}>DOWN</button>
                        </div>
                        <Divider />
                        <CommentModal parentId={post.id}/>
                        <ListComments postId={post.id} />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({ objeto: state.postReducer.post })
const mapDispatchToProps = { get, vote}
export default connect(mapStateToProps, mapDispatchToProps)(PostShow)
