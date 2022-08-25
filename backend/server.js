const Koa = require("koa");
const cors = require("@koa/cors");
const bodyparser = require("koa-bodyparser");

const PORT =  5000;

const app =  new Koa();

app.use(bodyparser());
app.use(cors({
    origin:["*"]
}))


//import routes
const userRouter = require("./routes/user.routes");

//use routes
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());


app.listen(PORT);

console.log("APPlication is running on port "+ PORT);