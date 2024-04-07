import { useContext, useState } from "react";
import BookCardAdmin from "../../../components/cards/BookCardAdmin";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const BooksAdmin = () => {
  const { userDB } = useContext(AuthContext);
  const [genre, setGenre] = useState("");

  const {
    data: books,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["books", genre, userDB?._id],
    queryFn: async () => {
      const queryParams = {
        userId: userDB?._id,
      };

      if (genre) {
        queryParams.genre = genre;
      }

      const queryString = new URLSearchParams(queryParams).toString();

      const res = await axios.get(`/books?${queryString}`);

      return res.data.data.data;
    },
  });

  return (
    <div className="flex flex-col justify-start items-start gap-5">
      <select
        onChange={(e) => setGenre(e.target.value)}
        className="select select-bordered focus:outline-none rounded-full !px-3 w-6/12 md:w-2/12 shadow"
      >
        <option value="" selected>
          All
        </option>
        <option value="Action">Action</option>
        <option value="Thriller">Thriller</option>
        <option value="Epic">Epic</option>
        <option value="Romantic">Romantic</option>
        <option value="Fiction">Fiction</option>
      </select>
      <div className="flex justify-center md:justify-start flex-wrap gap-6">
        {books?.length
          ? books.map((book, i) => (
              <BookCardAdmin refetch={refetch} key={i} book={book} />
            ))
          : "No Data found"}
      </div>
    </div>
  );
};

export default BooksAdmin;
