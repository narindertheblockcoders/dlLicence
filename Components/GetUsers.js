import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "./ui/Navbar";
import DeleteUserModal from "./DeleteUserModal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function GetUsers() {

  const [inputs, setInputs] = useState([]);
  const [searchData, setSearchData] = useState()
  const [inputLength, setInputLength] = useState(0);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState();
  const [open, setOpen] = React.useState(false);

  const router = useRouter()

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/getUsers", { token });
      setOpen(false)
      setInputs(response.data.data.data)
      setInputLength(response.data.data.data.length)
    } catch (error) {
      console.log("Error:::-->", error)
    }
  }

  const SearchFn = (e) => {
    const search = e.target.value;
    if(search == null )
    {
      getAllUsers()
      return;
    }
   
    // setDataSearch(search)
    const filterData = inputs?.filter((item) => {
      const name = item?.name;
      const email = item?.email;
      const roleName=item?.roleName;
      const contactNo=item?.contactNo;
      return(
        name?.toLowerCase().includes(search?.toLowerCase()) ||
        email?.toLowerCase().includes(search?.toLowerCase()) ||
        roleName?.toLowerCase().includes(search?.toLowerCase()) ||
        contactNo?.toLowerCase().includes(search?.toLowerCase())
      )
     
    })
    setSearchData(filterData)
  setInputLength(filterData.length)

  }

  useEffect(() => {
    setOpen(true)
    setInputs(inputs)
    getAllUsers()
   
  }, [])
  
  function handleDeleteModalFn(e){ 
    setShow(true)
    setUserId(e)
  }

  return (
    <>
    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
>
  <CircularProgress color="inherit" />
</Backdrop>
 <Navbar/>
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
                Total Users: <strong>{inputLength}</strong>
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  onChange={(e) => SearchFn(e)}
                />
                <span className="input-group-text" id="basic-addon2">
                  <img src="img/search.svg" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div className="client-table">
            <table className="table ">
              <thead>
                <tr className="ctable-head">
                  <th scope="col">Id</th>
                  <th scope="col">EmailId</th>
                  <th scope="col">Name</th>
                  <th scope="col">RoleName</th>
                  <th scope="col">ContactNo</th>
                  <th scope="col" />
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>

                {searchData == null? 
                  inputs?.map((item, index) => {
                  return (
                    <tr>
                      <td><p className="view-paragraph">{index + 1}</p></td>
                      <td> <p className="view-paragraph">{item?.emailId}</p></td>
                      <td><p className="view-paragraph">{item?.name}</p></td>
                      <td><p className="view-paragraph">{item?.roleName}</p></td>
                      <td><p className="view-paragraph">{item?.contactNo}</p></td>
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
                      <p className="view-paragraph">
                        <a href="#" onClick={() => handleDeleteModalFn(item.id)}>
                          <img src="img/Icon feather-trash-2.png" alt="" />
                        </a>

                        <Link href={"updateUser/" + item.id} >
                          <img src="img/Icon feather-edit.png" alt="" />
                        </Link>
                        </p>
                      </td>
                    </tr>

                  )
                }): searchData?.map((item, index)=>{

                  return (
                    <tr>
                    <td><p className="view-paragraph">{index + 1}</p></td>
                    <td> <p className="view-paragraph">{item?.emailId}</p></td>
                    <td><p className="view-paragraph">{item?.name}</p></td>
                    <td><p className="view-paragraph">{item?.roleName}</p></td>
                    <td><p className="view-paragraph">{item?.contactNo}</p></td>
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
                    <p className="view-paragraph">
                      <a href="#" onClick={() => handleDeleteModalFn(item.id)}>
                        <img src="img/Icon feather-trash-2.png" alt="" />
                      </a>

                      <Link href={"updateUser/" + item.id} >
                        <img src="img/Icon feather-edit.png" alt="" />
                      </Link>
                      </p>
                    </td>
                  </tr>

                  )
                })

                 }


              </tbody>
            </table>
          </div>
        </div>
        <DeleteUserModal show={show} setShow={setShow} uid={userId} getAllUsers={getAllUsers}
          
        />
      </section>
 




    </>


  )



}
export default GetUsers