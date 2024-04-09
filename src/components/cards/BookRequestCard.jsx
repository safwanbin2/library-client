import { MdOutlineCancel } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";

import moment from "moment";

const BookRequestCard = ({ request, handleApprove, handleCancel }) => {
  const { _id } = request ?? {};

  return (
    <div className="flex gap-4 justify-start items-start">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="">
              By:
              <span className="text-sm md:text-base font-semibold">
                {request?.author}
              </span>
            </h2>
            <h2 className="">
              Email:
              <span className="text-sm md:text-base font-semibold">
                {request?.user?.email}
              </span>
            </h2>
          </div>
        </div>
        <div>
          <h2 className="">
            Book Name:
            <span className="text-sm md:text-base font-semibold link">
              {request?.title}
            </span>
          </h2>
          <h2 className="">
            Description:
            <span className="text-sm md:text-base ">
              {request?.description}
            </span>
          </h2>
          <div>
            <h2>
              status:{" "}
              <span className="text-sm md:text-base font-semibold">
                {request?.status}
              </span>
            </h2>
            <h2>
              Requested at:{" "}
              <span className="text-sm md:text-base font-semibold">
                {moment(request?.createdAt).format("Do MMMM")}
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
