import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
 
function GetDetails() {

    const [inputs,setInputs] = useState([]);

      const getAllUsers = async()=>{
        try {
          const token = localStorage.getItem("token")
          const response = await axios.post("/api/getDetails")
          setInputs(response.data.data.data)
        } catch (error) {
          console.log("Error:",error)
        }
      }

    useEffect(() => {
      getAllUsers()

    },[])

    return(
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
            <a className="navbar-brand" href="#">
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
                  <a className="nav-link " aria-current="page" href="">
                    Booking
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
                  <a className="nav-link active" href="client.html">
                    Clients
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link active " href="getUsers">
                    Users
                  </a>
                </li>
              </ul>
              <form className="d-flex" role="search" id="nav-selects">
                <span>
                  <a href="#">
                    <img src="img/Subtraction 1.svg" alt="" />
                  </a>
                </span>
                <select className="form-select" aria-label="Default select example">
                  <option selected="">Admin</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>
              </form>
            </div>
          </div>
        </nav>
        <section className="Clients">
          <div className="container-fluid">
            <div className="client-head">
              <div className="clienthead-upper">
                <span>Users</span>
                <a href="/addUser" className="add-new">
                  Add New User
                </a>
              </div>
              <div className="clienthead-lower">
                <span>
                  Total Users: <strong>223</strong>
                </span>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                  />
                  <span className="input-group-text" id="basic-addon2">
                    <img src="img/Icon feather-search.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <div className="client-table">
              <table className="table ">
                <thead>
                  <tr className="ctable-head">
                  <th scope="col">id</th>
                  <th scope="col">emailId</th>  
                  <th scope="col">name</th>
                  <th scope="col">roleId</th>
                  <th scope="col">contactNo</th>
                  <th scope="col">status</th>
                  <th scope="col">roleName</th>            
                    <th scope="col" />
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>

                  {inputs?.map((item,index)=>{

                    return(
                      <tr>
                      <th scope="row">{index+1}</th>
                      <td>{item?.emailId}</td>
                      <td>{item?.name}</td>
                      <td>{item?.roleId}</td>
                      <td>{item?.contactNo}</td>
                      <td>{item?.status.toString()}</td>
                      <td>{item?.roleName}</td>
                      {/* <td>20 Aug 2023</td> */}
                      <td className="view-schedule"> 
                        {/* Button trigger modal */}
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          id="vclient-schedule"
                        >
                          View Schedule
                        </button>
                        {/* Modal */}
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex={-1}
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" id="client-dialog">
                            <div className="modal-content">
                              <div className="modal-header" id="client-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                  Feedback
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                              </div>
                              <div className="modal-body" id="client-body">
                                <span>
                                  {" "}
                                  The training program was extremely helpful in
                                  improving my driving skills. The instructors were
                                  knowledgeable and patient, and the practical exercises
                                  helped me gain confidence behind the wheel. The
                                  program was well-organized and structured. It covered
                                  all the important aspects of driving, from basic
                                  maneuvers to more advanced techniques. The instructors
                                  were also able to answer all my questions and provide
                                  helpful feedback.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <img src="img/Icon feather-trash-2.png" alt="" />
                        <Link href="/updateUser">
                        <img src="img/Icon feather-edit.png" alt="" />
                        </Link>
                      </td>
                    </tr>

                    )
                  })                  
                  }   
                </tbody>
              </table>
            </div>
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
export default GetDetails
