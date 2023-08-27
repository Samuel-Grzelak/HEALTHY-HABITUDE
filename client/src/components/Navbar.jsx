import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=fitness">
            <h6>FITNESS</h6>
          </Link>
          <Link className="link" to="/?cat=mindfulness">
            <h6>MINDFULNESS</h6>
          </Link>
          <Link className="link" to="/?cat=nutrition">
            <h6>NUTRITION</h6>
          </Link>
          <Link className="link" to="/?cat=recipes">
            <h6>RECIPES</h6>
          </Link>
          <Link className="link" to="/?cat=inspirational">
            <h6>INSPIRATIONAL</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
