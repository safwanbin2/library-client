import BookRequestCard from "../../../components/cards/BookRequestCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
const BookRequests = () => {
  const { data: requests, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axios.get(`/book-request`);

      return res.data.data;
    },
  });

  const handleCancel = async (_id) => {
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

  const handleApprove = async (_id) => {
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
    <div className="flex flex-col justify-start items-start gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
        {requests?.length
          ? requests.map((request, i) => (
              <BookRequestCard
                key={i}
                request={request}
                refetch={refetch}
                handleCancel={handleCancel}
                handleApprove={handleApprove}
              />
            ))
          : "No Data found"}
      </div>
    </div>
  );
};

export default BookRequests;
