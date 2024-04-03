import React, { useState } from "react";
import BorrowCard from "../../../components/cards/BorrowCard";

const MyBook = () => {
  const [borrows, setBorrows] = useState([
    { _id: 1 },
    { _id: 2 },
    { _id: 3 },
    { _id: 4 },
    { _id: 5 },
  ]);
  return (
    <div className="flex flex-col justify-start items-start gap-5">
      <div className="grid grid-cols-1 gap-10 md:gap-8">
        {borrows?.length
          ? borrows.map((borrow, i) => <BorrowCard key={i} borrow={borrow} />)
          : "No Data found"}
      </div>
    </div>
  );
};

export default MyBook;
