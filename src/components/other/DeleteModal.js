import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from "react-router-dom";

export default function DeleteModal(props) {
  const history = useHistory();
  const delImg = () => {
    axios.delete('/student/delstudent/' + props.student_id)
      .then(res => {
        history.push('/student-directory', props.student_id);
      })
      .catch(err => { this.setState({ errorMsg: err.response.data.msg }) });
  }

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="img-modal"
        animation={false}
      >
        <Modal.Header>
          Delete Student?
        </Modal.Header>

        <Modal.Body>
          <p className='del-txt-modal'>Are you sure you want to delete student? You can update student info.</p>
          <p className='del-txt-modal'>Please press cancel if you want to update.</p>
        </Modal.Body>

        <Modal.Footer>
          <button className='del-img-mod-btn' onClick={delImg}>Delete</button>
          <button className='cancel-btn' onClick={props.onHide}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}