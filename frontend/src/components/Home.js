import React, { Component } from 'react';
import { connect } from 'react-redux'
import { search,order } from "../actions/post";
import CardPost from './CardPost';
import { Container, Row } from 'reactstrap';
import { Divider, Subheader, Chip, Avatar } from 'material-ui';
import { blue300, indigo900 } from 'material-ui/styles/colors';
import { POSTS_ORDERED_UP_VOTED, POSTS_ORDERED_DOWN_VOTED, POSTS_ORDERED_MORE_RECENT, POSTS_ORDERED_LESS_RECENT } from '../utils/ActionTypes';
import CircularProgress from 'material-ui/CircularProgress';
const styles = {
    chip: {
      margin: 4,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
};


class Home extends Component {

    state={
        loadin: false
    }

    componentDidMount() {
        this.props.search()
    }

    
    order(type) {
        this.setState({loading:true})
        this.props.order(type);
        setTimeout(this.setState({loading:false}), 4000) 
    }

    render() {
        const { list } = this.props
        return (
            <Container>
                {this.state.loading ? (
                    <div className="center">
                        <CircularProgress />
                    </div>
                ) : (
                    <div>
                        <Subheader>Order options</Subheader>
                        <Row>
                            <Chip onClick={() => {this.order(POSTS_ORDERED_UP_VOTED)}} style={styles.chip}>
                                <Avatar size={32} color={blue300} backgroundColor={indigo900}>
                                    MV
                                </Avatar>
                                More voted
                            </Chip>
                            <Chip onClick={() => {this.order(POSTS_ORDERED_DOWN_VOTED)}} style={styles.chip}>
                                <Avatar size={32} color={blue300} backgroundColor={indigo900}>
                                    LV
                                </Avatar>
                                Less voted
                            </Chip>
                            <Chip onClick={() => {this.order(POSTS_ORDERED_MORE_RECENT)}} style={styles.chip}>
                                <Avatar size={32} color={blue300} backgroundColor={indigo900}>
                                    MR
                                </Avatar>
                                More Recent
                            </Chip>
                            <Chip onClick={() => {this.order(POSTS_ORDERED_LESS_RECENT)}} style={styles.chip}>
                                <Avatar size={32} color={blue300} backgroundColor={indigo900}>
                                    LR
                                </Avatar>
                                Less Recent
                            </Chip>
                        </Row>
                        <Divider />
                        <br/>
                        {list.map((post) => (
                            <CardPost key={post.id} post={post}/>
                        ))}
                    </div>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => ({ list: state.postReducer.list })
const mapDispatchToProps = { search, order }
export default connect(mapStateToProps, mapDispatchToProps)(Home)
