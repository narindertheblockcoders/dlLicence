
import React, { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./ui/Navbar";

function UpdateUser({ itemData }) {
const [roleData,setRoleData] = useState()
  const [rollName, setRollName] = useState()
  const [userById, setUserById] = useState([])
  const [roleID, setRoleID] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState({});
  const [Issubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    confirmPassword: "",
    name: "",
    roleId: "",
    contactNo: "",
    status: "",
    id: itemData?.id
  })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value , roleId:roleData }));

    setFormData({
      ...formData,
      [name]: value,
    });
    setFormError({
      ...formError,
      [name]: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formE = validate(formData);
    setFormError(formE);


    setIsSubmit(true);
    if (Object.keys(formE).length == 0 ) {
      updateUserById(formData);

    }

  };

  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var regex = /^[a-zA-Z ]*$/;
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    // var regex = /^[a-zA-Z ]*$/;

    if (!values.name) {
      errors.name = "Name is required";
    } else if (!regex.test(values.name)) {
      errors.name = "Name should be alphabetical";
    } else if (values.name.length < 2 || values.name.length > 20) {
      errors.name =
        "Name should be greater than 2 and less than 20 character";
    }
    if (!values.contactNo) {
      errors.contactNo = "Mobile number is required";
    } else if (values.contactNo.length != 10) {
      errors.contactNo = "Enter 10 digit mobile number";
    } else if (!phoneRegExp.test(values.contactNo)) {
      errors.contactNo = "Mobile number is not valid";
    }
    if (!values.emailId) {
      errors.emailId = "Email is required";
    } else if (!values.emailId.includes(".com")) {
      errors.emailId = "Enter valid email";
    }

    if (!values.roleId) {
      errors.roleId = "Role name is required";
    }
    if (!values.status) {
      errors.status = "Status is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    }
    return errors;
  };

  const getUserById = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/getUserById", { token: token, userId: `${itemData.id}` })
      setFormData(response.data.data.data[0])
      setRoleID(response.data.data.data[0].roleName)
    } catch (error) {
      console.log("Error:::-->", error)
    }
  }

  const updateUserById = async (data) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/updateUser", { token, data })
      setLoading(false)
      toast.success("data updated Successfully")

      setTimeout(() => {
        Router.push("/getUsers")
      }, [2000])

    } catch (error) {
      console.log("Error:", error)
    }
  }

  async function getRoleName() {

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/getrollname", { token })
      setRollName(response.data.data.data)
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    getRoleName()
    getUserById()

  }, [])

  return (
    <>
      <ToastContainer />
      <Navbar />
      <section className="client">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="client-head">
              <h2>Update User</h2>
            </div>
            <div className="client-content">


              <div className="mb-3 client-row">
                <input
                  type="email"
                  className="form-control"
                  id="book-input"

                  placeholder="EmailId"
                  name="emailId" 
                  // name={`emailId-${Math.random().toString(36).substring(2, 15)}`}
                  // defaultValue={formData?.emailId}
                  value={formData?.emailId || ""}
                  onChange={handleChange}
                />
                <p className={"input-error"}>{formError.emailId}</p>
              </div>

              <div className="mb-3 client-row">
                <input
                  type="password"
                  className="form-control"
                  id="book-input"
                  placeholder="Password"
                  name="password" 
                  // name={`password-${Math.random().toString(36).substring(2, 15)}`}
                  onChange={handleChange}
                />
                <p className={"input-error"}>{formError.password}</p>
              </div>
              <div className="mb-3 client-row">
                <input
                  type="password"
                  className="form-control"
                  id="book-input"
                  placeholder="Confirm Password" name="confirmPassword" defaultValue={formData?.confirmPassword}
                  onChange={handleChange}
                />
                <p className={"input-error"}>{formError.confirmPassword}</p>
              </div>
              <div className="mb-3 client-row">
                <input
                  type="text"
                  className="form-control"
                  id="book-input"
                  placeholder="Name" name="name" defaultValue={formData?.name}
                  onChange={handleChange}
                />
                <p className={"input-error"}>{formError.name}</p>
              </div>
              <div className="mb-3 client-row">

                  <select className="form-roleName" aria-label="Default select example" onChange={(e)=> setFormData({...formData,roleId:e.target.value})}
                   name="roleId"   >


                    {rollName?.map((item) => {
                      
                      return (
                        <>
                        
                            <option selected={item?.id == formData?.roleId} value={item?.id}> {item?.roleName}</option>
                          
                        </>
                      )
                    }
                    )}
                  </select>

                <p className={"input-error"}>{formError.roleId}</p>
              </div>

              <div className="mb-3 client-row">
                <input
                  type="number"
                  className="form-control"
                  id="book-input"
                  placeholder="ContactNo" name="contactNo" defaultValue={formData?.contactNo} onChange={handleChange} />
                <p className={"input-error"}>{formError.contactNo}</p>
              </div>
              <select className="form-select" aria-label="Default select example" name="status" onChange={handleChange} >
                <option selected={formData?.status == 1 ? true : false} value="1">Active</option>
                <option selected={formData?.status == 0 ? true : false} value="0" >Disable</option>
              </select>
              <p className={"input-error"}>{formError.status}</p>
            </div>
            <div className="client-button">
              <Button className="btn-book" type="submit">
                {loading == true ? "Loading..." : "Update User"}
              </Button>
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
export default UpdateUser;