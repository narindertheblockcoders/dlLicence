import React, { useState, useEffect } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "react-bootstrap";
import $ from "jquery"

function Login() {

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const router = useRouter()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values => ({ ...values, [name]: value }))
  }
  async function loginUser() {
    try {
      console.log(formData, "formdata for response")
      const response = await axios.post("/api/login", {
        data: formData,
      });

      toast.success("Login Successfully")
      localStorage.setItem("token", response.data.data.data)
      setLoading(false)
      setTimeout(() => {
        router.push("/getUsers")

      }, [1000])

    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("Invalid Credentials")
    }
  }

  async function submitHandlerFn(e) {
    e.preventDefault();
    setLoading(true)
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!formData?.emailId || !formData?.password) {
      toast.error("Please Provide all the credentials");
      setLoading(false)
      return;
    }

    if (!formData?.emailId.includes(".com")) {
      toast.error("Please provide valid email Address");
      setLoading(false)
      return;
    }

    if (!regularExpression.test(formData?.password)) {
      toast.error(
        "Passowrd must contain 8 characters (one uppercase and lowercase letter and number are required."
      );
      setLoading(false)
      return;
    }
    loginUser()
  }

  async function jqueryFn() {

    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));

      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    })
  }

  useEffect(() => {
    jqueryFn()
  }, [])

  return (
    <>
      <ToastContainer />
      <link rel="stylesheet" href="css/style.css" />
      <link rel="stylesheet" href="css/responsive.css" />
      <section className="client" id="login">
        <div className="container">
          <form onSubmit={submitHandlerFn}>
            <div className="client-head">
              <h2>LogIn Form</h2>
            </div>
            <div className="client-content">
              <div className="mb-3 client-row">
                <input
                  type="email"
                  className="form-control"
                  id="book-input"
                  placeholder="EmailId" name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 client-row">
                <input
                  type="password"
                  className="form-control"
                  id="book-inputs"
                  placeholder="Password" name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span toggle="#book-inputs" className="fa fa-fw fa-eye field-icon toggle-password"></span>

              </div>
            </div>
            <div className="client-button">
              <Button className="btn-book" type="submit" disabled={loading} >
                {loading ? "Loading..." : "Login"}
              </Button>
            </div>
            <Link href="/forgetPassword">
              <p className="forget-text">Forget Password</p>
            </Link>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login