import React, { useState, useEffect } from "react";
import Navbar from "./ui/Navbar";
import axios from "axios";
import { format } from 'date-fns';


function Traningtest() {

  const timeSchedule = [
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
  ];

  // const [trainerDate, setTrainerDate] = useState([])
  const [trainer, setTrainer] = useState()
  const [trainerData, setTrainerData] = useState([])
  const [bookLocation, setBookLocation] = useState()
  const [vehicleType, setVehicleType] = useState()


//vehicleTypesch2
//locationsch2

async function AlltrainerClient() {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.post("/api/getAllTrainerData", { token: token, trainerId: 1 })
    const resultData = response.data.data.data
    const dataArray = Object.values(resultData).map(value => ({ ...value }));
    // console.log(" data data array ", dataArray.datesch)
    // setTrainerDate(dataArray)

    setTrainerData(dataArray)
  } catch (error) {
    console.log("Error---:", error)
  }
}

useEffect(()=>{
  AlltrainerClient()
},{})


  async function getAlltrainerClient(e) {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/getAllTrainerData", { token: token, trainerId: e })
      const resultData = response.data.data.data
      console.log(resultData,"result data")
      const dataArray = Object.values(resultData).map(value => ({ ...value }));
      console.log(" data data array ", dataArray)
      // setTrainerDate(dataArray)

      setTrainerData(dataArray)
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

  useEffect(() => {
    getAllTrainer()
    vehicalBooking()
    bookingLocation()
    getAlltrainerClient()
  }, [])

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
                {/* console.log(item.id," map id ") */}
                 return (
                   <>

                  {item.id == 1?(
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
                   </button>):(
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

                {trainerData?.map((item)=>{
                  {/* const date = new Date(item?.datesch); */}

                  const dateStr = (item?.datesch);
                const dateObj = new Date(dateStr);
                dateObj.setTime(dateObj.getTime());
                const formattedDate = format(dateObj, "MMM dd yyyy");
                  return(
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
                        {trainerData.map((item2)=>{
                          if(item2.datesch == item.datesch){
                            console.log("hello from  trainer Data-->",item2.datesch,item.datesch)
                            return(
                            <>
                            <div className="trainerhead-one-main">
                          <div className="trainerhead-one-one">
                         
                            <h5> {new Date(`01/01/2000 ${item2.startTime}`).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}
                             - {new Date(`01/01/2000 ${item2.endTime}`).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}</h5>
                          </div>
                          <div className="trainerhead-one-one">
                            <a href="#" className="trainerhead-one-two">
                              Training &amp; Testing
                            </a>
                          </div>
                        </div>
                        <div className="trainertwo-part-head">
                        {vehicleType?.map((item3)=>{
                          if(item2.vehicleTypesch == item3.id){
                            return(
                              <>
                              <h6>{item3.vehicle}</h6>
                              </>
                            )
                          }
                        })}
                         
                        <strong>Test at {new Date(`01/01/2000 ${item2.testtime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</strong>
                          <small>Location</small>
                          {bookLocation?.map((item4)=>{
                          if(item2.locationsch == item4.id){
                            return(
                              <>
                            
                              <span>{item4.place}</span>
                              </>
                            )
                          }
                        })}
                          
                          <small>Client</small>
                          <span> {item2.clientName}({item2.mobilesch})</span>
                        </div>
                            </>
                          )
                          }
                         
                        })}
                       
                        {/* copy */}
                        {/* <div className="trainerhead-one-main">
                          <div className="trainerhead-one-one">
                            <h5>9:30 AM</h5>
                          </div>
                          <div className="trainerhead-one-one">
                            <a href="#" className="trainerhead-one-two">
                              Training &amp; Testing
                            </a>
                          </div>
                        </div>
                        <div className="trainertwo-part-head">
                          <h6>HR Auto training</h6>
                          <strong>Test at 9:30</strong>
                          <small>Location</small>
                          <span> Logan</span>
                          <small>Client</small>
                          <span> Anthony (0435906388)</span>
                        </div> */}
                        <div className="trainer-timings">
                          <span>12 : 30 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
                        <div className="trainer-timings">
                          <span>01 : 00 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
                        <div className="trainer-timings">
                          <span>01 : 30 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
                        {/* copy */}
                        {/* <div className="trainerhead-one-main">
                          <div className="trainerhead-one-one">
                            <h5>09:30 AM - 12:30 PM</h5>
                          </div>
                          <div className="trainerhead-one-one">
                            <a href="#" className="trainerhead-one-two">
                              Training &amp; Testing
                            </a>
                          </div>
                        </div> */}
                        {/* <div className="trainertwo-part-head">
                          <h6>HR Auto training</h6>
                          <strong>Test at 9:30</strong>
                          <small>Location</small>
                          <span> Logan</span>
                          <small>Client</small>
                          <span> Anthony (0435906388)</span>
                        </div> */}
                        <div className="trainer-timings">
                          <span>03 : 30 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
                        <div className="trainer-timings">
                          <span>04 : 00 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
                        <div className="trainer-timings">
                          <span>04 : 30 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
                        <div className="trainer-timings">
                          <span>05 : 00 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
                        <div className="trainer-timings">
                          <span>05 : 30 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
                        <div className="trainer-timings">
                          <span>06 : 00 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
                        <div className="trainer-timings">
                          <span>06 : 30 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
                        <div className="trainer-timings">
                          <span>07 : 00 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
                        <div className="trainer-timings">
                          <span>07 : 30 PM</span>
                          <div className="trainer-opicty">
                            <a
                              href=""
                              className="trainerhover-btns"
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                            >
                              Add Schedule
                            </a>
                          </div>
                        </div>
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
      {/* <section className="footer">
        <div className="container">
          <p>© 2023 Driving Schedule Software. All Rights Reserved.</p>
        </div>
      </section> */}
    </>



  )

}
export default Traningtest;