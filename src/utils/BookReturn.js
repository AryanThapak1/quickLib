import { useEffect, useState } from "react";
import BASE_URL from "./Constant";

const BookReturn = (props) => {
  const { book, returnTime, issueTime, id } = props;
  const issueDate = new Date(issueTime);
  const formattedIssueDate = issueDate.toLocaleString();
  const [newIssueDate, setNewIssueDate] = useState(formattedIssueDate);
  const returnDate = returnTime ? new Date(returnTime) : null;
  const formattedReturnDate = returnDate ? returnDate.toLocaleString() : "";
  const [fine, setFine] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [returned, setReturned] = useState(false);
  const fineCalculator = () => {
    const now = new Date();
    const diffInDays = Math.floor((now - issueDate) / (1000 * 60 * 60 * 24));
    const currentFine = diffInDays > 14 ? (diffInDays - 14) * 5 : 0;
    setFine(currentFine);
  };

  const reIssueBookHandler = async () => {
    const response = await fetch(
      `${BASE_URL}/api/v1/issuedBooks/reIssueBook?id=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    let newFormmatedIssueDate = new Date(data.issueTime).toLocaleString();
    setNewIssueDate(newFormmatedIssueDate);
  };
  const returnHandler = async () => {
    setWrong(false);
    const response = await fetch(
      `${BASE_URL}/api/v1/issuedBooks/return?id=${id}`,
      {
        method: "POST",
        body: JSON.stringify({ Fine: fine }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      setWrong(true);
      return;
    }
    setReturned(true);
  };

  useEffect(() => {
    fineCalculator();
  }, []);

  return (
    <div className="max-w-md my-4 p-4 bg-white shadow-lg rounded-lg">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">Book: {book}</h1>
        <h2 className="text-lg text-gray-700 mb-4">
          Issue Date: {newIssueDate}
        </h2>
        <h2 className="text-lg text-gray-700 mb-4">
          Return Date: {formattedReturnDate}
        </h2>
        <h2 className="text-lg text-gray-700 mb-4">Fine: {fine} Rs</h2>
        {!returnDate && !returned ? (
          <div className="flex gap-4 items-center justify-center">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-sm text-white py-2 px-4 rounded"
              onClick={returnHandler}
            >
              Return
            </button>
            <button
              className="bg-teal-500 hover:bg-teal-700 text-sm text-white py-2 px-4 rounded"
              onClick={reIssueBookHandler}
            >
              Reissue
            </button>
          </div>
        ) : (
          <p>{returned ? "Returned" : ""}</p>
        )}
        {wrong && <p className="text-red-500">Failed to return the book.</p>}
      </div>
    </div>
  );
};

export default BookReturn;
