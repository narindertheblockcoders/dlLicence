import React from 'react'
import { useRouter } from 'next/router';

const Navbar = () => {

  const router = useRouter()
  async function logOut() {
    localStorage.clear()
    router.push("/login")

  }
  return (
    <div>
      <nav className="navbar navbar-default navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/getUsers">
            Driving Schedule Software
          </a>
          <button
            className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">


              <li className="nav-item">
                <a className="nav-link  " aria-current="page" href="getUsers">
                  Users
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/bookingList">
                  Booking
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/schedule">
                  Schedule
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/trainers">
                  Trainers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/client">
                  Clients
                </a>
              </li>

            </ul>
            <form className="d-flex" role="search" id="nav-selects">
              <span>
                <a href="#">
                  <img src="img/Subtraction 1.svg" alt="" />
                </a>
              </span>
              <div className='dropdown'>

              </div>

              <div className="dropdown" id='dropdownLogout'>
                <button className="btn btn-secondary dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Admin
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a className="dropdown-item" onClick={logOut}>Logout</a></li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar