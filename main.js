import mongoose from "mongoose";
import express from 'express'
import dotenv from 'dotenv'
import  { Logger }  from "./middlewares/Logger.js";
import router from "./routes/users.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authrouter from "./routes/auth.js";
import adminhrouter from "./routes/admin.js";
import taskrouter from "./routes/Taskroute.js";
dotenv.config()

const app = express();
app.use( express.json() );
app.use("/users" , router )
app.use("/auth" , authrouter )
app.use("/admin" , adminhrouter )
app.use("/task" , taskrouter )



app.use( Logger );
app.use(notFound);

app.use( errorHandler )
mongoose
    .connect(process.env.NODE_ENV=="development"?process.env.MONGODB_URI: process.env.MONGODB_URI_dep)
    .then(() => console.log('Done'))

app.listen(process.env.PORT)
