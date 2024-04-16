import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { toast } from "sonner";
import axios from "axios";
import moment from "moment";

const RequestCard = ({ request, refetch }) => {
  const handleCancel = async (_id) => {
    const consent = window.confirm("Cancel request?");
    if (consent) {
      try {
        const promise = await axios.patch(`/borrow/update/${_id}`, {
          status: "cancelled",
        });
        if (promise.status === 200) {
          refetch();
          toast.success(`Request Cancelled!`, {
            id: "book",
            duration: 2000,
            position: "top-right",
          });
        }
      } catch (error) {
        console.log(error);

        return toast.error(
          error.response.data.message || `Something went wrong!`,
          {
            id: "book",
            duration: 2000,
            position: "top-right",
          }
        );
      }
    }
  };

  const handleApprove = async (_id) => {
    const consent = window.confirm("Approve request?");
    if (consent) {
      try {
        const promise = await axios.patch(`/borrow/update/${_id}`, {
          status: "approved",
          borrowedAt: new Date(),
        });
        if (promise.status === 200) {
          await axios.post(`/borrow/mail`, {
            name: request?.user?.name,
            email: request?.user?.email,
          });

          refetch();
          toast.success(`Request Approved!`, {
            id: "book",
            duration: 2000,
            position: "top-right",
          });
        }
      } catch (error) {
        console.log(error);

        return toast.error(
          error.response.data.message || `Something went wrong!`,
          {
            id: "book",
            duration: 2000,
            position: "top-right",
          }
        );
      }
    }
  };

  return (
    <div className="flex gap-4 justify-start items-start">
      <img src={request?.book?.image} className="w-[120px]" alt="" />
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <Link
            to={`/books/${request?.book?._id}`}
            className="text-sm md:text-base font-semibold link"
          >
            {request?.book?.title} <span>({request?.book?.author})</span>
          </Link>
        </div>
        <div className="text-sm md:text-base">
          <h2 className="">
            Borrower:
            <span className="font-semibold">{request?.user?.name}</span>
          </h2>
          <h2 className="">
            Email:
            <span className="font-semibold">{request?.user?.email}</span>
          </h2>
          <div>
            <h2>
              Status:{" "}
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
        {request?.status === "pending" && (
          <div className="space-x-2">
            <button
              onClick={() => handleCancel(request?._id)}
              className="bg-error p-1 rounded-full text-white"
            >
              <MdOutlineCancel className="text-2xl" />
            </button>
            <button
              onClick={() => handleApprove(request?._id)}
              className="bg-primary p-1 rounded-full text-white"
            >
              <TiTickOutline className="text-2xl" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
