import React, { useEffect, useState } from "react";
import Navbar from "./ui/Navbar";
import { Link } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DeleteClientModal from "./DeleteClientModal";
import FeedbackModal from "./FeedbackModal";
import { format } from 'date-fns';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPaginate from "react-paginate";


function Client() {

  const [dataSearch, setDataSearch] = useState();
  const [searchData, setSearchData] = useState();
  const [inputLength, setInputLength] = useState();
  const [show, setShow] = useState();
  const [id, setId] = useState();
  const [allClientData, setAllClientData] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentpage] = useState(1)
  const [ postsPerPage , setPostsPerPage] = useState(10)

  async function getAllClients() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/allClients", { token: token });
      const response = res.data.data;
      setOpen(false)
      setAllClientData(response.data);
      setInputLength(response.data.length);
    } catch (err) {
      console.log(err);
    }
  }

  const SearchFn = (e) => {
    const search = e.target.value;


    setDataSearch(search);
    const filterData = allClientData?.filter((item) => {
      const name = item?.clientName;
      return name?.toLowerCase().includes(search?.toLowerCase());
    });

    setSearchData(filterData);
    setInputLength(filterData.length);

    if (search == "") {
      getAllClients();
      setSearchData(null)
      return;
    }
  };

  useEffect(() => {
    setOpen(true)
    setAllClientData(allClientData);

    getAllClients();
  }, []);

  async function deleteFn(e) {
    setShow(true);
    setId(e);
  }

  async function getFeedback(e) {
    try {
      const id = e;
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/getFeedback", {
        token: token,
        id: id,
      });
      const response = res.data.data;
      setMessage(response);
    } catch (err) {
      console.log(err);
    }
  }


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = allClientData?.slice(indexOfFirstPost, indexOfLastPost)

  const Pagination  = ({selected}) =>{
    setCurrentpage(selected + 1) 
    setSearchData(null)
    
  }

  console.log(searchData,"search data here for test.")


  return (
    <>
         <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
>
  <CircularProgress color="inherit" />
</Backdrop>
      <ToastContainer />
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

      <Navbar />
      <section className="Clients">
        <div className="container-fluid">
          <div className="client-head">
            <div className="clienthead-upper">
              <span>Clients</span>
              <a href="/addClient" className="add-new">
                Add New Client
              </a>
            </div>
            <div className="clienthead-lower">
              <span>
                Total Clients: <strong>{inputLength}</strong>
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
            <table className="table " id="users-table">
              <thead>
                <tr className="ctable-head">
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Vehicle Type</th>
                  <th scope="col">License No.</th>
                  <th scope="col">License Type</th>
                  <th scope="col">Reminder Call</th>
                  <th scope="col" />
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {searchData == null
                  ? currentPosts?.map((item, id) => {
                    return (
                      <tr>
                        <td>
                          {" "}
                          <p className="view-paragraph">{id + 1}</p>
                        </td>
                        <td>
                          {" "}
                          <p className="view-paragraph">{item.clientName}</p>
                        </td>
                        <td>
                          {" "}
                          <p className="view-paragraph">
                            {item.clientMobileNo}
                          </p>
                        </td>
                        <td>
                          {" "}
                          <p className="view-paragraph">-</p>
                        </td>
                        <td>
                          <p className="view-paragraph">- </p>
                        </td>

                        <td>
                          <p className="view-paragraph">
                            {item.clientLicenseType}
                          </p>{" "}
                        </td>
                        <td>

                          <p className="view-paragraph">
                            {format(new Date(item?.reminderCall), 'dd MMM yyyy')
                            }
                          </p>
                        </td>
                        <td className="view-schedule">
                          {/* Button trigger modal */}
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            id="vclient-schedule"
                            onClick={() => getFeedback(item.id)}
                          >
                            View Schedule
                          </button>
                          {/* Modal */}
                        </td>
                        <td>
                          <p className="view-paragraph">
                            <img
                              onClick={() => deleteFn(item.id)}
                              src="img/Icon feather-trash-2.png"
                              alt=""
                            />

                            <Link href={"/updateClient/" + item.id}>
                              <img src="img/Icon feather-edit.png" alt="" />
                            </Link>
                          </p>
                        </td>
                      </tr>
                    );
                  })
                  : searchData?.map((item) => {
                    return (
                      <tr>
                        <td>
                          {" "}
                          <p className="view-paragraph">{item.id}</p>
                        </td>
                        <td>
                          {" "}
                          <p className="view-paragraph">{item.clientName}</p>
                        </td>
                        <td>
                          {" "}
                          <p className="view-paragraph">
                            {item.clientMobile}
                          </p>
                        </td>
                        <td>
                          {" "}
                          <p className="view-paragraph">-</p>
                        </td>
                        <td>
                          <p className="view-paragraph">- </p>
                        </td>

                        <td>
                          <p className="view-paragraph">
                            {item.clientLicenseType}
                          </p>{" "}
                        </td>
                        <td>

                          <p className="view-paragraph">
                            {new Date(
                              item?.reminderCall
                            ).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="view-schedule">
                          {/* Button trigger modal */}
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            id="vclient-schedule"
                            onClick={() => getFeedback(item.id)}
                          >
                            View Schedule
                          </button>
                          {/* Modal */}
                        </td>
                        <td>
                          <p className="view-paragraph">
                            <img
                              onClick={() => deleteFn(item.id)}
                              src="img/Icon feather-trash-2.png"
                              alt=""
                            />

                            <Link href={"/updateClient/" + item.id}>
                              <img src="img/Icon feather-edit.png" alt="" />
                            </Link>
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        {inputLength <= 10 || inputLength == null? null:
        (
          <div className="paginate-sec">
            <ReactPaginate
            previousLabel="← Previous"
            nextLabel="Next →"
            onPageChange={Pagination}
            pageCount={Math.ceil(allClientData?.length / postsPerPage)}
            containerClassName="pagination"
            previousLinkClassName="pagination__link"
            nextLinkClassName="pagination__link"
            disabledClassName="pagination__link--disabled"
            activeClassName="pagination_link--active"
            className="page-link"
            />

          </div>
        )}
                </div>

      </section>

      <DeleteClientModal
        show={show}
        setShow={setShow}
        id={id}
        getAllClients={getAllClients}
      />

      <FeedbackModal props={message} />
    </>
  );
}
export default Client;
