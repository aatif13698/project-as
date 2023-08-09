import React from "react";

const DeleteModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    
    <div className="modala" style={{borderColor:"red", position:"absolute"}}>
      <div className="modala-content">
        <p>Are you sure you want to delete?</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>OK</button>
      </div>
    </div>
  );
};

export default DeleteModal;

