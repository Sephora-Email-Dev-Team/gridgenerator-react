import React from 'react';

function Modal(props) {
  const {modalStyle, closeModal} = props;
  return (
    <div id="myModal" className="modal" style={{ display: modalStyle }}>
      <div className="modal-content" id="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <p>500 server error. Please try again later.</p>
      </div>
    </div>
  );
}

export default Modal;
