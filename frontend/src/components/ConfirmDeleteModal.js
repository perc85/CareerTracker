import React from "react";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
}) {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? "visible bg-black/20" : "invisible"}`} onClick={onClose}>
      <div className="bg-white px-4 py-6 rounded-2xl">
        <h2 className="pb-4 font-bold text-xl">{title}</h2>
        <p className="pb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button className="shadow p-2 rounded-xl font-semibold hover:bg-gray-100">Cancel</button>
          <button className="shadow p-2 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
