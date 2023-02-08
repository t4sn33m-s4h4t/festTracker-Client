import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import fest from "./fest.png";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('')
  const searchFormSubmit = (e)=>{
    e.preventDefault()
    history.push({
      pathname: '/',
      search: `?search=${searchTerm}`
    });
  }
  return (
    <div className="top">
      <div className="topLeft">
        <Link to="/">
          <img src={fest} alt="" />
        </Link>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/upcoming-fests">
              Upcoming Fests
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/running-fests">
              Running Fests
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/create-fest">
              Create Fest
            </Link>
          </li>
          
        {user ? (
          <li className="topListItem">
            <Link className="link" to="/settings">Profile</Link>
          </li>
        ) : (
            <>
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
            </>
        )}
        </ul>
      </div>
      <div className="topRight">
          <form onSubmit={searchFormSubmit} className="searchform">
            <input value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}}  className="search" type="text" />
      <i onClick={searchFormSubmit}  className="topSearchIcon fas fa-search"></i>
          </form>
      </div>
    </div>
  );
}
