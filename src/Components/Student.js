import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookReturn from "../utils/BookReturn";
import BASE_URL from "../utils/Constant";

const Student = () => {
  const token = sessionStorage.getItem("token");
  const searchRef = useRef();
  const [studentData, setStudentData] = useState([]);
  const [wrong, setWrong] = useState(false);
  const searchHandler = async (event) => {
    setWrong(false);
    setStudentData([]);
    event.preventDefault();
    const enrollment_No = searchRef.current.value;
    const response = await fetch(`${BASE_URL}/api/v1/issuedBooks`, {
      method: "POST",
      body: JSON.stringify({ enrollment_No }),
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setWrong(true);
      return;
    }
    const data = await response.json();
    setStudentData(data);
  };

  return (
    <div>
      <div className="flex justify-center">
        <form className="max-w-md w-full bg-white shadow-md rounded-lg px-8 pt-6 pb-4">
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
              type="text"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Search..."
              ref={searchRef}
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              onClick={searchHandler}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {wrong && (
        <p className="text-red-600 text-center">Something Went Wrong</p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {studentData.map((el) => (
          <BookReturn
            key={el._id}
            Name={el.Name}
            book={el.book}
            id={el._id}
            issueTime={el.issueTime}
            returnTime={el.returnTime}
            Fine={el.Fine}
          />
        ))}
      </div>
    </div>
  );
};

export default Student;
