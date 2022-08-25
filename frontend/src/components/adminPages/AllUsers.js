import React,{useEffect,useState} from "react";
import axios from "axios";

const AllUsers =()=>{

    const [users, setusers] = useState([]);

    const getAllUsers = async ()=> {
        try {
            let data = await axios.get("http://localhost:5000/users/get-all");
            console.log(data);
            setusers(data?.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getAllUsers();
    },[])

    const deleteUserdata = async (e,id)=> {
        e.preventDefault();
        try {
            let data = await axios.delete("http://localhost:5000/users/delete/"+id);
            console.log(data);
            if(data?.data?.acknowledged ===  true)
            {
                alert("delete success");
                window.location.reload();
            }
            else
            {
                alert("delete failed");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>All Users Page</div>
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>email</th>
                                <th>user Role</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user,index)=>{
                                return(
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.userRole}</td>
                                        <td>
                                            <a href={`/update-user/${user?._id}`}><button>update</button></a>
                                        </td>
                                        <td>
                                            <button onClick={(e)=>deleteUserdata(e,user?._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>       
    )
}

export default AllUsers;