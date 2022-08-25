const Router = require("@koa/router");

const {userDelete,userGetAll,userGetById,userRegister,userUpdate,loginUser} = require("../api/user.api");

const userRouter = new Router({
    prefix:"/users"
})

    userRouter.post("/register",async (ctx)=>{
        let body = ctx.request.body;
        let data = await userRegister(body);
        ctx.response.status = 200;
        ctx.body = data;

    })

    userRouter.post("/login",async (ctx)=>{
        let body = ctx.request.body;
        let data = await loginUser(body);
        ctx.response.status = 200;
        ctx.body = data;
    })

    userRouter.get("/get-all",async (ctx)=>{
        let data = await userGetAll();
        ctx.response.status = 200;
        ctx.body = data;
    })

    userRouter.get("/get-by-id/:id",async (ctx)=>{
        let id = ctx.params.id;
        let data = await userGetById(id);
        ctx.response.status = 200;
        ctx.body = data;
    })

    userRouter.put("/update/:id",async (ctx)=>{
        let body = ctx.request.body;
        let id = ctx.params.id;
        let data = await userUpdate(id,body);
        ctx.response.status = 200;
        ctx.body = data;
    })

    userRouter.delete("/delete/:id",async (ctx)=>{
        let id = ctx.params.id;
        let data = await userDelete(id);
        ctx.response.status = 200;
        ctx.body = data;
    })


module.exports = userRouter;