

const sql = require('mssql');

const { Sequelize } = require('sequelize');


const config = {
  user: 'sa',
  password: 'gopl@123',
  server: '192.168.1.122', 
  database: 'crmGlobal',
   options: {
    encrypt: false, 
    trustServerCertificate: true
  }
};


async function connectSQL() {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Error connecting to SQL Server:', err);
  }
  
}








module.exports = { connectSQL, sql };


