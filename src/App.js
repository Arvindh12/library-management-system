import React, { useState } from "react";
import Login from "./component/Login";
import Searchbooks from "./component/Searchbooks";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import History from "./component/History";
import Userbooks from "./component/Userbooks";
import { UserProvider } from "./userContext";

function App() {
  const [view, setView] = useState("login");

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      <UserProvider value={{currentUser, setCurrentUser , setView}}>
        <Navbar currentUser={currentUser} setView={setView} />
        {
          {
            login: <Login setCurrentUser={setCurrentUser} setView={setView} />,
            searchbooks: <Searchbooks currentUser={currentUser} />,
            register: <Register />,
            mybooks: <Userbooks />,
            history: <History />,
          }[view]
        }
      </UserProvider>
    </>
  );
}

export default App;
