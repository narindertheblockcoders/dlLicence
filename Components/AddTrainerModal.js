import React from "react";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import AddScheduleModal from "./AddScheduleModal";

const AddTrainerModal = ({
  showModal,
  setShowModal,
  itemId,
  schedualDataFn,
  schTime,
  schDate
}) => {
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [allTrainer, setAllTrainer] = useState();
  const [allSchedule, setAllScheduled] = useState();
  const [loading, setLoading] = useState(false);
  const [showTrainerData, setShowTrainerData] = useState();
  const [show, setShow] = useState()
  const [trainerId, setTrainerId] = useState()
  const [trainer, setTrainer] = useState()
  const [clientName, setClientName] = useState()
  const [mobileNo, setMobileNo] = useState()
  const [vehicleType, setVehicletype] = useState()
  const [location, setLocation] = useState()
  const [clientId,setClientId] = useState()
  const [testTrainer, setTestTrainer] = useState()
  const [trainerErr, setTrainerErr] = useState()

  async function getAllTrainer() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/getAllTrainer", { token });
      setAllTrainer(response.data.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function getAllScheduleData() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/getAllSchedule", { token });
      const result = [].concat.apply([], response.data.data.data);
      const filterData = result?.filter((item) => {
        const dataId = item?.id;

        return dataId == itemId;
      });
      setAllScheduled(filterData);
      setTrainer(filterData.trainerId)
      filterData.map((item) => {
        setTrainer(item?.trainerId)
        setClientName(item?.clientName)
        setMobileNo(item?.clientMobileNo)
        setVehicletype(item?.vehicleTypeId)
        setLocation(item?.locationId)
        setClientId(item?.clientId)
      })

      console.log("filterData-->",filterData);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function addTrainerFn(newData) {
    console.log("newData:", newData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/addTrainer", {
        token: token,
        data: newData,
      });
      setShowTrainerData(response.data.data.data)
      console.log("response data-->", response.data.data.data);
      // setLoading(false);
      setTimeout(() => {
        setShowModal(false);
      }, [1000]);
      schedualDataFn();
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
      toast.error(" Please try again");
    }
  }

  useEffect(() => {
    getAllTrainer();
    getAllScheduleData();
  }, [itemId, showTrainerData]);


  async function modalShowFn(e) {
    e.preventDefault()
    setShow(true);
    setShowModal(false);

    setTrainerErr(false)
    if (!trainer) {
      setTrainerErr(true)
      return;
    }
    const newData = {
      trainerId: trainer,
      bookingId: itemId,
    };
    if (!trainerErr) {
          addTrainerFn(newData);
        
    }

  }
  async function trainerErrFn() {
    setTrainerErr(false);
  }
console.log("hello trainer-->",trainer)
  return (
    <div>
      <ToastContainer />

      <Modal
        show={showModal}
        onHide={handleClose}
        animation={false}
        size="small"
        aria-labelledby="contained-modal-title-vcenter"
        className="tranext-modal"
        id="trainer-modal"
        centered
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="trainnext-body">
          <h2>Add Trainer</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              {allSchedule?.map((item1) => {
                return (
                  <>
                    <select
                      className="form-select form-select-lg mb-3 trainnext-select"
                      aria-label=".form-select-lg example"
                      onClick={trainerErrFn}
                      name="trainerid"
                      onChange={(e) => setTrainer(e.target.value)}
                    >
                      {item1.trainerId != null ? item1.trainerName : <option value="">Select Trainer</option>}
                      {/* <option value="">Select Trainer</option> */} 
                      {allTrainer?.map((item, idx) => {

                        return (
                          <option
                            value={item?.id}
                            selected={
                              item?.trainerName == item1.trainerName
                            }
                          >
                            {item.trainerName}
                          </option>
                        );
                      })}
                    </select>
                    {trainerErr && (
                      <span className="input-error">Select trainer</span>
                    )}
                  </>
                )
              })}

              {allSchedule?.map((item) => {
                return (
                  <>
                    {item.trainerId != null ? (
                      <div className="trainnext-box">
                        <h5>
                          {new Date(item?.dateOfBooking).toLocaleTimeString(
                            "en-IN",
                            { hour: "numeric", minute: "numeric", hour12: true }
                          )}
                        </h5>
                        <h6>{item?.vehicle}</h6>
                        <small>Client</small>
                        <span>{item?.clientName}(0435906388)</span>
                        <small>Booking Ref. no. </small>
                        <span>{item?.bookingRefNo}</span>
                        <small>Driving License no. </small>
                        <span>{item?.licenseNo}</span>
                        <small>Date Booking </small>
                        <p>
                          {" "}
                          {new Date(item?.dateOfBooking).toLocaleDateString(
                            "en-US",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}{" "}
                          <strong>(First Booking)</strong>
                        </p>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
            <div className="client-button p-0">
              <button
                type="submit"
                className="btn-book btn btn-primary "
                disabled={loading}
                data-bs-target="#exampleModalToggle3"
                data-bs-toggle="modal"
                onClick={(e) =>
                  modalShowFn(e)
                }
              >
                {" "}
                {loading ? "Loading..." : "Next"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <AddScheduleModal
        show={show}
        setShow={setShow}
        trainerId={trainer}
        schDate={schDate}
        schTime={schTime}
        clientName={clientName}
        mobileNo={mobileNo}
        vehicleType={vehicleType}
        location={location}
        clientId={clientId}
      />
    </div>
  );
};

export default AddTrainerModal;
