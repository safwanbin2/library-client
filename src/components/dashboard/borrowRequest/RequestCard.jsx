import React from "react";
import book from "../../../assets/book.jpg";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { toast } from "sonner";

const RequestCard = ({ request }) => {
  const { _id } = request ?? {};

  const handleCancel = (id) => {
    const consent = window.confirm("Cancel the borrow request?");
    if (consent) {
      return toast.success("Rejected");
    }
  };

  const handleApprove = (id) => {
    const consent = window.confirm("Approve the borrow request?");
    if (consent) {
      return toast.success("Approved");
    }
  };

  return (
    <div className="flex gap-4 justify-start items-start">
      <img src={book} className="w-[120px]" alt="" />
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <Link
            to={`/books/${_id}`}
            className="text-sm md:text-base font-semibold link"
          >
            Test Book <span>(Author)</span>
          </Link>
        </div>
        <div>
          <h2 className="">
            Borrower:
            <span className="font-semibold link">Name</span>
          </h2>
          <h2 className="">
            Email:
            <span className="font-semibold link">example@email.com</span>
          </h2>
          <div>
            <h2>
              status: <span>Pending</span>
            </h2>
            <h2>
              Requested at: <span>3rd May</span>
            </h2>
          </div>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => handleCancel(_id)}
            className="bg-error p-1 rounded-full text-white"
          >
            <MdOutlineCancel className="text-2xl" />
          </button>
          <button
            onClick={() => handleApprove(_id)}
            className="bg-primary p-1 rounded-full text-white"
          >
            <TiTickOutline className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
