import React, { useState } from "react";
import axios from "axios";

function DeleteUser() {
  const [inputs, setInputs] = useState([]);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  async function deleteUser() {
    try {
      const res = await axios.post("/api/addUser", { data: inputs })
      const response = res.data.data;
      localStorage.setItem("token", response)
      alert("data is insert")
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    deleteUser();
  }

  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Driving</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="css/style.css" />
      <link rel="stylesheet" href="css/responsive.css" />
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/getUsers">
            Driving Schedule Software
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="">
                  Bookings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="schedule.html">
                  Schedule
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="trainers.html">
                  Trainers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="client.html">
                  Clients
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="client.html">
                  Users
                </a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
      <section className="client">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="client-head">
              <h2>Add User</h2>
            </div>
            <div className="client-content">
              <div className="mb-3 client-row">
                <input
                  type="email"
                  className="form-control"
                  id="book-input"
                  placeholder="emailId" name="email" value={inputs.emailId} onChange={handleChange}
                />
              </div>
              <div className="mb-3 client-row">
                <input
                  type="password"
                  className="form-control"
                  id="book-input"
                  placeholder="password" name="password" value={inputs.Password} onChange={handleChange}
                />
              </div>
              <div className="mb-3 client-row">
                <input
                  type="password"
                  className="form-control"
                  id="book-input"
                  placeholder="confirmPassword" name="confirmPassword" value={inputs.confirmPassword} onChange={handleChange}
                />

              </div>
              <div className="mb-3 client-row">
                <input
                  type="name"
                  className="form-control"
                  id="book-input"
                  placeholder="name" name="name" value={inputs.name} onChange={handleChange}
                />
              </div>
              <div className="mb-3 client-row">
                <input
                  type="roleId"
                  className="form-control"
                  id="book-input"
                  placeholder="roleId" name="roleId" value={inputs.roleId} onChange={handleChange}
                />
              </div>

              <div className="mb-3 client-row">
                <input
                  type="text"
                  className="form-control"
                  id="book-input"
                  placeholder="contactNo" name="contactNo" value={inputs.contactNo} onChange={handleChange}
                />
              </div>
              <div className="mb-3 client-textarea">
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  placeholder="status" name="status" value={inputs.status} onChange={handleChange}
                />
              </div>
            </div>
            <div className="client-button">
              <button className="btn-book" type="submit">Add User</button>
            </div>
          </form>
        </div>
      </section>
      <section className="footer">
        <div className="container">
          <p>© 2023 Driving Schedule Software. All Rights Reserved.</p>
        </div>
      </section>
    </>
  )

}
export default DeleteUser;