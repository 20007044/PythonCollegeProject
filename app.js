//Initialize the modules
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');


//host for mongodb and database name and connectivity
const host='0.0.0.0';
mongoose.connect('mongodb+srv://akshaygupta42:Coldblot%4070@cluster0.se5soo7.mongodb.net/', { dbName: 'StudentInformationSystem' }).then('Connected database').catch(e => console.log(e));

//schema for database model
const schema = mongoose.Schema(
    {
        ID: Number,
        Name: String,
        Roll: String,
        Father: String,
        Address: String,
        Phone: String,
    }
);