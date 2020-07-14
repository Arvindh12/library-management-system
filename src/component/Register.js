import React ,{useState}  from 'react'

function Register() {

    const [data, setData] = useState({email : "" , password : "" , name : "" })

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        var temp = JSON.parse(JSON.stringify(data));
        temp[name] = value;
        setData(temp);
  
    }
    const handleSubmit = (formdata) => {
    }

    return (
        <div className="container mt-5">
        <div className="row">
        <div className="col-md-4"> </div>
        <div className="col-md-4"> 
    <form onSubmit={ (event) => { event.preventDefault(); handleSubmit(data); } } >
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Name</label>
      <input type="text" className="form-control"  aria-describedby="emailHelp"  name ="name"  value={data.name } onChange={handleChange} required />
       </div>
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control"  aria-describedby="emailHelp"  name ="email"  value={data.email } onChange={handleChange} required />
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input type="password" className="form-control"  name ="password"  value={data.password } onChange={handleChange} required  />
    </div>
    <button type="submit" className="btn btn-primary">Register </button>
    </form>
    </div>
    <div className="col-md-4"> </div>
    </div>
    </div>
    )
}

export default Register
