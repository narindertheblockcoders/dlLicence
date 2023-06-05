import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ClientInfoModal = ({ bookingShowModal, setBookingShowModal, bookingId }) => {
  const handleClose = () => setBookingShowModal(false);
  const handleShow = () => setBookingShowModal(true);
  const [dataById, setDataById] = useState()
  async function getClientById() {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/getClientDataById", { token: token, bookingId: bookingId })
      setDataById(response.data.data.data)
    } catch (error) {
      console.log("Error:", error)
    }
  }
  useEffect(() => {
    getClientById()
  }, [bookingId])

  return (
    <div>
      <ToastContainer />
      <Modal
        show={bookingShowModal} onHide={handleClose} animation={false}
        size="small"
        aria-labelledby="contained-modal-title-vcenter"
        className='tranext-modal'
        id="trainer-modal"
        centered
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className='trainnext-body'>
          <h2>Client Information</h2>
          <form >
            <div>
              <div className="trainnext-box">
                {dataById?.map((item) => {
                  return (
                    <>
                      <h6>{item?.vehicleType}</h6>
                      <small>Client</small>
                      <span>{item?.clientName}</span>
                      <small>Booking Ref. no. </small>
                      <span>{item?.bookingRefNo}</span>
                      <small>Driving License no. </small>
                      <span>{item?.licenseNo}</span>
                      <small>Date Booking </small>
                      <span>
                        {" "}
                        {new Date(
                          item.dateOfBooking
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        <strong>(First Booking)</strong>
                      </span>
                      <small>Trainer</small>
                      <span>{item?.trainerName}</span>
                    </>
                  )
                })}
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ClientInfoModal