import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CommentForm from './CommentForm';

import { connect } from 'react-redux';
import { openModal, closeModal} from '../actions/comments';

import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';

class CommentModal extends Component {

    static propTypes={
        parentId: PropTypes.string.isRequired,
    }

    openModal = () => {
        this.props.openModal()
    }

    render() {
        const { commentModalOpen } = this.props
        
        if (commentModalOpen) {
            return (
                <Dialog title="New comment" modal={true} open={commentModalOpen} autoScrollBodyContent={true}>
                    <CommentForm parentId={this.props.parentId} comment={this.props.comment}/>
                </Dialog>
            )
            
        } else {
            return (
                <RaisedButton label="New comment" labelPosition="before"
                    primary={true} onClick={() => this.openModal()}
                        icon={<ContentAdd />} />
            )
        }
    }
}

const mapStateToProps = state => ({commentModalOpen: state.commentReducer.commentModalOpen})
const mapDispatchToProps = { openModal, closeModal}
export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)
