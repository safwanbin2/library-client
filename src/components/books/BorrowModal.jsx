import React from "react";

const BorrowModal = ({ bookId }) => {
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <p className="py-4">Request for borrowing this book?</p>
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="p-btn rounded-full !bg-error"
            >
              Cancel
            </label>
            <label htmlFor="my_modal_6" className="p-btn rounded-full">
              Confirm
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default BorrowModal;
