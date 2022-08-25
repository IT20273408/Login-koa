import React,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

const Profile = ()=>{

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

    const [currentID, setcurrentID] = useState("")

    const getuserByID = async ()=>{
        try {
            let data = await axios.get("http://localhost:5000/users/get-by-id/"+currentID);
            console.log(data);
            setData({
                name:data?.data?.name,
                email:data?.data?.email,
                password:data?.data?.password,
                userRole:data?.data?.userRole
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        setcurrentID(localStorage.getItem("token"));
    },[])

    useEffect(()=>{
        getuserByID();
    },[currentID])

    const UpdateUserData = async (e)=>{
        e.preventDefault();
        try {
            let user = await axios.put("http://localhost:5000/users/update/"+currentID,data);
            console.log(user);
            if(user?.data?.acknowledged === true)
            {
                alert("update success");
                navigate("/admin-home");

            }
            else
            {
                alert("update failed");
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <div>
                <h2>
                    Current User Details display and update From Here
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
                            readOnly
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


                        <button onClick={(e)=>UpdateUserData(e)}>Update</button>
                    </form>
                </div>
            </div>
        </div>       
    )
}

export default Profile;