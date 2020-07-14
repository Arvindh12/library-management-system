import React, { useEffect, useState } from "react";
import { UserConsumer } from "../userContext";

const DisplayUserBooksTable = ({ library, currentUser, setCurrentUser }) => {
  function getBookTitle(ISBN) {
    return library.find((ele) => ele.ISBN === ISBN).title;
  }
  function getBookAuthor(ISBN) {
    return library.find((ele) => ele.ISBN === ISBN).author;
  }
  const handleReturn = async (currentUser, ISBN, setCurrentUser) => {
    // Transfer data from owning to history is user
    // Update history and make current owner null in library
    console.log(currentUser, ISBN);
    var templibrary = library.find((ele) => ele.ISBN === ISBN);
    var tempUser = JSON.parse(JSON.stringify(currentUser));

    let endDate = new Date();

    let index = currentUser.owning.findIndex((ele) => ele.ISBN === ISBN);
    tempUser.history.push(tempUser.owning.splice(index, 1)[0]);

    tempUser.history[tempUser.history.length - 1].end = endDate;

    console.log(tempUser);

    let bookcount = templibrary.books.length;
    for (let i = 0; i < bookcount; i++) {
      if (templibrary.books[i].currentowner === tempUser.email) {
        let historydata = tempUser.history[tempUser.history.length - 1];
        historydata.ownedby = tempUser.email;
        templibrary.books[i].history.push(historydata);
        templibrary.books[i].currentowner = null;
      }
    }
    console.log(tempUser, templibrary);
    try {
      const [userData, bookdata] = await Promise.all([
        fetch(
          "https://5f0c3fa79d1e150016b37f86.mockapi.io/users/" + tempUser.id,
          {
            method: "PUT",
            body: JSON.stringify(tempUser),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => res.json()),
        fetch(
          "https://5f0c3fa79d1e150016b37f86.mockapi.io/libraray/" +
            templibrary.id,
          {
            method: "PUT",
            body: JSON.stringify(templibrary),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => res.json()),
      ]);
      console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };

  if (library !== null)
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ISBN</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Borrowed On</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUser.owning.map((e) => (
            <tr key={e.ISBN}>
              <th scope="row">{e.ISBN}</th>
              <td>{getBookTitle(e.ISBN)} </td>
              <td>{getBookAuthor(e.ISBN)}</td>
              <td>{e.start.slice(0, 10)}</td>
              <td>
                <button
                  onClick={() => {
                    handleReturn(currentUser, e.ISBN, setCurrentUser);
                  }}
                >
                  Return
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  else {
    return <div>Loading...</div>;
  }
};

function Userbooks() {
  useEffect(() => {
    fetch("https://5f0c3fa79d1e150016b37f86.mockapi.io/libraray")
      .then((res) => res.json())
      .then((data) => {
        setLibrary(data);
        console.log(data);
      });
  }, []);
  const [library, setLibrary] = useState(null);
  return (
    <UserConsumer>
      {({ currentUser, setCurrentUser }) => {
        console.log(currentUser);
        return (
          <div>
            MyBooks{" "}
            {currentUser.owning.length === 0 ? (
              "You have not borrowed any book"
            ) : (
              <DisplayUserBooksTable
                library={library}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          </div>
        );
      }}
    </UserConsumer>
  );
}

export default Userbooks;
