import React,{useEffect,useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Register =()=>{

    const navigate = useNavigate();

    const [data, setData] = useState({
        name:"",
        email:"",
        password:"",
        userRole:""
    });

    const {email, password ,userRole , name }= data;

    const onChangeData = (e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const registerUser = async(e)=>{
        e.preventDefault();
        let user = await axios.post("http://localhost:5000/users/register",data);
        console.log(user);
        if(user?.data?.acknowledged === true)
        {
            alert("register success");
            navigate("/");
        }
        else
        {
            alert("register failed");
        }

    }



    return (
        <div>
            <div>
                <h2>
                    Register From Here
                </h2>

                <div>
                    <form>

        
                    <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="enter name"
                            onChange={(e)=>onChangeData(e)}
                            />

                            <br/><br/>


                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="enter email"
                            onChange={(e)=>onChangeData(e)}
                            />
                            <br/><br/>

                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="enter password"
                            onChange={(e)=>onChangeData(e)}
                            />

                            <br/><br/>

                        
                        <input
                            type="text"
                            name="userRole"
                            value={userRole}
                            placeholder="enter userRole"
                            onChange={(e)=>onChangeData(e)}
                            />

                            <br/><br/>


                        <button onClick={(e)=>registerUser(e)}>Register</button>
                    </form>
                    <br/><br/>
                    <div>
                        <label>Login from here..!</label>
                        <a href="/"><button>Login</button></a>
                    </div>
                </div>
            </div>
        </div>       
    )
}

export default Register;