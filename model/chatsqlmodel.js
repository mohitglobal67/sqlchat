// // models/Chat.js

// const { DataTypes } = require('sequelize');
// const sequelize = require('../middlewares/db');




// // Define the Chat model using Sequelize
// const Chat = sequelize.define('Chat', {
//   sender_id: {
//     type: DataTypes.UUID, // Assuming sender_id is a UUID
//     allowNull: false
//   },
//   receiver_id: {
//     type: DataTypes.UUID, // Assuming receiver_id is a UUID
//     allowNull: false
//   },
//   message: {
//     type: DataTypes.TEXT, // Assuming message is a string of any length
//     allowNull: false
//   },
//   timestamp: {
//     type: DataTypes.STRING, // Assuming timestamp is a string
//     defaultValue: getCurrentTime // Default value based on getCurrentTime function
//   }
// }, {
//   // Disable Sequelize's default timestamps (createdAt and updatedAt)
//   timestamps: false
// });

// // Function to get the current time
// function getCurrentTime() {
//   const now = new Date();
//   const options = { hour: 'numeric', minute: '2-digit', hour12: true };
//   return now.toLocaleTimeString('en-US', options);
// }

// // Export the Chat model
// module.exports = Chat;
