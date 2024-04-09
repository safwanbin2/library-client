import { useState } from "react";
import RequestCard from "../../../components/dashboard/borrowRequest/RequestCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BorrowRequests = () => {
  const [status, setStatus] = useState("pending");

  const { data: requests, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axios.get(`/borrow`);

      return res.data.data;
    },
  });

  return (
    <div className="flex flex-col justify-start items-start gap-5">
      <select
        onChange={(e) => setStatus(e.target.value)}
        className="select select-bordered focus:outline-none rounded-full !px-3 w-6/12 md:w-2/12 shadow"
      >
        <option disabled selected>
          Status
        </option>
        <option value="pending">Pending</option>
        <option value="Approved">Approved</option>
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
        {requests?.length
          ? requests.map((request, i) => (
              <RequestCard key={i} request={request} refetch={refetch} />
            ))
          : "No Data found"}
      </div>
    </div>
  );
};

export default BorrowRequests;
