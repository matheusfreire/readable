import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getByCategory} from '../actions/post'
import CardPost from './CardPost';
import { Container } from 'reactstrap';

class ListPostByCategory extends Component {


    componentDidMount(){
        this.props.getByCategory(this.props.match.params.category)
    }

    componentWillUpdate(){
        this.props.getByCategory(this.props.match.params.category)
    }

    render() {
        const { list } = this.props
        return (
            <Container>
                {list.length > 0 ? (list.map((post) => (
                    <CardPost key={post.id} post={post}/>
                ))) : 
                    <h2 className="center">
                        Nothing to show
                    </h2>
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({ list: state.postReducer.list })
const mapDispatchToProps = { getByCategory }
export default connect(mapStateToProps, mapDispatchToProps)(ListPostByCategory)
