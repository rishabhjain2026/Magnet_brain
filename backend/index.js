const express=require('express');
const app=express();
const userroutes=require('./router/user.route')
app.use(express.json());

const dotenv=require('dotenv')
dotenv.config()

const taskroutes=require('./router/task.route');
const { default: mongoose } = require('mongoose');

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' })); // Vite default port

app.use("/user",userroutes)

app.use("/task",taskroutes)

mongoose.connect(process.env.mongo_atlas).then(()=>{
    console.log("connected to database")
}).catch(()=>{
    console.log("failed to connect")
})

const PORT=process.env.PORT || 3000;    

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});