import React from "react";
import { UserConsumer } from "../userContext";

function Bookdetail({ bookDeatils }) {
  const handleRentBook = async (currentUser, setView, setCurrentUser) => {
    //Assign this book to current user if has less than 3 books with him
    //If there are any books left
    
    if (currentUser.owning.length > 3) {
      console.log("You cannot rent more than 4 books");
      return;
    }
    let bookcount = bookDeatils.books.reduce((acc, itm) => {
      if (itm.currentowner === null) {
        return acc + 1;
      }
      return acc;
    }, 0);
    if (bookcount === 0) {
      console.log("There are no books left");
      return;
    }
    let tempBookDetails = JSON.parse(JSON.stringify(bookDeatils));
    let tempCurrentUser = JSON.parse(JSON.stringify(currentUser));

    for (let i = 0; i < tempBookDetails.books.length; i++) {
      if (tempBookDetails.books[i].currentowner === null) {
        tempBookDetails.books[i].currentowner = currentUser.email;
        break;
      }
    }

    let owningDetails = {
      ISBN: tempBookDetails.ISBN,
      start: new Date(),
      end: null,
    };

    tempCurrentUser.owning.push(owningDetails);

    console.log(tempBookDetails, tempCurrentUser);
    try{
    const [userData, bookdata] = await Promise.all([
      fetch(
        "https://5f0c3fa79d1e150016b37f86.mockapi.io/users/" +
          tempCurrentUser.id,
        {
          method: "PUT",
          body: JSON.stringify(tempCurrentUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json()),
      fetch(
        "https://5f0c3fa79d1e150016b37f86.mockapi.io/libraray/" +
          tempBookDetails.id,
        {
          method: "PUT",
          body: JSON.stringify(tempBookDetails),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json()),
    ]);

    console.log(userData,bookdata)

    //Change view to my books
    setView("mybooks");
    setCurrentUser(userData) 
}
catch(err){
    console.log(err)
}
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">IMAGE</div>
        <div className="col-md-7">
          <dl class="row">
            <dt class="col-sm-3">Title</dt>
            <dd class="col-sm-9">{bookDeatils.title}</dd>

            <dt class="col-sm-3">Author</dt>
            <dd class="col-sm-9">{bookDeatils.author}</dd>

            <dt class="col-sm-3">Description</dt>
            <dd class="col-sm-9">{bookDeatils.description}</dd>

            <dt class="col-sm-3">Publisher</dt>
            <dd class="col-sm-9">{bookDeatils.publisher}</dd>

            <dt class="col-sm-3">Pages</dt>
            <dd class="col-sm-9">{bookDeatils.pages}</dd>

            <dt class="col-sm-3">ISBN</dt>
            <dd class="col-sm-9">{bookDeatils.ISBN}</dd>

            <dt class="col-sm-3">Copies Available</dt>
            <dd class="col-sm-9">
              {bookDeatils.books.reduce((acc, itm) => {
                if (itm.currentowner === null) {
                  return acc + 1;
                }
                return acc;
              }, 0)}
            </dd>
          </dl>
          <UserConsumer>
            {({ currentUser, setView, setCurrentUser}) => (
              <button onClick={() => handleRentBook(currentUser, setView, setCurrentUser)}>
                {" "}
                Rent this book{" "}
              </button>
            )}
          </UserConsumer>
        </div>
      </div>
    </div>
  );
}

export default Bookdetail;
