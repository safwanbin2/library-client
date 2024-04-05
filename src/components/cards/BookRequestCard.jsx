import React from "react";
import book from "../../assets/book.jpg";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { toast } from "sonner";

const BookRequestCard = ({ request }) => {
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
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="">
              By:
              <span className="text-sm md:text-base font-semibold">Name</span>
            </h2>
            <h2 className="">
              Email:
              <span className="font-semibold">example@email.com</span>
            </h2>
          </div>
        </div>
        <div>
          <h2 className="">
            Book:
            <Link
              to={`/books/3`}
              className="text-sm md:text-base font-semibold link"
            >
              Name
            </Link>
          </h2>
          <h2 className="">
            Details:
            <span className="text-sm md:text-base ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores harum minima suscipit fugiat repellat facere
              repellendus est ut exercitationem voluptatum!
            </span>
          </h2>
          <div>
            <h2>
              status:{" "}
              <span className="text-sm md:text-base font-semibold">
                Pending
              </span>
            </h2>
            <h2>
              Requested at:{" "}
              <span className="text-sm md:text-base font-semibold">
                3rd May
              </span>
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

export default BookRequestCard;
