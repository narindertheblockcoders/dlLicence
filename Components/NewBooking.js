import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import Navbar from "./ui/Navbar";
import { DatePicker } from "rsuite";

function NewBooking() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [disbale, setDisable] = useState();
  const [booklocation, setBookLocation] = useState();
  const [vehicleType, setVehicleType] = useState();
  const [paymentResult, setPaymentResult] = useState("");
  const [allClient, setAllClient] = useState();
  const [clientId, setClientId] = useState();
  const [bookingRefNo, setBookingRefNo] = useState();
  const [licenseNo, setLicenseNo] = useState();
  const [clientName, setClientName] = useState();
  const [clientMobileNo, setClientMobileNo] = useState();
  const [locationId, setLocationId] = useState();
  const [vehicleTypeId, setVehicleTypeId] = useState();
  const [isDummyBooking, setIsDummyBooking] = useState(false);
  const [totalAmount, setTotalAmount] = useState();
  const [paidAmount, setPaidAmount] = useState();
  const [dateofBooking, setDateofBooking] = useState();
  const [dateofPayment, setDateofPayment] = useState();
  const [paymentBalance, setPaymentBalance] = useState();
  //error msg
  const [bookingRefNoErr, setBookingRefNoErr] = useState(false);
  const [licenseNoErr, setLicenseNoErr] = useState(false);
  const [clientNameErr, setClientNameErr] = useState(false);
  const [clientMobileNoErr, setClientMobileNoErr] = useState(false);
  const [locationIdErr, setLocationIdErr] = useState(false);
  const [vehicleTypeIdErr, setVehicleTypeIdErr] = useState(false);
  const [totalAmountErr, setTotalAmountErr] = useState(false);
  const [paidAmountErr, setPaidAmountErr] = useState(false);
  const [dateofBookingErr, setDateofBookingErr] = useState(false);
  const [dateofPaymentErr, setDateofPaymentErr] = useState(false);
  const [paymentBalErr, setPaymentBalErr] = useState(false);

  const handleChangeDate = (e) => {
    const options = {
      second: "2-digit",
      minute: "2-digit",
      hour: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const date = new Intl.DateTimeFormat("en-US", options).format(e); // '12/02/2021'
    setDateofBooking(date);
  };

  const handleChangedofPayment = (e) => {
    const options = {
      second: "2-digit",
      minute: "2-digit",
      hour: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const date = new Intl.DateTimeFormat("en-US", options).format(e); // '12/02/2021'
    setDateofPayment(date);
  };

  async function getAllClientFn() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/allClients", { token: token });
      setAllClient(response.data.data.data);
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
  async function vehicalBooking() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/vehicalstype", { token });
      setVehicleType(response.data.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function newBooking(formInputs) {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/newBooking", {
        formInputs,
        token,
      });
      setLoading(false);
      setDisable(false);
      toast.success("data inserted Successfully");
      setTimeout(() => {
        router.push("/bookingList");
      }, [1000]);
    } catch (error) {
      console.log(error);
      toast.error("Please try again");
      setLoading(false);
      setDisable(false);
    }
  }

  useEffect(() => {
    bookingLocation();
    vehicalBooking();
    getAllClientFn();
  }, []);

  async function selectedClient(item) {
    const id = item?.split("-");
    setClientId(id[0]);
    setClientName(id[1]);

    // setClientId(id[0])
  }

  async function getMobileNumber() {
    const mobileNo = allClient?.filter((item) => {
      if (item?.id == clientId) {
        return item?.clientMobileNo;
      }
    });
    if (mobileNo) {
      // setClientMobile(mobileNo[0]?.clientMobileNo)
      setClientMobileNo(mobileNo[0]?.clientMobileNo);
    }

    // setClientMobileNo(clientMobile)
  }

  useEffect(() => {
    getMobileNumber();
  }, [clientId]);

  async function addClientFn() {
    router.push("/addClient");
  }

  useEffect(() => {
    if (Number(totalAmount) - Number(paidAmount) == 0) {
      setPaymentBalance(0);
    } else if (Number(totalAmount) == 0) {
      setPaymentBalance(0);
      setPaidAmount("");
    } else {
      setPaymentBalance(Number(totalAmount) - Number(paidAmount));
    }
  }, [paidAmount, totalAmount]);

  async function formSubmitFn() {
    setBookingRefNoErr(false);
    setLicenseNoErr(false);
    setClientNameErr(false);
    setClientMobileNoErr(false);
    setLocationIdErr(false);
    setVehicleTypeIdErr(false);
    setTotalAmountErr(false);
    setPaidAmountErr(false);
    setDateofBookingErr(false);
    setDateofPaymentErr(false);
    setPaymentBalErr(false);

    if (
      !bookingRefNo &&
      !licenseNo &&
      !clientName &&
      !clientMobileNo &&
      !locationId &&
      !vehicleTypeId &&
      !totalAmount &&
      !paidAmount &&
      !dateofBooking &&
      !dateofPayment &&
      !paymentBalance
    ) {
      setBookingRefNoErr(true);
      setLicenseNoErr(true);
      setClientNameErr(true);
      setClientMobileNoErr(true);
      setLocationIdErr(true);
      setVehicleTypeIdErr(true);
      setTotalAmountErr(true);
      setPaidAmountErr(true);
      setDateofBookingErr(true);
      setDateofPaymentErr(true);
      setPaymentBalErr(true);
      return;
    } else {
      setBookingRefNoErr(false);
      if (!bookingRefNo) {
        setBookingRefNoErr(true);
        return;
      }
      setLicenseNoErr(false);
      if (!licenseNo) {
        setLicenseNoErr(true);
        return;
      }
      setClientNameErr(false);
      if (!clientName) {
        setClientNameErr(true);
        return;
      }

      setClientMobileNoErr(false);
      if (!clientMobileNo) {
        setClientMobileNoErr(true);
        return;
      }

      setLocationIdErr(false);
      if (!locationId) {
        setLocationIdErr(true);
        return;
      }

      setVehicleTypeIdErr(false);
      if (!vehicleTypeId) {
        setVehicleTypeIdErr(true);
        return;
      }

      setTotalAmountErr(false);
      if (!totalAmount) {
        setTotalAmountErr(true);
        return;
      }
      setPaidAmountErr(false);
      if (!paidAmount) {
        setPaidAmountErr(true);
        return;
      }
      setDateofBookingErr(false);
      if (!dateofBooking) {
        setDateofBookingErr(true);
        return;
      }
      setDateofPaymentErr(false);
      if (!dateofPayment) {
        setDateofPaymentErr(true);
        return;
      }
      setPaymentBalErr(false);
      if (!paymentBalance) {
        setPaymentBalErr(true);
        return;
      }
    }

    const data = {
      clientId: clientId,
      bookingRefNo: bookingRefNo,
      licenseNo: licenseNo,
      locationId: locationId,
      vehicleTypeId: vehicleTypeId,
      clientName: clientName,
      clientMobileNo: clientMobileNo,
      dateOfBooking: dateofBooking,
      dateOfPayment: dateofPayment,
      totalAmount: totalAmount,
      paidAmount: paidAmount,
      paymentBalance: paymentBalance,
      isDummyBooking: isDummyBooking,
    };

    if (
      !bookingRefNoErr &&
      !licenseNoErr &&
      !clientNameErr &&
      !clientMobileNoErr &&
      !locationIdErr &&
      !vehicleTypeIdErr &&
      !dateofBookingErr &&
      !dateofPaymentErr &&
      !totalAmountErr &&
      !paidAmountErr &&
      !paymentBalErr
    ) {
      // setLoading(true)
      // setDisable(true)
      newBooking(data);
    }
  }
  async function bookingRefNoFn() {
    setBookingRefNoErr(false);
  }
  async function licenseFn() {
    setLicenseNoErr(false);
  }
  async function clientNameErrFn() {
    setClientNameErr(false);
  }
  async function clientMobileErrFn() {
    setClientMobileNoErr(false);
  }
  async function clientLocationErrFn() {
    setLocationIdErr(false);
  }
  async function vehicleTypeErrFn() {
    setVehicleTypeIdErr(false);
  }

  async function totalAmountErrFn() {
    setTotalAmountErr(false);
  }
  async function paidAmountErrFn() {
    setPaidAmountErr(false);
  }
  async function DobErrFn() {
    setDateofBookingErr(false);
  }
  async function DopErrFn() {
    setDateofPaymentErr(false);
  }
  async function paymentBalErrFn() {
    setPaymentBalErr(false);
  }
  return (
    <>
      <ToastContainer />
      <Navbar />
      <section className="booking">
        <div className="container">
          <div className="booking-head">
            <h2>Add New booking</h2>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="isDummyBooking"
              value={isDummyBooking}
              onChange={(e) => setIsDummyBooking(e.target.checked)}
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Dummy Booking
            </label>
          </div>

          <div className="booking-content">
            <div className="mb-3 booking-row">
              <input
                type="text"
                className="form-control"
                id="book-input"
                onClick={bookingRefNoFn}
                name="bookingRefNo"
                value={bookingRefNo}
                onChange={(e) => setBookingRefNo(e.target.value)}
                placeholder="Booking Ref No."
                maxLength={10}
              />
              {bookingRefNoErr && (
                <span className="input-error">
                  Booking refrence number is required
                </span>
              )}
            </div>
            <div className="mb-3 booking-row">
              <input
                type="text"
                className="form-control"
                id="book-input"
                onClick={licenseFn}
                name="licenseNo"
                value={licenseNo}
                onChange={(e) => setLicenseNo(e.target.value)}
                placeholder="License No."
              />
              {licenseNoErr && (
                <span className="input-error">License number is required</span>
              )}
            </div>
            <div className="mb-3 booking-row">
              <select
                className="form-select"
                id="book-select"
                name="locationId"
                onClick={clientLocationErrFn}
                onChange={(e) => setLocationId(e.target.value)}
              >
                <option value="">Select Location</option>
                {booklocation?.map((item) => {
                  return <option value={item.id}>{item.place}</option>;
                })}
              </select>
              {locationIdErr && (
                <span className="input-error">Location is required</span>
              )}
            </div>
            <div className="mb-3 booking-row">
              <select
                className="form-select"
                id="book-select"
                name="vehicleTypeId"
                onChange={(e) => setVehicleTypeId(e.target.value)}
                onClick={vehicleTypeErrFn}
              >
                <option value="">Select Vehicle Type</option>
                {vehicleType?.map((item) => {
                  return <option value={item.id}>{item.vehicleType}</option>;
                })}
              </select>
              {vehicleTypeIdErr && (
                <span className="input-error">Vehicle type is required</span>
              )}
            </div>

            {/* <div className="mb-3 booking-row">
              <label for="booking-input">Choose Name:</label>
              <input list="New-booking" id="booking-input" name="booking-input"></input>
              <datalist id="New-booking">
                <option value="person1"></option>
                <option value="person2"></option>
                {allClient?.map((item) => {
                  return (
                    <option value={`${item?.id}-${item?.clientName}`}>
                      {item.clientName}
                    </option>
                  );
                })}
              </datalist>
            </div> */}
            <div className="mb-3 booking-row" id="add-name-div">
              <select
                className="form-select select-clientname"
                id="book-select"
                name="clientId"
                onChange={(e) => selectedClient(e.target.value)}
                onClick={clientNameErrFn}
              >
                <option value="">Select Client Name</option>
                {allClient?.map((item) => {
                  return (
                    <option value={`${item?.id}-${item?.clientName}`}>
                      {item.clientName}
                    </option>
                  );
                })}
              </select>
              <button type="button" className="add-name-btn" onClick={addClientFn}>
                {" "}
                +
                {/* <i class="bi bi-plus-square" onClick={addClientFn} /> */}
              </button>
              {clientNameErr && (
                <span className="input-error">Client name is required</span>
              )}

              {/* </i> */}
            </div>

            <div className="mb-3 booking-row">
              <input
                type="number"
                maxLength={10}
                className="form-control"
                id="book-input"
                onClick={clientMobileErrFn}
                name="clientMobileNo"
                defaultValue={clientMobileNo}
                placeholder="Mobile"
              />
              {clientMobileNoErr && (
                <span className="input-error">Mobile number is required</span>
              )}
            </div>
            <div className="mb-3 booking-row">
              <div className="field only-date">
                <DatePicker
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="Date of booking"
                  style={{ width: 260 }}
                  locale={{
                    sunday: "Su",
                    monday: "Mo",
                    tuesday: "Tu",
                    wednesday: "We",
                    thursday: "Th",
                    friday: "Fr",
                    saturday: "Sa",
                    ok: "OK",
                    today: "Today",
                    yesterday: "Yesterday",
                    hours: "Hours",
                    minutes: "Minutes",
                    seconds: "Seconds",
                  }}
                  name="dateOfBooking"
                  onChange={(e) => handleChangeDate(e)}
                  onClick={DobErrFn}
                />
                {dateofBookingErr && (
                  <span className="input-error">
                    Date of booking is required
                  </span>
                )}
              </div>
            </div>
            <div className="mb-3 booking-row">
              <div className="field only-date">
                <DatePicker
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="Date of payment"
                  style={{ width: 260 }}
                  locale={{
                    sunday: "Su",
                    monday: "Mo",
                    tuesday: "Tu",
                    wednesday: "We",
                    thursday: "Th",
                    friday: "Fr",
                    saturday: "Sa",
                    ok: "OK",
                    today: "Today",
                    yesterday: "Yesterday",
                    hours: "Hours",
                    minutes: "Minutes",
                    seconds: "Seconds",
                  }}
                  name="dateOfPayment"
                  onChange={(e) => handleChangedofPayment(e)}
                  onClick={DopErrFn}
                />
                {dateofPaymentErr && (
                  <span className="input-error">
                    Date of payment is required
                  </span>
                )}
              </div>
            </div>
            <div className="mb-3 booking-row">
              <input
                type="number"
                className="form-control"
                id="book-input"
                name="totalAmount"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                min="0"
                onClick={totalAmountErrFn}
                placeholder="Total Amount"
              />
              {totalAmountErr && (
                <span className="input-error">Total amount is required</span>
              )}
            </div>
            <div className="mb-3 booking-row">
              <input
                type="number"
                className="form-control"
                id="book-input"
                name="paidAmount"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                min="0"
                onClick={paidAmountErrFn}
                placeholder="Paid Amount"
              />
              {paidAmountErr && (
                <span className="input-error">Paid amount is required</span>
              )}
            </div>
            <div className="mb-3 booking-row">
              <input
                type="number"
                className="form-control"
                id="book-input"
                name="paymentBalance"
                min="0"
                defaultValue={paymentBalance}
                placeholder="Payment Balance"
                readonly="true"
                onClick={paymentBalErrFn}
              />
              {paymentBalErr && (
                <span className="input-error">
                  Total paid amount is required
                </span>
              )}
            </div>
          </div>

          <div className="booking-button">
            <Button
              className="btn-book"
              type="submit"
              onClick={() => formSubmitFn()}
              disabled={disbale}
            >
              {loading ? "Loading..." : "Book Now"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewBooking;
