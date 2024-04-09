import BorrowCard from "../../../components/cards/BorrowCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
const MyBorrowings = () => {
  const { userDB } = useContext(AuthContext);

  const { data: borrows, refetch } = useQuery({
    queryKey: ["borrows"],
    queryFn: async () => {
      const res = await axios.get(`/borrow?id=${userDB?._id}`);

      return res.data.data;
    },
  });

  return (
    <div className="flex flex-col justify-start items-start gap-5">
      <div className="grid grid-cols-1 gap-10 md:gap-8">
        {borrows?.length
          ? borrows.map((borrow, i) => (
              <BorrowCard key={i} borrow={borrow} refetch={refetch} />
            ))
          : "No Data found"}
      </div>
    </div>
  );
};

export default MyBorrowings;
