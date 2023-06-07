import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./ui/Navbar";
import ReactPaginate from "react-paginate";
import OwlCarousel from "react-owl-carousel3";
import Head from "next/head";
import AddScheduleModal from "./AddScheduleModal";
import dynamic from "next/dynamic";
import Link from "next/link";
import SwapTrainer from "./SwapTrainer";
import { format } from "date-fns";
import ClientInfoModal from "./ClientInfoModal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";

let timee;
function Schedule() {
  const [scheduleData, setScheduleData] = useState();
  const [dataByScheduleDate, setDataByScheduleDate] = useState();
  const [datePicker, setDatePicker] = useState();
  const [leapYear, setLeapYear] = useState();
  const [added, setAdded] = useState();
  const [yearMonth, setYearMonth] = useState();
  const [date3, setDate3] = useState();
  const [yearList, setYearList] = useState();
  const [lenghtOfMatches, setLenghtOfMatches] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [date, setDate] = useState();
  const [year, setYear] = useState();
  const [showModal, setShowModal] = useState();
  const [allTrainers, setAllTrainers] = useState();
  const [allScheduleData, setAllScheduleData] = useState();
  const [itemTime, setItemTime] = useState();
  const [allLocation, setAllLocation] = useState();
  const [allSchData, setAllSchData] = useState();
  const [id, setId] = useState();
  const [scheduleId, setScheduleId] = useState();
  const [searchSchedualData, setSearchSchedualData] = useState();
  const [completeDate, setcompleteDate] = useState();
  const [trainerName, setTrainerName] = useState();
  const [trainerId, setTrainerId] = useState();
  const [bookVehicle, setBookvehicle] = useState();
  const [timeSchedule1, setTimeSchedule1] = useState();
  const [bookingShowModal, setBookingShowModal] = useState(false);
  const [clientId, setClientId] = useState();
  const [bookingId, setBookingId] = useState();
  const [open, setOpen] = React.useState(false);
  const [dy, setDY] = useState()

  async function getAllTrainer() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/getAllTrainer", { token: token });
      const response = res.data;

      setAllTrainers(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function todayDate() {
    const currentDate = new Date();
    const options = { day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    setSelectedId(formattedDate - 1);

    console.log(formattedDate, "date share"); 
  }

  useEffect(() => {
    todayDate();
  }, []);

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

  async function getAllSchedule() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/getSchedules", { token: token });
      const response = res.data.data.data;
      setOpen(false);
      setAllScheduleData(response);
    } catch (err) {
      console.log(err, "all shedule error");
    }
  }

  const DatePicker = (e) => {
    console.log("hello from Datepicker-->",e.target.value);
    setDate3(null);
    const dateObj = new Date(e.target.value);
    const monthStr = dateObj.toLocaleString("default", { month: "short" });
    const formattedDateStr = `${dateObj.getFullYear()}-${monthStr}`;
    const convertedDate = formattedDateStr.split("-")[1];
    const dateObj1 = new Date(e.target.value);
    const year = dateObj1.getFullYear();
console.log("object year fro ");
    setLeapYear(year);

    const date2 = new Date(e.target.value).toLocaleDateString();
    const d = date2.split("/");
    setYearMonth(`${d[2]}-${d[1]}`);
    dayPicker(convertedDate);
  };

  const currentDatePicker = () => {
    const dateObj = new Date();
    const monthStr = dateObj.toLocaleString("default", { month: "short" });
    const formattedDateStr = `${dateObj.getFullYear()}-${monthStr}`;
    const date2 = new Date().toLocaleDateString();
    const d = date2.split("/");
    const convertedDate = formattedDateStr.split("-")[1];
    setYearMonth(`${d[2]}-${d[1]}`);
    setDate3(`${d[2]}-${d[1]}`);
    dayPicker(convertedDate);
  };

  const dayPicker = (convertedDate) => {
    var temp = [];
    if (
      convertedDate == "Jan" ||
      convertedDate == "Mar" ||
      convertedDate == "May" ||
      convertedDate == "Jul" ||
      convertedDate == "Aug" ||
      convertedDate == "Oct" ||
      convertedDate == "Dec"
    ) {
      for (let i = 1; i <= 31; i++) {
        temp.push(`${i} ${convertedDate}`);
      }
    }

    if (
      convertedDate == "Jun" ||
      convertedDate == "Nov" ||
      convertedDate == "Apr" ||
      convertedDate == "Sep"
    ) {
      for (let i = 1; i <= 30; i++) {
        temp.push(`${i} ${convertedDate}`);
      }
    }

    if (convertedDate == "Feb") {
      if ((leapYear % 4 == 0 && 0 != leapYear % 100) || 0 == leapYear % 400) {
        for (let i = 1; i <= 29; i++) {
          temp.push(`${i} ${convertedDate}`);
        }
      } else {
        for (let i = 1; i <= 28; i++) {
          temp.push(`${i} ${convertedDate}`);
        }
      }
    }
    setDatePicker(temp);
  };

  async function filterData(item, i) {
    console.log("first hello from filter Data-->",item)
    setYear(item)
    setSelectedId(i);
    const filterValue = allScheduleData?.filter((item2) => {
      const dateValue = item2?.dateSch;
      const date = new Date(dateValue);
      const day = date.getUTCDate().toString();
      const month = date.toLocaleString("default", { month: "short" });
      const formattedDate = `${day} ${month}`;
      return formattedDate == item;
    });
    setDataByScheduleDate(filterValue);
  }

  async function getDataByDate() {
    const date1 = new Date();
    console.log("hello date1-->",date1.toString("MMMM yyyy"));
    console.log("hello nnnnn-->")
    const reconstructedDate = new Date(date1.valueOf());
    console.log('test-',reconstructedDate);
    // const formattedDate = date1.toLocaleDateString("en-US", {
    //   day: "2-digit",
    //   month: "short",
    //   year: "numeric"
    // });
    // console.log("object -->",formattedDate);

    
    // const sendDate = date1?.toDateString()
    // console.log(sendDate?.slice(4), "date1")

    // const date_string = sendDate?.slice(4)
    // console.log(date_string, "date_string")
// date_object = datetime.strptime(date_string, "%B %d, %Y")
// formatted_date = date_object.strftime("%d %B %Y")

// print(formatted_date)
    // const currentYear = sendDate?.slice(0,4)
    // console.log(currentYear,"currentYear")
    // const currentDate = sendDate?.slice()



    const day1 = date1.getUTCDate().toString();
    const month1 = date1.toLocaleString("default", { month: "short" });
    const formattedDate1 = `${day1} ${month1}`;

    const filterValue = allScheduleData?.filter((item2) => {
      const dateValue = item2.dateSch;
      const date = new Date(dateValue);
      const day = date.getUTCDate().toString();
      const month = date.toLocaleString("default", { month: "short" });
      const formattedDate = `${day} ${month}`;
      return formattedDate == formattedDate1;
    });
    setDataByScheduleDate(filterValue);
  }

  async function getAllLocation() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/location", { token: token });
      const response = res.data.data.data;
      setAllLocation(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllVehicle() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/vehicalstype", { token: token });
      setBookvehicle(response.data.data.data);
    } catch (error) {
      console.log("error:", error);
    }
  }

  useEffect(() => {
    setOpen(true);
    getAllSchedule();
    getAllTrainer();
    getAllLocation();
    getAllVehicle();
    currentDatePicker();
    // setYear(new Date().toDateString()?.substring(4));
  }, []);

  useEffect(() => {
    getDataByDate();
  }, [leapYear, allScheduleData]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = yearList?.slice(indexOfFirstPost, indexOfLastPost);

  const Pagination = ({ selected }) => {
    setCurrentPage(selected + 1);
    setSearchData(null);
    setUsers(users);
  };

  async function modalShowFn(item, item3) {
    console.log(item, "hello error")
    setDate(item3);
    setTrainerName(item.trainerName);
    setTrainerId(item.id);
    setShow(true);
  }

  function handleModalShowFn(item2) {
    setId(item2?.id);
    setScheduleId(item2?.scheduleId);
    setTrainerId(item2?.trainerId);
    setShowModal(true);
  }

  async function bookingModalShowFn(item2) {
    // setClientId(item2.id)
    setBookingId(item2?.id);
    setBookingShowModal(true);
  }

  const SearchFn = (e) => {
    const search = e.target.value;
    const filterData = dataByScheduleDate?.filter((item) => {
      const name = item?.clientName
        ?.toLowerCase()
        .includes(search?.toLowerCase());
      const mobile = item?.mobilesch
        ?.toLowerCase()
        .includes(search?.toLowerCase());
      return name + mobile;
    });
    setSearchSchedualData(filterData);
  };

  useEffect(() => {
    dataByScheduleDate?.map((item) => {
      timeSchedule?.map((item1) => {
        allTrainers?.map((item2) => {
          const timeSlote1 = item1?.time?.split(" ")[0];
          const timeSlote2 = item?.timeslot?.slice(0, -3);
          const trainerId = item2?.id;

          if (trainerId == item?.trainerId && timeSlote1 == timeSlote2) {
            item.isData = false;
          }
        });
      });
    });

    const filteredData = dataByScheduleDate?.filter(
      (item) => item.isData !== false
    );
    setTimeSchedule1(filteredData);
  }, [dataByScheduleDate]);

  
  


    console.log("first selectedId--->",selectedId)
    console.log("first year--->",year)
    const monthh = year?.toString()
    console.log(monthh,"date and month");
    const yearr = yearMonth?.slice(0,4)?.toString()
    console.log("yearr--->",yearr)
    setTimeout(() => {
      
      setDY(monthh + " " + yearr || newDate().toLocaleDateString())
    }, 3000);






  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/responsive.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
          integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css"
          integrity="sha512-sMXtMNL1zRzolHYKEujM2AqCLUR9F2C4/05cdbxjjLSRvMQIciEPCQZo++nk7go3BtSuK9kfa/s+a4f4i5pLkw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <Navbar />
      {/* booking-tabs*/}
      <section className="booking-tabs" id="schedule-booking">
        <div className="container">
          {/* <div className="head-booking">
            <h2>Schedule</h2>
          </div> */}
          <div className="inner-tabs-head">
            <div className="left-tabss">
              <h6>
                <span>
                  <img src="img/Path - arrow-expand-left.png" alt="" />
                </span>{" "}
                <input
                  type="month"
                  id="start"
                  onChange={(e) => DatePicker(e)}
                  name="start"
                  min="2018-03"
                  value={yearMonth}
                ></input>
                <small>
                  <img src="img/arrow-expand-right.png" alt="" />
                </small>
              </h6>

              {lenghtOfMatches <= 10 || lenghtOfMatches == null ? null : (
                <div className="paginate-sec">
                  <ReactPaginate
                    previousLabel="back"
                    nextLabel="next"
                    onPageChange={Pagination}
                    pageCount={Math.ceil(yearList?.lenght / postsPerPage)}
                    containerClassName="pagination"
                    previousLinkClassName="pagination__link"
                    nextLinkClassName="pagination__link"
                    disabledClassName="pagination__link--disabled"
                    activeClassName="pagination_link--active"
                    className="page-link"
                  />
                </div>
              )}
            </div>
            <div className="right-tabss">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => SearchFn(e)}
                />
                <span className="input-group-text" id="basic-addon2">
                  <img src="img/Icon feather-search.svg" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div className="owl-carousel owl-theme">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <OwlCarousel
                className="owl-theme"
                loop
                margin={0}
                width={10}
                autoWidth={100}
                nav
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="tabsActive "
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    onClick={() => filterData(item)}
                  >
                    {/* today<br> */}
                    {/* 7 Aprl */}
                  </button>
                </li>

                {datePicker?.map((item, i) => {
                  return (
                    <li className="nav-item" role="presentation">
                      <button
                        className={
                          selectedId == i
                            ? "nav-link item active"
                            : "nav-link item   "
                        }
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                        onClick={() => filterData(item, i)}
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </OwlCarousel>
            </ul>
          </div>
          <div className="main-tabs">
            <div className="texts-tab">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex={0}
                >
                  <div className="innerpart-tabs Schedule" id="common-cls">
                    <div className="three-part">
                      {allTrainers?.map((item, id) => {
                        return (
                          <div className="same-one-part">
                            <div className="head-one">
                              <h3>{item?.trainerName}</h3>
                              <a href="">View Schedule</a>
                            </div>
                            <div className="trainer-times ">
                              {timeSchedule?.map((item1) => {
                                const matchingData = dataByScheduleDate?.filter(
                                  (item2) =>
                                    item?.id == item2?.trainerId &&
                                    item1?.time?.split(" ")[0] ==
                                      item2?.timeSlot?.slice(0, -3)
                                );
                                if (matchingData?.length == 0) {
                                  {/* console.log(matchingData, "matching date") */}
                                  return (
                                    <div className="trainer-timings">
                                      <span>{item1?.time}</span>
                                      <div
                                        className="trainer-opcity"
                                        id="trainer-opcity"
                                      >
                                        <Link
                                          href=""
                                          className="trainerhover-btns"
                                          data-bs-target="#exampleModalToggle3"
                                          data-bs-toggle="modal"
                                          value={item.time}
                                          onClick={(e) =>
                                            modalShowFn(item, item1.time)
                                          }
                                        >
                                          Add Schedule
                                        </Link>
                                      </div>
                                    </div>
                                  );
                                }

                                return (
                                  <>
                                    {searchSchedualData == null
                                      ? dataByScheduleDate?.map((item2, id) => {
                                          if (
                                            item?.id == item2?.trainerId &&
                                            item1?.time?.split(" ")[0] ==
                                              item2?.timeSlot?.slice(0, -3)
                                          ) {
                                            return (
                                              <div
                                                className="trainer-timings "
                                                id="trainer-timings"
                                              >
                                                {item2.scheduleId == 3 ? (
                                                  <div className="training-div">
                                                    <h5 className="head-one-four">
                                                      {" "}
                                                      Test
                                                    </h5>
                                                  </div>
                                                ) : null}
                                                {item2.scheduleId == 2 ? (
                                                  <div className="training-div">
                                                    <h5 className="t-test">
                                                      Training & Test
                                                    </h5>
                                                  </div>
                                                ) : null}
                                                {item2.scheduleId == 1 ? (
                                                  <div className="training-div">
                                                    <h5 className="head-one-three">
                                                      Training
                                                    </h5>
                                                  </div>
                                                ) : null}

                                                <div className="head-one-main">
                                                  {item2.scheduleId != 3 ? (
                                                    <div className="head-one-one">
                                                      <h5>
                                                        {new Date(
                                                          `01/01/2000 ${item2.startTime}`
                                                        ).toLocaleTimeString(
                                                          "en-US",
                                                          {
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            hour12: true,
                                                          }
                                                        )}
                                                        -
                                                        {new Date(
                                                          `01/01/2000 ${item2.endTime}`
                                                        ).toLocaleTimeString(
                                                          "en-US",
                                                          {
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            hour12: true,
                                                          }
                                                        )}
                                                      </h5>
                                                    </div>
                                                  ) : (
                                                    <div className="head-one-one">
                                                      <h5>
                                                        {new Date(
                                                          `01/01/2000 ${item2.timeSlot}`
                                                        ).toLocaleTimeString(
                                                          "en-US",
                                                          {
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            hour12: true,
                                                          }
                                                        )}
                                                      </h5>
                                                    </div>
                                                  )}

                                                  <div className="head-one-one">
                                                    <a
                                                      href="#"
                                                      className="head-one-two"
                                                      onClick={(e) =>
                                                        handleModalShowFn(item2)
                                                      }
                                                    >
                                                      Swap Trainer
                                                    </a>
                                                  </div>
                                                </div>
                                                <div className="two-part-head">
                                                  {bookVehicle?.map((item3) => {
                                                    if (
                                                      item2.vehicleTypeId ==
                                                      item3.id
                                                    )
                                                      return (
                                                        <>
                                                          <h6>
                                                            {item3?.vehicleType}
                                                          </h6>
                                                        </>
                                                      );
                                                  })}

                                                  {item2.scheduleId != 1 ? (
                                                    <small>
                                                      Test at {item2.testTime}
                                                    </small>
                                                  ) : null}

                                                  <small>Location</small>
                                                  {allLocation?.map((item3) => {
                                                    if (
                                                      item2?.locationId ==
                                                      item3?.id
                                                    ) {
                                                      return (
                                                        <>
                                                          <span>
                                                            {" "}
                                                            {item3?.place}
                                                          </span>
                                                        </>
                                                      );
                                                    }
                                                  })}

                                                  <small>Client</small>
                                                  <div class="training-booking">
                                                    <span>
                                                      {" "}
                                                      {item2.clientName}{" "}
                                                      <strong>
                                                        ({item2.clientMobileNo})
                                                      </strong>{" "}
                                                    </span>
                                                    <Link
                                                      href="#"
                                                      class="view-booking"
                                                      onClick={(e) =>
                                                        bookingModalShowFn(
                                                          item2
                                                        )
                                                      }
                                                    >
                                                      View Bookings
                                                    </Link>
                                                  </div>

                                                  <div class="tt-payment">
                                                    <ul>
                                                      <li>
                                                        <strong>
                                                          Payment Status
                                                        </strong>
                                                      </li>
                                                      <li>Pending</li>
                                                    </ul>
                                                    <ul>
                                                      <li>
                                                        <strong>Amount</strong>
                                                      </li>
                                                      <li>$500</li>
                                                    </ul>
                                                    <ul>
                                                      <li>
                                                        <a href="">
                                                          Payment Done
                                                        </a>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                        })
                                      : searchSchedualData.map((item2) => {
                                          if (
                                            item?.id == item2?.trainerId &&
                                            item1?.time?.split(" ")[0] ==
                                              item2?.timeSlot?.slice(0, -3)
                                          ) {
                                            return (
                                              <div
                                                className="trainer-timings "
                                                id="trainer-timings"
                                              >
                                                {item2.scheduleId == 3 ? (
                                                  <div className="training-div">
                                                    <h5 className="head-one-four">
                                                      {" "}
                                                      Test
                                                    </h5>
                                                  </div>
                                                ) : null}
                                                {item2.scheduleId == 2 ? (
                                                  <div className="training-div">
                                                    <h5 className="t-test">
                                                      Training & Test
                                                    </h5>
                                                  </div>
                                                ) : null}
                                                {item2.scheduleId == 1 ? (
                                                  <div className="training-div">
                                                    <h5 className="head-one-three">
                                                      Training
                                                    </h5>
                                                  </div>
                                                ) : null}
                                                <div className="head-one-main">
                                                  {item2.scheduleId != 3 ? (
                                                    <div className="head-one-one">
                                                      <h5>
                                                        {new Date(
                                                          `01/01/2000 ${item2.startTime}`
                                                        ).toLocaleTimeString(
                                                          "en-US",
                                                          {
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            hour12: true,
                                                          }
                                                        )}
                                                        -
                                                        {new Date(
                                                          `01/01/2000 ${item2.endTime}`
                                                        ).toLocaleTimeString(
                                                          "en-US",
                                                          {
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            hour12: true,
                                                          }
                                                        )}
                                                      </h5>
                                                    </div>
                                                  ) : (
                                                    <div className="head-one-one">
                                                      <h5>
                                                        {new Date(
                                                          `01/01/2000 ${item2.timeSlot}`
                                                        ).toLocaleTimeString(
                                                          "en-US",
                                                          {
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            hour12: true,
                                                          }
                                                        )}
                                                      </h5>
                                                    </div>
                                                  )}
                                                  <div className="head-one-one">
                                                    <a
                                                      href="#"
                                                      className="head-one-two"
                                                      onClick={(e) =>
                                                        handleModalShowFn(item2)
                                                      }
                                                    >
                                                      Swap Trainer
                                                    </a>
                                                  </div>
                                                </div>
                                                <div className="two-part-head">
                                                  {bookVehicle?.map((item3) => {
                                                    if (
                                                      item2.vehicleTypeId ==
                                                      item3.id
                                                    )
                                                      return (
                                                        <>
                                                          <h6>
                                                            {item3?.vehicleType}
                                                          </h6>
                                                        </>
                                                      );
                                                  })}

                                                  {item2.scheduleId != 1 ? (
                                                    <small>
                                                      Test at {item2.testTime}
                                                    </small>
                                                  ) : null}
                                                  <small>Location</small>
                                                  {allLocation?.map((item3) => {
                                                    if (
                                                      item2?.locationId ==
                                                      item3?.id
                                                    ) {
                                                      return (
                                                        <>
                                                          <span>
                                                            {" "}
                                                            {item3?.place}
                                                          </span>
                                                        </>
                                                      );
                                                    }
                                                  })}

                                                  <small>Client</small>
                                                  <span>
                                                    {" "}
                                                    {item2.clientName}
                                                    <strong>
                                                      ({item2.clientMobileNo})
                                                    </strong>
                                                  </span>

                                                  <div class="tt-payment">
                                                    <ul>
                                                      <li>
                                                        <strong>
                                                          Payment Status
                                                        </strong>
                                                      </li>
                                                      <li>Pending</li>
                                                    </ul>
                                                    <ul>
                                                      <li>
                                                        <strong>Amount</strong>
                                                      </li>
                                                      <li>$500</li>
                                                    </ul>
                                                    <ul>
                                                      <li>
                                                        <a href="">
                                                          Payment Done
                                                        </a>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                        })}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
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
        dy={dy}
      />
      <SwapTrainer
        showModal={showModal}
        setShowModal={setShowModal}
        getAllSchedule={getAllSchedule}
        itemId={{ id, scheduleId }}
        trainerId={trainerId}
      />
      <ClientInfoModal
        bookingShowModal={bookingShowModal}
        setBookingShowModal={setBookingShowModal}
        bookingId={bookingId}
      />
    </>
  );
}
export default dynamic(() => Promise.resolve(Schedule), { ssr: false });
