import React, { Component } from 'react';
import { connect } from 'react-redux'
import { get, vote} from '../actions/post'
import ListComments from './ListComments';
import CommentModal from './CommentModal';

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
                        <div>
                            <h1>POST SHOW - {post.category}</h1>
                        </div>
                        {post.body}
                        <hr />
                        Score: {post.voteScore}
                        <button onClick={() => this.handleClick(post, 'upVote')}>UP</button>
                        <button onClick={() => this.handleClick(post, 'downVote')}>DOWN</button>
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
