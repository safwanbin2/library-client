import RequestCard from "../../../components/dashboard/borrowRequest/RequestCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ApprovedRequests = () => {
  const { data: requests, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axios.get(`/borrow?status=approved`);

      return res.data.data;
    },
  });

  return (
    <div className="flex flex-col justify-start items-start gap-5">
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

export default ApprovedRequests;
