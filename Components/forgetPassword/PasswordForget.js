import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const PasswordForget = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const emailData = router?.query
  const emailId = emailData.emailId

  async function forgetPassword(data) {
    try {
      const res = await axios.post("/api/forgetPassword/forgetPassword", data)
      const response = res.data
      setLoading(false)
      toast.success("Password changed successfully")
      setTimeout(() => {
        router.push("/login")
      }, [1000])
    } catch (error) {
      console.log("Error", error);
      toast.error("Please try again")
      setLoading(false)
    }
  }

  async function submitHandlerFn(e) {
    e.preventDefault()
    setLoading(true)
    if (!password == confirmPassword) {
      toast.error("Password and confirm password dosen't match.")
      setLoading(false)
    }
    const data = {
      password,
      confirmPassword,
      emailId
    }
    forgetPassword(data)
  }
  return (
    <section className="client" id="login">
      <ToastContainer />
      <div className="container">
        <form onSubmit={submitHandlerFn}>
          <div className="client-head">
            <h2>Change Password </h2>
          </div>
          <div className="client-content">
            <div className="mb-3 client-row">
              <input
                type="password"
                className="form-control"
                id="book-input"
                placeholder="Password"
                name="emailId"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3 client-row">
              <input
                type="password"
                className="form-control"
                id="book-input"
                placeholder="Confirm Password"
                name="emailId"
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="client-button">
            <Button className="btn-book" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PasswordForget;
