import React, { useState } from "react";
import BASE_URL from "./Constant";

const Request = (props) => {
  const { role, book, email } = props;
  const token = sessionStorage.getItem("token");
  const [requestStatus, setRequestStatus] = useState("Pending"); // Initial request status

  const requestHandler = async (action) => {
    const status = action;
    const response = await fetch(
      `${BASE_URL}/api/v1/issueBook/Approve`,
      {
        method: "POST",
        body: JSON.stringify({ email, status, book }),
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      // Update request status in UI upon successful approval or rejection
      setRequestStatus(status);
      return;
    }
    setRequestStatus("Rejected");
  };

  const onApproveHandler = () => {
    requestHandler("Approved");
  };

  const onDenyHandler = () => {
    requestHandler("Rejected");
  };

  return (
    <div className="max-w-md my-4 p-4 bg-white shadow-lg rounded-lg">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2 sm:text-lg">Title: {book}</h1>
        <h2 className="text-lg text-gray-700 mb-4">Requested by: {email}</h2>
        {role === "Admin" && (
          <div className="flex justify-center space-x-4">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-sm text-white py-2 px-4 rounded"
              onClick={onApproveHandler}
            >
              Approve
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-sm text-white py-2 px-4 rounded"
              onClick={onDenyHandler}
            >
              Deny
            </button>
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        <p>Status: {requestStatus}</p>
      </div>
    </div>
  );
};

export default Request;
