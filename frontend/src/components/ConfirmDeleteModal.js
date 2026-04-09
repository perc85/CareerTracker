import React from "react";
import "../styles/confirmDeleteModal.css";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>

        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="modal-btn delete"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            <i className="fas fa-trash"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
