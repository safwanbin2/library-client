import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookInformation from "../../components/books/BookInformation";

const BookPage = () => {
  const bookId = useLoaderData();

  const { data: book, refetch } = useQuery({
    queryKey: [bookId],
    queryFn: async () => {
      const res = await axios.get(`/books/single/${bookId}`);

      return res.data.data;
    },
  });

  console.log({ book });
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <div className="mt-24 mb-10 min-h-screen w-11/12 mx-auto space-y-5">
      <div className="">
        <BookInformation refetch={refetch} book={book} />
      </div>
    </div>
  );
};

export default BookPage;
