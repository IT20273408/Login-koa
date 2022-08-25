import React,{useEffect,useState} from "react";
import axios from "axios"
import { useNavigate , useParams } from "react-router-dom";

const EditUsers =()=>{

    const id = useParams();
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



    const getuserByID = async ()=>{
        try {
            console.log(id);
            let data = await axios.get("http://localhost:5000/users/get-by-id/"+id?.id);
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
        getuserByID();
    },[])

    const UpdateUserData = async (e)=>{
        e.preventDefault();
        try {
            let user = await axios.put("http://localhost:5000/users/update/"+id?.id,data);
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
                    Update From Here
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

export default EditUsers;