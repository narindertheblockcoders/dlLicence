import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import Navbar from "./ui/Navbar";
import $ from  "jquery"


function AddUser() {
  const [inputs, setInputs] = useState({
    emailId: "",
    password: "",
    confirmPassword: "",
    name: "",
    roleId: "",
    contactNo: "",
    status: "",
  });

  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rollname, setRollname] = useState();
  const [formError, setFormError] = useState({});
  const [Issubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));

    let formErr = validate(inputs)
    setFormError(formErr)
    // setFormError(validate(inputs));

    setInputs({
      ...inputs,
      [name]: value,
    });
    setFormError({
      ...formError,
      [name]: "",
    });
  };

  async function addUser() {
    try {
      const res = await axios.post("/api/addUser", { data: inputs });
      const response = res.data.data.data;
      localStorage.setItem("token", response);
      setLoading(false);
      toast.success("data inserted Successfully");
      setTimeout(() => {
        Router.push("/getUsers");
      }, [1000]);
    } catch (error) {
      console.log("Error in adduser---->", error);
      if (error.response.status == "500") {
        toast.error("Email already exist");
        setLoading(false);
        setDisable(false)
        return;
      }
      setLoading(false)
      setDisable(false)
    }
  }
  async function getRollname() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/getrollname", { token });
      setRollname(response.data.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    getRollname();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmit(true);
    let formE = validate(inputs);
    setFormError(formE);
    if (Object.keys(formE).length == 0) {
      setLoading(true)
      setDisable(true)
      addUser();
    }

  };

  const validate = (values) => {
    const errors = {};
    var regex = /^[a-zA-Z ]*$/;
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const EMAIL_REGEX = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/
    );

    if (!values.emailId) {
      errors.emailId = "Email is required"
    } else if (!EMAIL_REGEX.test(values.emailId)) {
      errors.emailId = "Invalid email"
    }
    if (!values.name) {
      errors.name = "Name is required";
    } else if (!regex.test(values.name)) {
      errors.name = "Name should be alphabetical";
    } else if (values.name.length < 2 || values.name.length > 20) {
      errors.name =
        "Name should be greater than 2 and less than 20 characters";
    }

    if (!values.contactNo) {
      errors.contactNo = "Mobile number is required";
    } else if (values.contactNo.length != 10) {
      errors.contactNo = "Enter valid mobile number";
    } else if (!phoneRegExp.test(values.contactNo)) {
      errors.contactNo = "Mobile number is not valid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if ((!regularExpression.test(values.password))) {
      errors.password = "Passowrd must contain 8 characters (one uppercase and lowercase letter and number are required).";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Confirm password not match with password";
    }
    if (!values.roleId) {
      errors.roleId = "Role name is required";
    }
    if (!values.status) {
      errors.status = "Status is required";
    }
    return errors;
  };



  async function jQueryFunction() {
    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-solid fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }



  async function jQueryFunctionOne(){
    $(".toggle-one-password").click(function(){
      $(this).toggleClass("fa-solid fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if(input.attr("type") == "password"){
        input.attr("type", "text");
      }else{
        input.attr("type", "password")
      }
    })
  }

  useEffect(() => {
    jQueryFunction();
    jQueryFunctionOne()
  }, []);


  return (
    <>
      <Navbar />
      <ToastContainer />

      <section className="client" id="client">
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
                  placeholder="EmailId"
                  name="emailId"
                  value={inputs.emailId}
                  onChange={handleChange}
                />
                <p className={"input-error"}>{formError.emailId}</p>
              </div>
              <div className="mb-3 client-row">
                <input
                  type="password"
                  className="form-control only-paasword"
                  id="book-input"
                  placeholder="Password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                />
                <span toggle=".only-paasword" className="fa fa-fw fa-eye password-icon toggle-one-password"></span>
                <p className={"input-error"}>{formError.password}</p>

              </div>
              <div className="mb-3 client-row">
                <input
                  type="password"
                  className="form-control confirm-password"
                  id="book-input"
           
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={inputs.confirmPassword}
                  onChange={handleChange}
                />
                <span toggle=".confirm-password" className="fa fa-fw fa-eye password-icon toggle-password"></span>
                <p className={"input-error"}>{formError.confirmPassword}</p>
              </div>
              <div className="mb-3 client-row">
                <input
                  type="name"
                  className="form-control"
                  id="book-input"
                  placeholder="Name"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                />
                <p className={"input-error"}>{formError.name}</p>
              </div>
              <div className="mb-3 client-row">
                <select
                  type="select"
                  className="form-select w-100"
                  aria-label="Default select example"
                  name="roleId"
                  onChange={handleChange}
                >
                  <option value="">Role</option>
                  {rollname?.map((item) => {
                    return (
                      <>
                        <option key={item} value={item.id}>
                          {item.roleName}
                        </option>
                      </>
                    );
                  })}
                </select>
                <p className={"input-error"}>{formError.roleId}</p>
              </div>
              <div className="mb-3 client-row">
                <input
                  type="number"
                  className="form-control"
                  id="book-input"
                  placeholder="ContactNo"
                  name="contactNo"
                  pattern="\d{10}"
                  value={inputs.contactNo}
                  onChange={handleChange}
                />
                <p className={"input-error"}>{formError.contactNo}</p>
              </div>
              <div className="mb-3 client-row">
                <select
                  type="select"
                  className="form-select w-100"
                  aria-label="Default select example"
                  name="status"
                  onChange={handleChange} >
                  <option value="">Status</option>
                  <option value="1">Active</option>
                  <option value="0">Disable</option>
                </select>
                <p className={"input-error"}>{formError.status}</p>
              </div>
            </div>
            <div className="client-button" id="client-button">
              <Button className="btn-book" type="submit" disabled={disable}>
                {loading ? "Loading..." : "Add User"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
export default AddUser;
