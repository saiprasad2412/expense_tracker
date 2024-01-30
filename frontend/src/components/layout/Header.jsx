import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" >
            Expense Tracker
            </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
            </Link>

              </li>
              <li className="nav-item">
                <Link  to="/user" className="nav-link">
                  User
                  </Link>
            
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
