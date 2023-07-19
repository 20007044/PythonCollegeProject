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
const model = mongoose.model('InformationSystem', schema);

app.get('/modifyView',async (req,res)=>{    
const id = await(await model.find({}, { _id: 0, ID: 1 }));
const name = await(await model.find({}, { _id: 0, Name: 1 }));
const roll = await(await model.find({}, { _id: 0, Roll: 1 }));
const father = await(await model.find({}, { _id: 0, Father: 1 }));
const address = await(await model.find({}, { _id: 0, Address: 1 }));
const phone = await(await model.find({}, { _id: 0, Phone: 1 }));
let ids = fetchColumn(id, 'ID');
let names = fetchColumn(name, 'Name');
let rolls = fetchColumn(roll, 'Roll');
let fathers = fetchColumn(father, 'Father');
let addresss = fetchColumn(address, 'Address');
let phones = fetchColumn(phone, 'Phone');
const data = new Array(ids, names, rolls, fathers, addresss, phones);
const query = model.find({});
query.count().then(cnt => {
    res.render('modifyView.ejs', {
        rows: cnt,
        data: data,
        pic: "./Images/edit.png",})})
    });
app.get('/InformationView', async (req, res) => {
    const id = await (await model.find({}, { _id: 0, ID: 1 }));
    const name = await (await model.find({}, { _id: 0, Name: 1 }));
    const roll = await (await model.find({}, { _id: 0, Roll: 1 }));
    const father = await (await model.find({}, { _id: 0, Father: 1 }));
    const address = await (await model.find({}, { _id: 0, Address: 1 }));
    const phone = await (await model.find({}, { _id: 0, Phone: 1 }));
    
    let ids = fetchColumn(id, 'ID');
    let names = fetchColumn(name,'Name');
    let rolls = fetchColumn(roll, 'Roll');
    let fathers = fetchColumn(father, 'Father');
    let addresss = fetchColumn(address, 'Address');
    let phones = fetchColumn(phone, 'Phone');
    const data = new Array(ids,names, rolls, fathers,addresss,phones);
    const query = model.find({});
    query.count().then(cnt => {
        res.render('InformationView.ejs', {
            rows: cnt,
            data:data,

    }) })
});
app.get('/DeleteView', async (req, res) => {
    const id = await(await model.find({}, { _id: 0, ID: 1 }));
    const name = await(await model.find({}, { _id: 0, Name: 1 }));
    const roll = await(await model.find({}, { _id: 0, Roll: 1 }));
    const father = await(await model.find({}, { _id: 0, Father: 1 }));
    const address = await(await model.find({}, { _id: 0, Address: 1 }));
    const phone = await(await model.find({}, { _id: 0, Phone: 1 }));
    let ids = fetchColumn(id, 'ID');
    let names = fetchColumn(name, 'Name');
    let rolls = fetchColumn(roll, 'Roll');
    let fathers = fetchColumn(father, 'Father');
    let addresss = fetchColumn(address, 'Address');
    let phones = fetchColumn(phone, 'Phone');
    const data = new Array(ids, names, rolls, fathers, addresss, phones);
    const query = model.find({});
    query.count().then(cnt => {
        res.render('DeleteView.ejs', {
            rows: cnt,
            data: data,
            pic: "./Images/delete2.png",
        })
    })

});
app.listen(process.env.PORT || 80, () => console.log('Connection Established'));
