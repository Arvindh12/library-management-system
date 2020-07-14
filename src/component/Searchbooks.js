import React, { useEffect, useState } from "react";
import Bookcard from "./Bookcard";
import Bookdetail from './Bookdetail'

function Searchbooks() {
  useEffect(() => {
    fetch(
      "https://5f0c3fa79d1e150016b37f86.mockapi.io/libraray"
    )
    .then((res) => res.json())
    .then((data)=> {
      setLibrary(data);
      console.log(data);
    })

  }, []);
  const [library, setLibrary] = useState(null);
  const [bookDeatils, setBookDetails ] = useState(false)

  return (
    <div>

     {library != null && bookDeatils === false ? <table className="table">
        <thead>
          <tr>
            <th scope="col">ISBN</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Publisher</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {library.map((data) => (
            <Bookcard book={data} setBookDetails={setBookDetails} />
          ))}
        </tbody>
      </table> :  (bookDeatils === false)? <div>Looding...</div> : <Bookdetail bookDeatils={bookDeatils}/> }

    </div>
  );
}

export default Searchbooks;
