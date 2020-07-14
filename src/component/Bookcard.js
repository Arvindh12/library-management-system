import React from 'react'

function Bookcard({book ,setBookDetails}) {
    return (
    
    <tr>
      <th scope="row">{book.ISBN}</th>
      <td>{book.title} </td>
      <td>{book.author}</td>
      <td>{book.publisher}</td>
      <td><button onClick={() => setBookDetails(book) } >Details</button></td>
    </tr>
    
    )
}

export default Bookcard
