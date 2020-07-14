import React, { useState } from "react";
import { UserConsumer } from "../userContext";

function Login({ setView }) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var temp = JSON.parse(JSON.stringify(data));
    temp[name] = value;
    setData(temp);
  };

  const handleSubmit = (formdata, setCurrentUser) => {
    fetch(
      `https://5f0c3fa79d1e150016b37f86.mockapi.io/users?email=${formdata.email}`
    )
      .then((res) => res.json())
      .then((resData) => {
        if (resData.length === 0) {
          console.log("email not found");
        } else {
          if (resData[0].password !== formdata.password) {
            console.log(resData, formdata.password);
            console.log("passord not matching");
          } else {
    
            setCurrentUser(resData[0]);
            setView("mybooks");
            console.log("logged in successfully");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <UserConsumer>
      {( {setCurrentUser} ) => (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4"> </div>
            <div className="col-md-4">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit(data, setCurrentUser);
                }}
              >
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
            <div className="col-md-4"> </div>
          </div>
        </div>
      )}
    </UserConsumer>
  );
}

export default Login;
