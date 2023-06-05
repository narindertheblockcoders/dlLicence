import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
const EmailVerify = () => {
  const [emailId, setEmailId] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  async function emailVerify(emailId) {
    try {
      const res = await axios.post("/api/forgetPassword/emailVerify", { emailId: emailId })
      const response = res.data
      setLoading(false)
      toast.success("Email verify successfuly")
      router.push({
        pathname: '/forgetPassword/passwordForget',
        query: { emailId },
      }, [1000]);
    } catch (error) {
      console.log("Error:", error);
      toast.error("Please try again")
      setLoading(false)
    }
  }

  async function submitHandlerFn(e) {
    e.preventDefault()
    setLoading(true)
    if (emailId == null) {
      toast.error("Please enter email address.")
      setLoading(false)
    }
    emailVerify(emailId)
  }
  return (
    <section className="client" id="login">
      <ToastContainer />
      <div className="container">
        <form onSubmit={submitHandlerFn}>
          <div className="client-head">
            <h2>Verify Your Email </h2>
          </div>
          <div className="client-content">
            <div className="mb-3 client-row">
              <input
                type="email"
                className="form-control"
                id="book-input"
                placeholder="Email Id"
                name="emailId"
                defaultValue={emailId}
                onChange={(e) => setEmailId(e.target.value)}
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

export default EmailVerify;
