import React, { useState, useEffect } from "react";
import Card from "../utils/Cards";
import BasicBars from "../utils/Barchart";
import BASE_URL from "../utils/Constant";

const Dashboard = () => {
  const [totalFine, setTotalFine] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [booksIssuedPerMonth, setBooksIssuedPerMonth] = useState([]);
  const [month, setMonth] = useState([]);
  
  useEffect(() => {

    const fetchData = async () => {
     const token=sessionStorage.getItem("token");
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/issuedBooks/statistics?year=2024`,{
            method:"GET",
            headers:{
                "Authentication":`Bearer ${token}`
            }
          }
        );
        const data = await response.json();
        setTotalFine(data.totalFine);
        setTotalBooks(data.totalBooksIssued);
        setBooksIssuedPerMonth(data.booksIssuedPerMonth.map((el) => el.count));
        setMonth(data.booksIssuedPerMonth.map((el) => el.month));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const cardData = [
    {
      title: "Total Fine",
      value: `${totalFine} Rs`,
    },
    {
      title: "Total Books",
      value: totalBooks,
    },
  ];

  return (
    <div>
      <div className="flex gap-4 items-center justify-center">
        {cardData.map((el, index) => (
          <Card key={index} title={el.title} value={el.value} />
        ))}
      </div>
      {booksIssuedPerMonth.length > 0 && month.length > 0 && (
        <BasicBars seriesData={booksIssuedPerMonth} xAxisLabels={month} />
      )}
    </div>
  );
};

export default Dashboard;
