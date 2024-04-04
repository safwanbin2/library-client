import React, { useState } from "react";
import RequestCard from "../../../components/dashboard/borrowRequest/RequestCard";
import BookRequestCard from "../../../components/cards/BookRequestCard";

const BookRequests = () => {
  const [requests, setRequests] = useState([
    { _id: 1 },
    { _id: 2 },
    { _id: 3 },
    { _id: 4 },
    { _id: 5 },
  ]);
  return (
    <div className="flex flex-col justify-start items-start gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
        {requests?.length
          ? requests.map((request, i) => (
              <BookRequestCard key={i} request={request} />
            ))
          : "No Data found"}
      </div>
    </div>
  );
};

export default BookRequests;
