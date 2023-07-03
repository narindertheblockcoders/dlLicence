import React from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from 'react';
import moment, * as moments from 'moment';
import { DatePicker } from 'rsuite';
import { format } from 'date-fns';
import { swapModalSchema } from './Utils/Schema'
import $ from "jquery"


const SwapModal = ({ show, setShow, swapDataId, schedualDataFn }) => {
  console.log(swapDataId,"swapDataId");
  const [booklocation, setBookLocation] = useState()
  const [vehicleType, setVehicleType] = useState()
  const [loading, setLoading] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [swapDataById, setSwapDataById] = useState(null)
  const [clientName, setClientName] = useState(null)
  const [clientMobileNo, setClietMobileNo] = useState(null)
  const [bookingRefNo, setBookingRefNo] = useState(null)
  const [locationId, setLocationId] = useState(null)
  const [vehicleTypeId, setVehicleTypeId] = useState(null)
  const [dateInputs, setDateInputs] = useState(null)
  const [dateValue,setDateValue] = useState(null)
  const [datee, setDatee] = useState()
  const [updatedDate,setUpdatedDate] =useState()
  // errors
  const [clientNameErr, setClientNameErr] = useState()
  const [clientMobileNoErr, setClietMobileNoErr] = useState()
  const [bookingRefNoErr, setBookingRefNoErr] = useState()
  const [locationIdErr, setLocationIdErr] = useState()
  const [vehicleTypeIdErr, setVehicleTypeIdErr] = useState()
  const [dateInputsErr, setDateInputsErr] = useState()
const [added, setAdded] = useState(0)



  async function ModalSubmitFn() {
    setClientNameErr(false)
    if (!clientName) {
      setClientNameErr(true)
    }
    setClietMobileNoErr(false)
    if (!clientMobileNo) {
      setClietMobileNoErr(true)
    }
    setBookingRefNoErr(false)
    if (!bookingRefNo) {
      setBookingRefNoErr(true)
    }
    setLocationIdErr(false)
    if (!locationId) {
      setLocationIdErr(true)
    }
    setVehicleTypeIdErr(false)
    if (!vehicleTypeId) {
      setVehicleTypeIdErr(true)
    }
    // setDateInputsErr(false)
    // if (!dateInputs) {
    //   setDateInputsErr(true)
    // }

    const newData = {
      clientName: clientName,
      clientMobileNo: clientMobileNo,
      bookingRefNo: bookingRefNo,
      locationId: locationId,
      vehicleTypeId: vehicleTypeId,
      dateOfBooking: dateInputs || dateValue,
      clientId: swapDataId
    }

    if (!clientNameErr && !clientMobileNoErr && !bookingRefNoErr && !locationIdErr && !vehicleTypeIdErr && !dateInputsErr) {
      getSwapData(newData)
    }

  }
  async function clientNameErrFn() {
    setClientNameErr(false)
  }
  async function clientMobileNoErrFn() {
    setClietMobileNoErr(false)
  }
  async function bookingRefNoErrErrFn() {
    setBookingRefNoErr(false)
  }
  async function locationIdErrFn() {
    setLocationIdErr(false)
  }
  async function vehicleTypeIdErrFn() {
    setVehicleTypeIdErr(false)
  }
  // async function dateInputErrFn() {
  //   setDateInputsErr(false)
  // }


  console.log("object swapDataId-->", swapDataId);
  async function bookingLocation() {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/location", { token: token })
      setBookLocation(response.data.data.data)
    } catch (error) {
      console.log("Error:", error);
    }
  }
  async function vehicalBooking() {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/vehicalstype", { token })
      setVehicleType(response.data.data.data)
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const getSwapData = async (newData) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post("/api/swapBooking", { token: token, data: newData })
      console.log("object response is here in swap modal-->", response);
      setLoading(false)
      toast.success("Swap successfully")
      // resetForm();
      // setDateInputs(null)
      setShow(false)
      schedualDataFn()
    } catch (error) {
      console.log("Error:::-->", error)
      setShow(false)
      toast.error(" Please try again")
    }
  }
  const handleChangedofBooking = (e) => {
    const options = {
      second: '2-digit',
      minute: '2-digit',
      hour: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
    const date = new Intl.DateTimeFormat('en-US', options).format(e) // '12/02/2021'
    setDateInputs(date)
    const newww = date

      const dateObj2 = new Date(newww);
    const options2 = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate2 = dateObj2.toLocaleDateString('en-GB', options2);
    setUpdatedDate(formattedDate2)
  }

  const getSwapDataById = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.post("/api/getSwapbookingById", { token: token, bookingId: swapDataId })
        console.log( response.data.data.data.dateOfBooking,"Booking Date");
        setSwapDataById(response.data.data.data)
        setClientName(response?.data?.data?.data?.clientName || null)
        setClietMobileNo(response?.data?.data?.data?.clientMobileNo || null)
        setBookingRefNo(response?.data?.data?.data?.bookingRefNo || null)
        setLocationId(response?.data?.data?.data?.locationId || null)
        setVehicleTypeId(response?.data?.data?.data?.vehicleTypeId || null)
        setDateInputs(response?.data?.data?.data?.dateInputs || null) 
        setDateValue(response?.data?.data?.data?.dateOfBooking || null)
        
        
        const defaultDate = new Date(response?.data?.data?.data?.dateOfBooking);
        const formattedDate = defaultDate.toISOString().slice(0, 19).replace('T', ' ');
        setDateValue(formattedDate)
     

    } catch (error) {
      console.log("Error:::-->", error)
    }
  }
  useEffect(() => {
    bookingLocation()
    vehicalBooking()
    getSwapDataById()
  }, [swapDataId])

  useEffect(()=>{
    const dateObj = new Date(dateValue);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate1 = dateObj.toLocaleDateString('en-GB', options);
  setDatee(formattedDate1)
  },[dateValue])

  // const validateTime = (time) => {
  //   // Add your validation logic here
  //   // You can check if the time is valid or perform any other validation operations
  //   // For example, you could check if the time is within a specific range
  //   if (time >= '00:00' && time <= '23:59') {
  //     console.log('Time is valid.');
  //   } else {
  //     console.log('Invalid time.');
  //   }
  // };
//   useEffect(()=>{
//     $(".hh").blur(function () {
//       if ($(this).val() >= 24)
//           $(this).val($(this).val() % 24);

//       if ($(this).val() == "")
//           $(this).val("");
//       else
//           if ($(this).val() < 10)
//               $(this).val("0" + parseInt($(this).val()));
// // validateTime(x);
//   });
//   $(".mm").blur(function () {
//       if ($(this).val() >= 60)
//           $(this).val($(this).val() % 60);

//       if ($(this).val() == "")
//           $(this).val("");
//       else
//           if ($(this).val() < 10)
//               $(this).val("0" + parseInt($(this).val()));

//       var x = $(this).parent().attr("class").split(" ")[1];
//       // validateTime(x);
//   });

//   $(".hh").on("input", function () {
//       $(this).parent().removeClass("invalid").removeClass("valid");
//       if ($(this).val().length == 2)
//           $(this).siblings(".mm").focus().select();
//   });
//   $(".mm").on("input", function () {
//       $(this).parent().removeClass("invalid").removeClass("valid");
//       if ($(this).val().length == 2)
//           $(this).blur();
//   });
// $(".hh").on("focus", function () {
//       $(this).parent().removeClass("invalid").removeClass("valid");
//   });
// $(".mm").on("focus", function () {
//       $(this).parent().removeClass("invalid").removeClass("valid");
//   });
//   },[])

 
  return (
    <div>
      <ToastContainer />
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className='swap-modal-head custom-modell'
        id="swap-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Swap Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <h4>Current Booking Date</h4>
          <span className='dateText'>{updatedDate ? updatedDate : datee}</span>

          {/* <div> */}
          <div className="input-main">

            <div className="sclient-box">
              <div className='sclient-div'>
                <input type="text"
                  className="form-control"
                  id="book-input"
                  placeholder="Client Name" name="clientName"
                  onClick={clientNameErrFn}
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}

                />
                {clientNameErr && (
                  <p className="input-error">Client name is required</p>
                )}
              </div>

              <div className='sclient-div'>
                <input type="text"
                  className="form-control"
                  id="book-input"
                  maxLength="10"
                  placeholder="Client Phone" name="clientMobileNo"
                  onClick={clientMobileNoErrFn}
                  value={clientMobileNo}
                  onChange={(e) => setClietMobileNo(e.target.value)}

                />
                {clientMobileNoErr && (
                  <p className="input-error">Mobile number is required</p>
                )}
              </div>

            </div>


            <div className="sclient-box">
              <div className='sclient-div'>
                <input type="text"
                  className="form-control input-group"
                  id="book-input"
                  placeholder="Booking Ref.no." name="bookingRefNo"
                  onClick={bookingRefNoErrErrFn}
                  value={bookingRefNo}
                  onChange={(e) => setBookingRefNo(e.target.value)}

                />
                {bookingRefNoErr && (
                  <p className="input-error">Booking refrence number is required</p>
                )}
              </div>

              <div className='sclient-div'>
                <select className="form-select" id="book-select" name="locationId"
                  onClick={locationIdErrFn}
                  onChange={(e) => setLocationId(e.target.value)}

                >
                  <option value="">Select Location</option>
                  {booklocation?.map((item, idx) => {
                    return (
                      <option value={item.id} selected={item.id == locationId}>{item.place}</option>
                    )
                  })}
                </select>
                {locationIdErr && (
                  <p className="input-error">Location is required</p>
                )}

              </div>
            </div>

            <div className="sclient-box">
              <div className='sclient-div'>
                <select className="form-select" id="book-select" name="vehicleTypeId"
                  onClick={vehicleTypeIdErrFn}
                  onChange={(e) => setVehicleTypeId(e.target.value)}
                >
                  <option value="">Select Vehicle Type</option>
                  {vehicleType?.map((item, idx) => {
                    return (
                      <option value={item.id} selected={item.id == vehicleTypeId}>{item.vehicleType}</option>
                    )
                  })}
                </select>
                {vehicleTypeIdErr && (
                  <p className="input-error">Vehicle type is required</p>
                )}

              </div>

              <div className='sclient-div' h={dateValue}>
                <DatePicker
                  className='datePicker'
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder={dateValue}
                  style={{ width: 260 }}
                  locale={{
                    sunday: 'Su',
                    monday: 'Mo',
                    tuesday: 'Tu',
                    wednesday: 'We',
                    thursday: 'Th',
                    friday: 'Fr',
                    saturday: 'Sa',
                    ok: 'OK',
                    today: 'Today',
                    yesterday: 'Yesterday',
                    hours: 'Hours',
                    minutes: 'Minutes',
                    seconds: 'Seconds'
                  }}
                  // selected={dateValue}
                  // value={dateValue}
                  // onClick={dateInputErrFn}
                  onChange={(e) => handleChangedofBooking(e)}
                />
              
                {dateInputsErr && (
                  <p className="input-error">Booking  date required</p>
                )}

              </div>

            </div>
            <Button type='submit' className='mt-2' disabled={loading}
              onClick={ModalSubmitFn}
            >
              {loading ? "Loading" : "Swap"}
            </Button>
          </div>

        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SwapModal



