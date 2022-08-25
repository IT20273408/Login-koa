const User = require("./connect").db("testingDB").collection("users");

const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");

const register = async (alldata)=> {

    var data = {
        name:alldata.name,
        email:alldata.email,
        password:alldata.password,
        userRole:alldata.userRole
    }

    let pwd = data.password;
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(pwd,salt);
    data.password =  hash;
    let user = await User.insertOne(data);
    return user;
}

const getAll = async ()=> {
    let data = await User.find();
    return data.toArray();
}

const getByID = async (id)=>{
    let data = await User.findOne({_id:ObjectId(id)});
    return data;
}

const updateUser = async (id,data) => {
    let user = await User.replaceOne({_id:ObjectId(id)},data);
    return user;
}

const deleteUser = async (id) => {
    let data = await User.deleteOne({_id:ObjectId(id)});
    return data;
}

const login = async (data)=>{
    let user = await User.findOne({"email":data.email});
    if(user)
    {
        let pwd =  bcrypt.compare(user.password,data.password);
        if(pwd)
        {
            return {msg:"Login sucess",token:user._id,userRole:user.userRole}
        }
        else
        {
            return {msg:"login failed"}
        }
    }
    else
    {
        return {msg:"login failed"}
    }
}

module.exports =  {register,login,getAll,getByID,updateUser,deleteUser}
