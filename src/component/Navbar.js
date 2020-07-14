import React from "react";
import { UserConsumer } from "../userContext";

const UserNav = ({ handleNavChange }) => {
  return (
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item ">
          <a
            className="nav-link"
            href="#"
            onClick={handleNavChange}
            id="mybooks"
          >
            My Books
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            onClick={handleNavChange}
            id="searchbooks"
          >
            Search Books
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            onClick={handleNavChange}
            id="history"
          >
            My History
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="#">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

const LoginRegisterNav = ({ handleNavChange }) => {
  return (
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item ">
          <a className="nav-link" href="#" onClick={handleNavChange} id="login">
            Student Login
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            onClick={handleNavChange}
            id="register"
          >
            Register
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            onClick={handleNavChange}
            id="adminlogin"
          >
            Admin Login
          </a>
        </li>
      </ul>
    </div>
  );
};

function Navbar({ setView }) {
  const handleNavChange = (event) => {
    console.log(event.target.innerHTML);
    setView(event.target.id);
  };

  return (
    <UserConsumer>
      {({currentUser}) => (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Library Management
          </a>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {currentUser === null ? (
            <LoginRegisterNav handleNavChange={handleNavChange} />
          ) : (
            <UserNav handleNavChange={handleNavChange} />
          )}
        </nav>
      )}
    </UserConsumer>
  );
}

export default Navbar;
