import React, { useState, useEffect } from "react";
import Request from "../utils/Request";
import BASE_URL from "../utils/Constant";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const token = sessionStorage.getItem("token");
  const [role, setRole] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/issueBook/checkRequests`,
        {
          method: "GET",
          headers: {
            Authentication: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setRequests(data.requests);
      setRole(data.role);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {requests.map((request) => (
        <Request
          key={request._id}
          email={request.email}
          book={request.book}
          id={request._id}
          role={role}
        />
      ))}
    </div>
  );
};

export default Requests;
