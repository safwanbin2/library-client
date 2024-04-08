import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

const BorrowModal = ({ bookId }) => {
  const { userDB } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    try {
      const data = {
        user: userDB?._id,
        book: bookId,
      };

      const promise = await axios.post(`/borrow`, data);
      if (promise.status === 200) {
        toast.success(`Book requested!`, {
          id: "book",
          duration: 2000,
          position: "top-right",
        });

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error(
        error.response.data.message || `Failed to request book`,
        {
          id: "book",
          duration: 2000,
          position: "top-right",
        }
      );
    }
  };

  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <p className="py-4">Request for borrowing this book?</p>
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="p-btn rounded-full !bg-error cursor-pointer"
            >
              Cancel
            </label>
            <button
              disabled={loading}
              onClick={handleRequest}
              htmlFor="my_modal_6"
              className="p-btn rounded-full cursor-pointer"
            >
              {loading ? "Processing..." : "Request"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BorrowModal;
