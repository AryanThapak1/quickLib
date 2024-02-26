import classes from "./card.module.css";
const Card = () => {
  const data = {
    Book: "Merchant of venice",
    Issue: "21/01/2004",
    Due: "21/02/2004",
    Fine: 150,
  };

  return (
    <div className={classes.card}>
      <div>
        <h1 className={classes.header}>Book Name</h1>
        <h2>{data.Book}</h2>
      </div>
      <div>
        <h1 className={classes.header}>Issue Date</h1>
        <h2>{data.Issue}</h2>
      </div>
      <div>
        <h1 className={classes.header}>Due Date</h1>
        <h2>{data.Due}</h2>
      </div>
      <div>
        <h1 className={classes.header}>Fine</h1>
        <h2>{data.Fine} Rs</h2>
      </div>
    </div>
  );
};

export default Card;
