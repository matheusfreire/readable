import React, { Component } from 'react';
import Loading from 'react-loading';
import Modal from 'react-modal';
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'

class CommentModal extends Component {

    static propTypes={
        parentId: PropTypes.string.isRequired,
    }


    openModal = () => {
        this.props.commentModalOpen({ commentModalOpen: true })
    }

    closeModal = () => {
        this.setState({ commentModalOpen: false })
    }


    render() {
        const { submitting, reset } = this.props
        const { commentModalOpen } = this.state
        if (commentModalOpen) {
            return (
                <Modal className='modal' overlayClassName='overlay'
                    isOpen={commentModalOpen}
                    onRequestClose={this.closeModal}
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

export default(CommentModal)
