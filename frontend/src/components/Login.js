import React,{useEffect,useState} from "react";
import axios from "axios";


const Login = ()=>{

    const [data, setData] = useState({
        email:"",
        password:""
    });

    const {email, password }= data;

    const onChangeData = (e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const submitLogin = async (e)=>{
        e.preventDefault();
        let user = await axios.post("http://localhost:5000/users/login",data);
        console.log(user);
        if(user?.data?.token)
        {
            alert("login success");
            localStorage.setItem("token",user?.data?.token);
            localStorage.setItem("userRole",user?.data?.userRole);
            window.location.reload();
        }
        else
        {
            alert("Login Failed");
            window.location.reload();
        }
    }

    return (
        <div>
            <div>
                <h2>
                    Login From Here
                </h2>

                <div>
                    <form>
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

                        <button onClick={(e)=>submitLogin(e)}>Login</button>
                    </form>
                    <div>
                        <label>Register from here..!</label>
                        <a href="/register"><button>Register</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;