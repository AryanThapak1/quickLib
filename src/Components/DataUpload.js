import React, { useEffect, useState } from "react";
import UploadFile from "./../utils/uploadFile";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DataUpload = () => {
  const navigate = useNavigate();
  const [successFull, setSuccesFull] = useState(false);
  const formData = new FormData();
  const token = sessionStorage.getItem("token");
  const handleFileChange = (event, identifier) => {
    const file = event.target.files[0];
    formData.append("file", file, `${identifier}`);
  };

  const onClickHandler = async () => {
    const response = await fetch(`http://localhost:8000/api/v1/add`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setSuccesFull(true);
      setTimeout(() => {
        navigate("/Search-book");
      }, 2000);
    }
  };

  const checkAccess = async () => {
    const token = sessionStorage.getItem("token");
    const response = await fetch("", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      navigate("/profile");
    }
  };
  useEffect(() => {
    checkAccess();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <Typography variant="h4" className="font-semibold">
            Upload Student Data
          </Typography>
          <Typography variant="body1">
            Please upload the file containing student data. Supported file
            formats: CSV, Excel.
          </Typography>
          <UploadFile
            label="Choose File"
            onChange={(e) => handleFileChange(e, "Student")}
          />
        </div>
        <div>
          <Typography variant="h4" className="font-semibold">
            Upload Book Data
          </Typography>
          <Typography variant="body1">
            Please upload the file containing book data. Supported file formats:
            CSV, Excel.
          </Typography>
          <UploadFile
            label="Choose File"
            onChange={(e) => handleFileChange(e, "Book")}
          />
        </div>
        {successFull && <p>Data inserted Succesfully</p>}
      </div>
      <button
        className="border-blue-600 bg-blue-600 text-white px-2 py-2 rounded absolute translate-x-[-50%] left-[50%] my-16"
        onClick={onClickHandler}
      >
        Submit
      </button>
    </>
  );
};

export default DataUpload;