import React, { useState } from "react";
import BASE_URL from "./Constant";
import Button from "./Button";

const Request = (props) => {
  const { id, role, book, email, status } = props;
  const token = sessionStorage.getItem("token");
  const [requestStatus, setRequestStatus] = useState(status); // Initial request status

  const requestHandler = async (action) => {
    const status = action;
    const response = await fetch(
      `${BASE_URL}/api/v1/issueBook/Approve?id=${id}`,
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
    props.requestChangeHandler(id);
  };

  const onCollectHandler = () => {
    requestHandler("Collected");
    props.requestChangeHandler(id);
  };

  const notCollectedHandler = () => {
    requestHandler("Not Collected");
    props.requestChangeHandler(id);
  };

  const isStudent = role === "Student";
  const isAdmin = role === "Admin";

  return (
    <div className="max-w-md my-4 p-4 bg-white shadow-lg rounded-lg">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2 sm:text-lg">Title: {book}</h1>
        <h2 className="text-lg text-gray-700 mb-4">Requested by: {email}</h2>
        {isAdmin && (
          <div className="flex justify-center space-x-4">
            {requestStatus !== "Approved" ? (
              <>
                <Button onClick={onApproveHandler} title="Approve" />
                <Button onClick={onDenyHandler} title="Deny" />
              </>
            ) : (
              <>
                <Button onClick={onCollectHandler} title="Collect" />
                <Button onClick={notCollectedHandler} title="Didn't Collect" />
              </>
            )}
          </div>
        )}
      </div>
      <div className="text-center mt-4 font-bold">
        <p>Status: {requestStatus}</p>
      </div>
      {isStudent && status === "Approved" ? (
        <p className="text-center mt-2 text-lg text-teal-600">
          Your Request has been approved please check your email for further
          instuctions
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Request;
