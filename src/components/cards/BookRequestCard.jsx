import { MdOutlineCancel } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { toast } from "sonner";
import moment from "moment";
import axios from "axios";

const BookRequestCard = ({ request, refetch }) => {
  const { _id } = request ?? {};

  console.log({ request });

  const handleCancel = async () => {
    const consent = window.confirm("Cancel request?");
    if (consent) {
      try {
        const promise = await axios.patch(`/book-request/update/${_id}`, {
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

  const handleApprove = async () => {
    const consent = window.confirm("Approve request?");
    if (consent) {
      try {
        const promise = await axios.patch(`/book-request/update/${_id}`, {
          status: "approved",
        });
        if (promise.status === 200) {
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
