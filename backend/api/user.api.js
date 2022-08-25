const {register,login,getAll,getByID,updateUser,deleteUser} = require("../dal/user.dal");

const userRegister = async (data)=>{
    let user = await register(data);
    return user;
}

const loginUser = async (data)=>{
    let user = await login(data);
    return user;
}

const userGetAll = async ()=>{
    let users = await getAll();
    return users;
}

const userGetById = async (id)=> {
    let user = await getByID(id);
    return user;
}

const userUpdate =async (id,data)=>{
    let user = await updateUser(id,data);
    return user;
}

const userDelete = async (id)=> {
    let user = await deleteUser(id);
    return user;
}


module.exports = {userDelete,userGetAll,userGetById,userRegister,userUpdate,loginUser}