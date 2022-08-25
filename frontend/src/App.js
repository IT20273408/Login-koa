import React,{useEffect,useState} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import Register from "./components/Register";
import AllUsers from "./components/adminPages/AllUsers";
import EditUsers from "./components/adminPages/EditUsers";
import Profile from "./components/Profile";

const App = ()=>{

    const [token, settoken] = useState(null);

    useEffect(() => {
       settoken(localStorage.getItem("token"));
    }, [])

    return (
        <div>   
            <Router>
                {token !== null ? <Navbar/> : <></>}
                <Routes>
                    <Route exact path="/" element={token !== null ? <Home/> : <Login/>}/>
                    <Route  path="/register" element={<Register/>}/>
                    <Route path="/admin-home" element={<AllUsers/>}/>
                    <Route path="/update-user/:id" element={<EditUsers/>}/>
                    <Route path="/current-user" element={<Profile/>}/>
                </Routes>
            </Router>
        </div>
    )
}

module.exports = App;