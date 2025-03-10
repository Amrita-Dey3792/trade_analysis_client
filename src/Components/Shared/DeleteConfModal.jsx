import React from "react";

const DeleteConfModal = ({onConfirm, loading}) => {
  return (
    <dialog id="delete_conf_modal" className="modal">
      <div className="modal-box">
        <button onClick={() => document.getElementById("delete_conf_modal").close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>

        <div className="flex flex-col justify-center items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-20 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <h3 className="text-3xl">Are you sure?</h3>
          <p className="text-center">
            Do you really want to delete these records? This process cannot be
            undone.
          </p>
          <div className="flex gap-2">
            <button onClick={onConfirm} className="btn btn-sm btn-error text-white">{loading && <span className="loading loading-spinner loading-sm"></span>}Delete</button>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => document.getElementById("delete_conf_modal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteConfModal;
