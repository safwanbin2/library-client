import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "sonner";

const BorrowCard = ({ borrow, refetch }) => {
  const handleReturn = async (_id) => {
    const consent = window.confirm("Return?");
    if (consent) {
      try {
        const promise = await axios.patch(`/borrow/update/${_id}`, {
          returnedAt: new Date(),
        });
        if (promise.status === 200) {
          refetch();
          toast.success(`Returned!`, {
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
      <img src={borrow?.book?.image} className="w-[120px]" alt="" />
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <Link
            to={`/books/${borrow?.book?._id}`}
            className="text-sm md:text-base font-semibold link"
          >
            {borrow?.book?.title} <span>({borrow?.book?.author})</span>
          </Link>
        </div>
        <div>
          <div>
            <h2>
              Status:{" "}
              <span className="text-sm md:text-base font-semibold">
                {borrow?.status}
              </span>
            </h2>
            <h2>
              Borrowed at:{" "}
              <span className="text-sm md:text-base font-semibold">
                {moment(borrow?.borrowedAt).format("Do MMMM")}
              </span>
            </h2>
            {borrow?.returnedAt && (
              <h2>
                Returned at:{" "}
                <span className="text-sm md:text-base font-semibold">
                  {moment(borrow?.returnedAt?.borrowedAt).format("Do MMMM")}
                </span>
              </h2>
            )}
            {!borrow?.returnedAt && (
              <div>
                {/* <button>Delete</button> */}
                <button
                  className="text-xs bg-green-600 p-1 rounded-sm text-white"
                  onClick={() => handleReturn(borrow?._id)}
                >
                  Return
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowCard;
