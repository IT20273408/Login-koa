import React,{useEffect,useState} from "react";
import {  useNavigate } from "react-router-dom";

const Navbar =()=>{

    const navigate = useNavigate();

 const [userRole, setuserRole] = useState(null);

 useEffect(() => {
    setuserRole(localStorage.getItem("userRole"));
 }, [])

 const LogOutfunc = (e)=> {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/")
    window.location.reload();
 }

    return (
        <div>
            <div>
                <label style={{float:"left" , marginLeft:"5px"}}>Nav Bar</label>
                <a href="/admin-home" style={{display:userRole === "admin" ? "flex":"none" , float:"left" , marginLeft:"5px"}}><button>Admin Home</button></a>
                <a href="/studnet-home" style={{display:userRole === "student" ? "flex":"none" , float:"left" , marginLeft:"5px"}}><button>stundet Home</button></a>
                <button style={{display:userRole !== null ? "flex": "none" , float:"left" , marginLeft:"5px"}} onClick={(e)=>LogOutfunc(e)}>Log Out</button>
                <a href="/current-user" style={{display:userRole !== null? "flex":"none" , float:"left" , marginLeft:"5px"}}><button>Profile</button></a>

                <br/><br/><br/>
            </div>
        </div>       
    )
}

export default Navbar;