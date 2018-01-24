import React, { Component } from 'react';
import Loading from 'react-loading';
import Modal from 'react-modal';
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import { connect } from 'react-redux'
import { openModal, closeModal} from '../actions/comments'

class CommentModal extends Component {

    static propTypes={
        parentId: PropTypes.string.isRequired,
    }


    openModal = () => {
        this.props.openModal()
    }

    closeModal = () => {
        this.props.closeModal()
    }

    render() {
        const { submitting, reset, commentModalOpen } = this.props
        if (commentModalOpen) {
            return (
                <Modal className='modal' overlayClassName='overlay'
                    isOpen={commentModalOpen}
                    onRequestClose={this.closeModal()}
                    contentLabel='Modal'>
                    <CommentForm parentId={this.props.parentId} closeModal={this.closeModal()}/>
                </Modal>
            )
            
        } else {
            return (
                <button onClick={() => this.openModal()}>Add new comment</button>
            )
        }

    }
}

const mapStateToProps = state => ({commentModalOpen: state.commentReducer.commentModalOpen})
const mapDispatchToProps = { openModal, closeModal}
export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)
