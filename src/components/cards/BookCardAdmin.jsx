import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const BookCardAdmin = ({ book, refetch }) => {
  const { _id } = book ?? {};
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/books/delete/${id}`);
      console.log(res?.data?.message);
      if (res?.data?.statusCode === 200) {
        refetch();
        toast.success(res?.data?.message || "Deleted Successfully");
      }
    } catch (error) {
      console.log({ error });
      toast.error(error.response.data.message || "Something went wrong!");
    }
  };
  return (
    <div className="md:space-y-2">
      <img
        src={book?.image}
        className="rounded-t-xl w-full h-36 md:h-44 lg:h-64"
        alt=""
      />
      <div className="p-2 space-y-2">
        <div className="flex justify-between items-start">
          <Link
            to={`/books/${_id}`}
            className="text-sm md:text-base font-semibold link"
          >
            {book?.title}
          </Link>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="">
              <CiMenuKebab className="text-xl" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded w-52 space-y-1"
            >
              <li>
                <Link to={`/dashboard/edit-book/${_id}`} className="">
                  Edit
                </Link>
              </li>
              <li>
                <button onClick={() => handleDelete(_id)} className="">
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-sm md:text-base text-gray-500">
          {book?.description}
        </p>
      </div>
    </div>
  );
};

export default BookCardAdmin;
