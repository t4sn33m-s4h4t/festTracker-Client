import './responsive.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./mobileMenu.css";

export default function MobileMenu() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  const [leftValue , setLeftValue]= useState('-274px')

  return (
    <div>
        <div className={leftValue==='0'?'overlay':''} onClick={()=>{
            leftValue==='-274px'? setLeftValue('0') : setLeftValue('-274px')  
        }} ></div>
        <div className={`mobileMenu`} style={{left: leftValue}}>
        <i style={leftValue==='0'? {color:"white"}:{}} className=" hamburger fa-solid fas fa-bars" onClick={()=>{
            leftValue==='-274px'? setLeftValue('0') : setLeftValue('-274px')  
        }}></i>
        
      <div className="mobileMenuItem">
        
      <span className="mobileMenuTitle">Menus</span>
        <ul className="mobileMenuList">
          <li  style={{marginTop: '  5px'}} >
            <Link    to="/">
              Home
            </Link>
          </li>
          <li style={{marginTop: '  5px'}}  >
            <Link    to="/upcoming-fests">
              Upcoming Fests
            </Link>
          </li>
          <li style={{marginTop: '  5px'}}  >
            <Link    to="/running-fests">
              Running Fests
            </Link>
          </li>
          <li  style={{marginTop: '  5px'}} >
            <Link    to="/create-fest">
              Create Fest
            </Link>
          </li>
          <li  style={{marginTop: '  5px'}} >
            <Link    to="/settings">
                Profile
            </Link>
          </li>
        </ul>

        <span className="mobileMenuTitle">CATEGORIES</span>
        
        <ul className="mobileMenuList">
          {cats.map((c) => (
            <li style={{marginTop: '  5px'}}  >
            <Link    to={`/?cat=${c.name}`}>
            {c.name}
            </Link>
          </li>
          ))}
        </ul>
      </div>
      <div className="mobileMenuItem">
        <span className="mobileMenuTitle">FOLLOW US</span>
        <div className="mobileMenuSocial">
          <i className="mobileMenuIcon fab fa-facebook-square"></i>
          <i className="mobileMenuIcon fab fa-twitter-square"></i>
          <i className="mobileMenuIcon fab fa-pinterest-square"></i>
          <i className="mobileMenuIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
    </div>
  );
}
