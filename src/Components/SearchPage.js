import { useEffect, useRef, useState } from "react";
import Book from "../utils/Book";
import BASE_URL from "../utils/Constant";

const SearchPage = () => {
  const searchRef = useRef();
  const [allBooks,setAllBooks]=useState();
  const [Books, setBooks] = useState([]);
  const fetchData=async ()=>{
    const response=await fetch(`${BASE_URL}/api/v1/Books`)
    const data=await response.json();
    setBooks(data);
    setAllBooks(data);
  }
  const searchHandler = (event) => {
    event.preventDefault();
    const searchTerm = searchRef.current.value;
    if (searchTerm.trim().length === 0) {
      setBooks(allBooks);
      return;
    }
    const books=allBooks;
    const filteredData = books.filter((el) => {
      return el.Name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    setBooks(filteredData);
  };

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {Books.map((el) => (
          <Book key={el._id}id={el._id} Name={el.Name} Author={el.author} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
