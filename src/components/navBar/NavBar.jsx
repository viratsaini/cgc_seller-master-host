import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { handleAuth } from "../utils/auth";
import AvatarComp from "./AvatarComp";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut, setLogin } from "../store/slice/loginSlice";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { changeNavbarState } from "../store/slice/collapsedSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.value);
  const sider = useSelector((state) => state.collapsed.sider);

  const open = useSelector((state) => state.collapsed.navbar);
  const [email, setEmail] = useState({
    email: localStorage.getItem("email"),
    avatar: localStorage.getItem("avatar"),
  });

  const setEmailNull = () => {
    localStorage.clear();
    setEmail({ email: null, avatar: null });
    dispatch(setLogOut(false));
  };

  const handleLogin = () => {
    dispatch(setLogin(true));
  };

  useEffect(() => {
    if (localStorage.getItem("email")) {
      dispatch(setLogin(true));
    } else {
      dispatch(setLogin(false));
    }
  }, );

  useEffect(() => {
    setEmail({
      email: localStorage.getItem("email"),
      avatar: localStorage.getItem("avatar"),
    });
  }, [login]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <MenuOutlined
            onClick={() => {
              if (!sider) {
                dispatch(changeNavbarState(true));
              }
            }}
            className="sm-menu-icon"
          />

          <Link to={"/"} style={{ display: "flex", justifyContent: "center", }}>
            <img
              src="../../../logo2.png"
              alt="logo"
              style={{ width: "190px" }}
            />
            {/* <div className="contaner"style={{border:"3px solid black",display: "flex", justifyContent: "center" ,padding:"2px 0px" ,borderRadius:"7px"}}>
            <h2 style={{ display: "flex", justifyContent: "center",marginLeft:"5px", backgroundColor:"black" ,color:"white", border:"3px solid black" ,borderRadius:"4px", padding:"0px 2px"}}>SHAMLI</h2>
            <h2 style={{ display: "flex", justifyContent: "center",marginLeft:"5px", padding:" 0px 3px 0px 2px",border:"1px solid white" ,borderRadius:"4px",fontSize:"22px" }}> SELLER</h2>
            </div> */}
          </Link>
          <div
            className={`sm-menu-cnt ${open ? "active" : ""}`}
            onClick={() => dispatch(changeNavbarState(false))}
          >
            <div className={`menu-sm ${open ? "active" : ""}`}>
              <Link to={"/"}>
                <img
                  src="../../../logo2.png"
                  alt="logo"
                  style={{ width: "180px" }}
                />
              </Link>

              <CloseOutlined
                className="sm-menu-icon"
                onClick={() => dispatch(changeNavbarState(false))}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  fontSize: "25px",
                }}
              />

              <ul className="menu-sm-items">
                <li>
                  <Link
                    to={"/"}
                    onClick={() => dispatch(changeNavbarState(false))}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/aboutUs"}
                    onClick={() => dispatch(changeNavbarState(false))}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/aboutUs"}
                    onClick={() => dispatch(changeNavbarState(false))}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/faq's"}
                    onClick={() => dispatch(changeNavbarState(false))}
                  >
                    Faq's
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <ul className="menu-items">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/aboutUs"}>About Us</Link>
            </li>
            <li>
              <Link to={"/aboutUs"}>Contact Us</Link>
            </li>
            <li>
              <Link to={"/faq's"}>Faq's</Link>
            </li>
          </ul>

          {email.email ? (
            <AvatarComp avatar={email.avatar} setEmailNull={setEmailNull} />
          ) : (
            <button
              className="add-item-button"
              style={{
                padding: "7px 20px",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                background: "#3fa9f9",
              }}
              onClick={() => {
                handleAuth(handleLogin);
              }}
            >
              Log In
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
