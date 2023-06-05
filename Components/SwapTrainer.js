import React from 'react'
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import {swapTrainerModalSchema } from './Utils/Schema'
import axios from 'axios';
import {
  Formik,
  Field,
  ErrorMessage,
  useFormik,
  validateYupSchema,
} from "formik";

const SwapTrainer = ({ showModal, setShowModal, itemId, getAllSchedule,trainerId }) => {
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [allTrainer, setAllTrainer] = useState()
  const [allSchedule, setAllScheduled] = useState()
  const [loading, setLoading] = useState(false)
  const [trainerNames, setTrainerNames] = useState()
  const [trainerIdValue,setTrainerIdValue] =useState()
  
  async function onSubmit(values) {
    setLoading(true)
    let newData = {
      trainerId: values?.trainerId,
      clientId: itemId?.id,
      scheduleId:itemId?.scheduleId

    }

    addTrainerFn(newData)
  }
  
  const { values, errors, handleBlur, resetForm, handleChange, handleSubmit, touched } =

    useFormik({
      initialValues: {
        trainerId: "",
      },
      validationSchema: swapTrainerModalSchema,
      onSubmit,

    });

  async function getAllTrainer() {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/getAllTrainer", { token })
      setAllTrainer(response.data.data.data)
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function getAllSchedules() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/getSchedules", { token: token });
      const response = res.data.data.data;
      const filterData = response?.filter((item) => {
        const dataId = item?.id;

        return dataId == itemId
      })

      setAllScheduled(filterData)
    } catch (err) {
      console.log(err, "all shedule error");
    }
  }

  async function addTrainerFn(newData) {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/swapTrainer", { token: token, data: newData })
      setLoading(false)
      toast.success("Trainer swap successfully")
      resetForm();
      setTimeout(() => {
        setShowModal(false)
      }, [2000]);
      getAllSchedule()

    } catch (error) {
      console.log("Error:", error);
      setLoading(false)
      toast.error(" Please try again")
    }
  }

  useEffect(() => {
    getAllTrainer()
    setTrainerIdValue(trainerId)
    getAllSchedules()

  }, [showModal])


  return (
    <div>
          <ToastContainer />

      <Modal
        show={showModal} onHide={handleClose} animation={false}
        size="small"
        aria-labelledby="contained-modal-title-vcenter"
        className='tranext-modal'
        id="trainer-modal"
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Add Trainer
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body className='trainnext-body'>


          <h2>Add Trainer</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
          <div>
          <select className="form-select form-select-lg mb-3 trainnext-select" aria-label=".form-select-lg example"
            name="trainerId"
            onChange={handleChange}
            onBlur={handleBlur}
             
          >
             <option selected="">Select Trainer</option>
            {allTrainer?.map((item,idx)=>{
              return(
                <option value={item?.id} selected={item?.id == trainerIdValue ? true : false}>{item.trainerName}</option>
              )
            })}
           
          </select>
          {errors?.trainerId && touched?.trainerId && (
                <p className="input-error">{errors?.trainerId}</p>
              )}

              
          { allSchedule?.map((item) => {
            return (
              <>
              {item.trainerId != null? 
                <div className="trainnext-box">
                  <h5>{new Date(item?.dateOfBooking).toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true })}</h5>
                  <h6>{item?.vehicle}</h6>
                  <small>Client</small>
                  <span>{item?.name}(0435906388)</span>
                  <small>Booking Ref. no. </small>
                  <span>{item?.bookingRefNo}</span>
                  <small>Driving License no. </small>
                  <span>{item?.licenseNo}</span>
                  <small>Date Booking </small>
                  <p> {new Date(item?.dateOfBooking).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })} <strong>(First Booking)</strong></p>
                 
                </div>
         : null }
              </>
            )
          })}

          </div>
          <div className="client-button p-0"><button type="submit" className="btn-book btn btn-primary " disabled={loading}> {loading ? "Loading..." : "ADD"}</button></div>
          </form>
         
        </Modal.Body>

      </Modal>
    </div>
  )
}

export default SwapTrainer