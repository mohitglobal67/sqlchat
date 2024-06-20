require('dotenv').config();
const sql = require('mssql');

var mongoose = require('mongoose');


const { connectSQL } = require('./middlewares/db');


const  connect = require('./middlewares/db');

mongoose.connect("mongodb+srv://mohitglobal67:mohit@sbs.jjk73yj.mongodb.net/test");

// mongoose.set('strictQuery', true);

// mongoose.connect(process.env.MONGO_URL,);

// mongoose.connection.on('err', err => {
//     console.log("connection failed");
// });

// mongoose.connection.on('connected', connected => {
//     console.log("connection Success ");
// })

const app = require('express')();
// const http = require('http');
app.use(async(req, res, next) => {
 await connectSQL().then(() => {
    next();
  });
});

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const User = require('./model/usermodel')

const Chat = require('./model/chatmodel')

const userRoutes = require("./routes/userRoutes");




app.set('view engine', 'ejs');

app.use('/', userRoutes);







var usp = io.of('/user-namespace');




const updateUserOnlineStatus = async (username1,userId) => {
  try {
    // const client = await sql.connect();
    const queryString = `UPDATE t_personnel_details SET f_isonline = '1' WHERE  f_Student_id = ${username1}`;
    const values = [username1,userId];
    await sql.query(queryString, values);
  //  sql.release();
    console.log('User online status updated successfully');
  } catch (error) {
    console.error('Error updating user online status:', error);
  }
};

const updateUserOfflineStatus = async (username1,userId) => {
  try {
    // const client = await sql.connect();
    const queryString = `UPDATE t_personnel_details SET f_isonline = '0' WHERE  f_Student_id = ${username1}`;
    const values = [username1,userId];
    await sql.query(queryString, values);
  //  sql.release();
    console.log('User online status updated successfully');
  } catch (error) {
    console.error('Error updating user online status:', error);
  }
};

usp.on('connection',async function (socket) {

    const userId = socket.handshake.auth.token;

       const username1 = socket.handshake.query.auth
    
    // console.log(userId);
    console.log("njknkj" + username1);


  await updateUserOnlineStatus(username1,userId);
    
     //await User.findByIdAndUpdate({ _id: userId || username1 }, { $set: { is_online: '1' } });
  
  // //show online user broadcast
   socket.broadcast.emit('getOnlineUser',  {user_id:userId || username1})
    //socket.broadcast.emit('getOnlineUser', {user_id:userId || username1})

    //     console.log("user connected");


    socket.on('disconnect',async function () {

        var userId = socket.handshake.auth.token;
        const username1 = socket.handshake.query.auth
       // await User.findByIdAndUpdate({ _id: userId || username1}, { $set: { is_online: '0' } });
  await updateUserOfflineStatus(username1,userId);
      //show offline user broadcast
      
       socket.broadcast.emit('getOfflineUser',  {user_id:userId || username1})
       //socket.broadcast.emit('getOfflineUser', {user_id:userId || username1})
        
        console.log("user disconnected");
        
    });

    // //chat implemation
    socket.on('newChat', function (data) {

        socket.broadcast.emit('loadNewChat', data);
            
    });


  socket.on('existsChat', async function (data) {
       
        
    const queryfetch = `Select * from Chat WHERE (sender_id= ${data.sender_id} and receiver_id = ${data.receiver_id} ) or (sender_id= ${data.receiver_id}  and receiver_id = ${data.sender_id}) order by f_creationdate asc`;
       
    const chats = await sql.query(queryfetch);
    

   

        //  var chats = await Chat.find({
        //      $or: [{
        //          sender_id: data.sender_id,
        //          receiver_id: data.receiver_id
        //      },
                 
        //      {
        //          sender_id: data.receiver_id,
        //          receiver_id: data.sender_id
        //      }
        //      ]
        //  });
         socket.emit('loadChats',{chats:chats.recordset})
        
    
    });
})





const PORT = process.env.PORT || 3000


// const PORT = 3000;



server.listen(PORT,   ()=> {
    console.log(`server is runing `);
});


// const PORT = `${window.location.origin}`;
// server.listen(PORT, function () {
//     console.log(`server is runing`);
// });