
import React, { useState, useEffect } from "react";
import Navbar from "./ui/Navbar";
import axios from "axios";
import { format } from 'date-fns';
import Link from "next/link";
import AddScheduleModal from "./AddScheduleModal";

function Trainers() {

  const timeSchedule = [
    { time: "07:00 AM" },
    { time: "07:30 AM" },
    { time: "08:00 AM" },
    { time: "08:30 AM" },
    { time: "09:00 AM" },
    { time: "09:30 AM" },
    { time: "10:00 AM" },
    { time: "10:30 AM" },
    { time: "11:00 AM" },
    { time: "11:30 AM" },
    { time: "12:00 PM" },
    { time: "12:30 PM" },
    { time: "01:00 PM" },
    { time: "01:30 PM" },
    { time: "02:00 PM" },
    { time: "02:30 PM" },
    { time: "03:00 PM" },
    { time: "03:30 PM" },
    { time: "04:00 PM" },
    { time: "04:30 PM" },
    { time: "05:00 PM" },
    { time: "05:30 PM" },
    { time: "06:00 PM" },
    { time: "06:30 PM" },
    { time: "07:00 PM" },
  ];

  const [trainer, setTrainer] = useState()
  const [trainerData, setTrainerData] = useState([])
  const [bookLocation, setBookLocation] = useState()
  const [vehicleType, setVehicleType] = useState()
  const [dataState, setDataState] = useState()
  const [show, setShow] = useState(false)
  const [trainerId, setTrainerId] = useState()
  const [trainerName, setTrainerName] = useState()
  const [date, setDate] = useState();
  const [year, setYear] = useState();

  const date1 = []
  const newDate = []
  //vehicleTypesch2
  //locationsch2

  async function AlltrainerClient() {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/getAllTrainerData", { token: token, trainerId: 1 })
      const resultData = response.data.data.data
      const dataArray = Object.values(resultData).map(value => ({ ...value }));
      const sortedData = [...dataArray].sort((a, b) => {
        const dateA = new Date(a.datesch);
        const dateB = new Date(b.datesch);
        return dateA - dateB;
      });

      setTrainerData(sortedData)
    } catch (error) {
      console.log("Error---:", error)
    }
  }

  useEffect(() => {
    AlltrainerClient()
  }, [])

  async function getAlltrainerClient(e) {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/getAllTrainerData", { token: token, trainerId: e })
      const resultData = response.data.data.data
      const dataArray = Object.values(resultData).map(value => ({ ...value }));
      // setTrainerDate(dataArray)
      const sortedData = [...dataArray].sort((a, b) => {
        const dateA = new Date(a.datesch);
        const dateB = new Date(b.datesch);
        return dateA - dateB;
      });

      setTrainerData(sortedData)
    } catch (error) {
      console.log("Error---:", error)
    }
  }



  async function getAllTrainer() {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/getAllTrainer", { token })
      setTrainer(response.data.data.data)
    } catch (error) {
      console.log("Error:", error)
    }
  }

  async function vehicalBooking() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/vehicalstype", { token });
      setVehicleType(response.data.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function bookingLocation() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/location", { token: token });
      setBookLocation(response.data.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function getDate() {

    trainerData?.map((item) => {
      date1.push(item?.dateSch)
    })
    for (let i = 0; i < date1.length; i++) {
      if (newDate.indexOf(date1[i]) === -1) {
        newDate.push(date1[i]);
      }
    }
  }

  useEffect(() => {
    getDate()
  }, [trainerData])

  useEffect(() => {
    setDataState(newDate)
  }, [trainerData])


  useEffect(() => {
    getAllTrainer()
    vehicalBooking()
    bookingLocation()
    // getAlltrainerClient()
    setYear(new Date().toDateString()?.substring(4));
  }, [])

  async function modalShowFn(item) {
    trainerData.filter((item2) => {
      const data1 = item2.trainerId
      trainer.map((item3) => {
        if (item3.id == data1) {
          setTrainerId(item3.id)
          setTrainerName(item3.trainerName)
        }
      })
    })
    setDate(item);
    setShow(true);
  }
  
  return (
    <>
      <Navbar />
      {/* section-traner-tab */}
      <section className="trainers">
        <div className="head-trainers">
          <h2>Trainers</h2>
        </div>
        <div className="trainers-tabs">
          <div className="d-flex align-items-start">
            <div
              className="nav flex-column nav-pills me-3 trainers-flex"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              {trainer?.map((item) => {
                return (
                  <>

                    {item.id == 1 ? (
                      <button
                        className="nav-link show active"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                        onClick={(e) => getAlltrainerClient(item.id)}
                      >
                        {item?.trainerName}
                      </button>) : (
                      <button
                        className="nav-link "
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                        onClick={(e) => getAlltrainerClient(item.id)}
                      >
                        {item?.trainerName}
                      </button>
                    )
                    }
                  </>
                )
              })}

            </div>

            <div className="tabs-head">
              {dataState?.map((item) => {
                {/* const dateStr = (item?.datesc); */ }
                const dateObj = new Date(item);
                dateObj.setTime(dateObj.getTime());
                const formattedDate = format(dateObj, "MMM dd yyyy");
                <div>hello</div>
                return (
                  <>
                    <div className="tab-content" id="v-pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="v-pills-home"
                        role="tabpanel"
                        aria-labelledby="v-pills-home-tab"
                        tabIndex={0}
                      >
                        <div className="trainers-box">
                          <div className="trainerinnerpart-tabs" id="trainercommon-cls">
                            <div className="trainerthree-part">
                              <div className="trainersame-one-part" id="trainersame-one-part">
                                <div className="trainerhead-one">
                                  <h3>{formattedDate}</h3>
                                </div>
                                {timeSchedule?.map((item2) => {
                                  const matchingData = trainerData?.filter(
                                    (item3) =>

                                      item === item3?.dateSch &&
                                      item2?.time?.split(" ")[0] ===
                                      item3?.timeSlot?.slice(0, -3)
                                  );

                                  if (matchingData.length === 0) {

                                    return (<>
                                      <div className="trainer-timings">
                                        <span>{item2?.time}</span>
                                        <div className="trainer-opicty">
                                          <Link
                                            href={"#"}
                                            className="trainerhover-btns"
                                            data-bs-target="#exampleModalToggle3"
                                            data-bs-toggle="modal"
                                            // value={item.time}
                                            onClick={(e) =>
                                              modalShowFn(item2.time)
                                            }
                                          >
                                            Add Schedule
                                          </Link>
                                        </div>
                                      </div>
                                    </>)
                                  }

                                  return (
                                    <>

                                      {trainerData?.map((item5) => {

                                        if (
                                          item5?.dateSch == item &&
                                          item2?.time?.split(" ")[0] ==
                                          item5?.timeSlot?.slice(0, -3)
                                        ) {

                                          return (
                                            <>

                                              <div className="trainerhead-one-main">
                                                <div className="trainerhead-one-one">
                                          {item5?.scheduleId !=3 ? 
                                                  <h5> {new Date(`01/01/2000 ${item5?.startTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                                    - {new Date(`01/01/2000 ${item5?.endTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h5>
                                                : null  }
                                                </div>
                                                <div className="trainerhead-one-one">

                                                  {item5.scheduleId == 3 ? (
                                                    <div className="training-div">
                                                      <h5 className="head-one-four">
                                                        {" "}
                                                        Test
                                                      </h5>
                                                    </div>
                                                  ) : null}
                                                  {item5.scheduleId == 2 ? (
                                                    <div className="training-div">
                                                      <h5 className="t-test">
                                                        Training & Test
                                                      </h5>
                                                    </div>
                                                  ) : null}
                                                  {item5.scheduleId == 1 ? (
                                                    <div className="training-div">
                                                      <h5 className="head-one-three">
                                                        Training
                                                      </h5>
                                                    </div>
                                                  ) : null}

                                                </div>
                                              </div>

                                              <div className="trainertwo-part-head">
                                                {vehicleType?.map((item3) => {
                                                  if (item5?.vehicleTypeId == item3?.id) {
                                                    return (
                                                      <>
                                                        <h6>{item3?.vehicleType}</h6>
                                                      </>
                                                    )
                                                  }
                                                })}
                                                  {item5?.scheduleId !=1 ?
                                                <strong>Test at {new Date(`01/01/2000 ${item5?.testTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</strong>
                                                 :null }
                                               
                                               
                                                <small>Location</small>
                                                {bookLocation?.map((item4) => {
                                                  if (item5?.locationId == item4?.id) {
                                                    return (
                                                      <>

                                                        <span>{item4?.place}</span>
                                                      </>
                                                    )
                                                  }
                                                })}

                                                <small>Client</small>
                                                <span> {item5?.clientName}({item5?.clientMobileNo})</span>
                                              </div>
                                            </>
                                          )
                                        }

                                        else if (item5?.isData == false) {

                                          return (
                                            <>

                                              <div className="trainer-timings">
                                                <span>{item2?.time}</span>
                                                <div className="trainer-opcity">
                                                  <Link
                                                    href=""
                                                    className="trainerhover-btns"
                                                    data-bs-target="#exampleModalToggle3"
                                                    data-bs-toggle="modal"
                                                    value={item.time}
                                                    onClick={(e) =>
                                                      modalShowFn(

                                                        item2.time
                                                      )
                                                    }
                                                  >
                                                    Add Schedule
                                                  </Link>
                                                </div>
                                              </div>
                                            </>
                                          );
                                        }

                                      })
                                      }
                                    </>
                                  )


                                })}

                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-profile"
                        role="tabpanel"
                        aria-labelledby="v-pills-profile-tab"
                        tabIndex={0}
                      >
                        ...
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-messages"
                        role="tabpanel"
                        aria-labelledby="v-pills-messages-tab"
                        tabIndex={0}
                      >
                        ...
                      </div>

                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <AddScheduleModal
        show={show}
        setShow={setShow}
        date={date}
        trainerName={trainerName}
        trainerId={trainerId}
        year={year}
      />
    </>



  )

}
export default Trainers;