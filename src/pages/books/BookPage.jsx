import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import config from "../../config";
import LoadingScreen from "../../components/LoadingScreen";
import BookInformation from "../../components/books/BookInformation";

const BookPage = () => {
  const bookId = useLoaderData();
  const [demoBook, setDemoBook] = useState({ _id: 1 });

  const {
    data: book,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [bookId],
    // queryFn: async () => {
    //   const res = await fetch(`${config.base_url}/books/single/${bookId}`);
    //   const data = await res.json();
    //   return data.data;
    // },
  });

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <div className="mt-24 mb-10 min-h-screen w-11/12 mx-auto space-y-5">
      {/* <div className="grid grid-cols-1 md:grid-cols-8 gap-10">
        <div className="md:col-span-6">
          <PersonProfileInformation refetch={refetch} person={person} />
        </div>
        <div className="md:col-span-2">
          <SimilarProfileList />
        </div>
      </div> */}

      <div className="">
        <BookInformation refetch={refetch} book={demoBook} />
      </div>
    </div>
  );
};

export default BookPage;
