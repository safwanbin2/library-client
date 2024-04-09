import { useQuery } from "@tanstack/react-query";
import BookCard from "../../components/cards/BookCard";
import { Link } from "react-router-dom";
import axios from "axios";

const TopRatedBooks = () => {
  const { data: Thriller } = useQuery({
    queryKey: ["Thriller"],
    queryFn: async () => {
      const res = await axios.get(`/books?genre=Thriller&limit=14`);

      return res.data.data.data;
    },
  });

  const { data: Comedy } = useQuery({
    queryKey: ["Comedy"],
    queryFn: async () => {
      const res = await axios.get(`/books?genre=Comedy&limit=14`);

      return res.data.data.data;
    },
  });

  const { data: Historical } = useQuery({
    queryKey: ["Historical"],
    queryFn: async () => {
      const res = await axios.get(`/books?genre=Historical&limit=14`);

      return res.data.data.data;
    },
  });

  const { data: Action } = useQuery({
    queryKey: ["Action"],
    queryFn: async () => {
      const res = await axios.get(`/books?genre=Action&limit=14`);

      return res.data.data.data;
    },
  });

  const { data: Programming } = useQuery({
    queryKey: ["Programming"],
    queryFn: async () => {
      const res = await axios.get(`/books?genre=Programming&limit=14`);

      return res.data.data.data;
    },
  });

  const { data: Medical } = useQuery({
    queryKey: ["Medical"],
    queryFn: async () => {
      const res = await axios.get(`/books?genre=Medical&limit=14`);

      return res.data.data.data;
    },
  });

  return (
    <div className="my-16 space-y-10">
      <div className="text-center">
        <p>Books that are mostly rated</p>
      </div>
      <h1 className="text-5xl font-medium text-center">Thriller</h1>
      <div className="w-11/12 mx-auto flex justify-center flex-wrap gap-x-6 gap-y-10">
        {Thriller?.length
          ? Thriller.map((book, i) => <BookCard key={i} book={book} />)
          : "No Data found"}
      </div>
      <h1 className="text-5xl font-medium text-center">Comedy</h1>
      <div className="w-11/12 mx-auto flex justify-center flex-wrap gap-x-6 gap-y-10">
        {Comedy?.length
          ? Comedy.map((book, i) => <BookCard key={i} book={book} />)
          : "No Data found"}
      </div>

      <h1 className="text-5xl font-medium text-center">Historical</h1>
      <div className="w-11/12 mx-auto flex justify-center flex-wrap gap-x-6 gap-y-10">
        {Historical?.length
          ? Historical.map((book, i) => <BookCard key={i} book={book} />)
          : "No Data found"}
      </div>
      <h1 className="text-5xl font-medium text-center">Action</h1>
      <div className="w-11/12 mx-auto flex justify-center flex-wrap gap-x-6 gap-y-10">
        {Action?.length
          ? Action.map((book, i) => <BookCard key={i} book={book} />)
          : "No Data found"}
      </div>
      <h1 className="text-5xl font-medium text-center">Programming</h1>
      <div className="w-11/12 mx-auto flex justify-center flex-wrap gap-x-6 gap-y-10">
        {Programming?.length
          ? Programming.map((book, i) => <BookCard key={i} book={book} />)
          : "No Data found"}
      </div>

      <h1 className="text-5xl font-medium text-center">Medical</h1>
      <div className="w-11/12 mx-auto flex justify-center flex-wrap gap-x-6 gap-y-10">
        {Medical?.length
          ? Medical.map((book, i) => <BookCard key={i} book={book} />)
          : "No Data found"}
      </div>
      <div className="text-center">
        <Link to="/books" className="p-btn rounded-full">
          More Books
        </Link>
      </div>
    </div>
  );
};

export default TopRatedBooks;
