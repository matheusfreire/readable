import React, { Component } from 'react';
import { connect } from 'react-redux'
import { search } from "../actions/post";
import CardPost from './CardPost';
import { Container } from 'reactstrap';

class Home extends Component {

    componentDidMount() {
        this.props.search()
    }

    render() {
        const { list } = this.props
        return (
            <Container>
                {list.map((post) => (
                    <CardPost key={post.id} post={post}/>
                ))}
            </Container>
        );
    }
}

const mapStateToProps = state => ({ list: state.postReducer.list })
const mapDispatchToProps = { search }
export default connect(mapStateToProps, mapDispatchToProps)(Home)
