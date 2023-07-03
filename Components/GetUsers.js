import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "./ui/Navbar";
import DeleteUserModal from "./DeleteUserModal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPaginate from "react-paginate";

function GetUsers() {
  const [inputs, setInputs] = useState([]);
  const [searchData, setSearchData] = useState();
  const [inputLength, setInputLength] = useState(0);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState();
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentpage] = useState(1)
  const [ postsPerPage , setPostsPerPage] = useState(10)


  const router = useRouter();

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/getUsers", { token });
      setOpen(false);
      setInputs(response.data.data.data);
      setInputLength(response.data.data.data.length);
    } catch (error) {
      console.log("Error:::-->", error);
    }
  };


  const SearchFn = (e) => {
    const search = e.target.value;


    // setDataSearch(search)
    const filterData = inputs?.filter((item) => {
      const name = item?.name;
      const email = item?.email;
      const roleName = item?.roleName;
      const contactNo = item?.contactNo;
      return (
        name?.toLowerCase().includes(search?.toLowerCase()) ||
        email?.toLowerCase().includes(search?.toLowerCase()) ||
        roleName?.toLowerCase().includes(search?.toLowerCase()) ||
        contactNo?.toLowerCase().includes(search?.toLowerCase())
      );
    });
    setSearchData(filterData);
    setInputLength(filterData.length);



    if (search == "") {
      getAllUsers();
      setSearchData(null)
      return;
    }
  };

  useEffect(() => {
    setOpen(true);
    setInputs(inputs);
    getAllUsers();
  }, []);

  function handleDeleteModalFn(e) {
    setShow(true);
    setUserId(e);
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = inputs?.slice(indexOfFirstPost, indexOfLastPost)

  const Pagination  = ({selected}) =>{
    setCurrentpage(selected + 1) 
    setSearchData(null)
    setInputs(inputs)
  }

  console.log(searchData,"search data here for test.")

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar />
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
            <table className="table " id="users-table">
              <thead>
                <tr className="ctable-head">
                  <th scope="col">Id</th>
                  <th scope="col">EmailId</th>
                  <th scope="col">Name</th>
                  <th scope="col">RoleName</th>
                  <th scope="col">Phone</th>
                  <th scope="col" className="action-td">Action</th>
                </tr>
              </thead>
              <tbody>
                {searchData == null
                  ? currentPosts?.map((item, index) => {
                      return (
                        <tr>
                          <td>
                            <p className="view-paragraph">{index + 1}</p>
                          </td>
                          <td>
                            {" "}
                            <p className="view-paragraph">{item?.emailId}</p>
                          </td>
                          <td>
                            <p className="view-paragraph">{item?.name}</p>
                          </td>
                          <td>
                            <p className="view-paragraph">{item?.roleName}</p>
                          </td>
                          <td>
                            <p className="view-paragraph">{item?.contactNo}</p>
                          </td>

                          <td className="action-td">
                            <p className="view-paragraph">
                              <a
                                href="#"
                                onClick={() => handleDeleteModalFn(item.id)}
                              >
                                <img
                                  src="img/Icon feather-trash-2.png"
                                  alt=""
                                />
                              </a>

                              <Link href={"updateUser/" + item.id}>
                                <img src="img/Icon feather-edit.png" alt="" />
                              </Link>
                            </p>
                          </td>
                        </tr>
                      );
                    })
                  : searchData?.map((item, index) => {
                      return (
                        <tr>
                          <td>
                            <p className="view-paragraph">{index + 1}</p>
                          </td>
                          <td>
                            {" "}
                            <p className="view-paragraph">{item?.emailId}</p>
                          </td>
                          <td>
                            <p className="view-paragraph">{item?.name}</p>
                          </td>
                          <td>
                            <p className="view-paragraph">{item?.roleName}</p>
                          </td>
                          <td>
                            <p className="view-paragraph">{item?.contactNo}</p>
                          </td>

                          <td>
                            <p className="view-paragraph">
                              <a
                                href="#"
                                onClick={() => handleDeleteModalFn(item.id)}
                              >
                                <img
                                  src="img/Icon feather-trash-2.png"
                                  alt=""
                                />
                              </a>

                              <Link href={"updateUser/" + item.id}>
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
            pageCount={Math.ceil(inputs?.length / postsPerPage)}
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


        <DeleteUserModal
          show={show}
          setShow={setShow}
          uid={userId}
          getAllUsers={getAllUsers}
        />
      </section>
    </>
  );
}
export default GetUsers;
