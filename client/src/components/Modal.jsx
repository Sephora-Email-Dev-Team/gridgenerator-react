import React from 'react';

function Modal(props) {
  const {modalStyle, closeModal, modalMessage} = props;
  return (
    <div id="myModal" className="modal" style={{ display: modalStyle }}>
      <div className="modal-content" id="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <p>{modalMessage}</p>
      </div>
    </div>
  );
}

export default Modal;
