const { urlencoded } = require('express');
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const host='0.0.0.0';
mongoose.connect('mongodb+srv://akshaygupta42:Coldblot%4070@cluster0.se5soo7.mongodb.net/', { dbName: 'StudentInformationSystem' }).then('Connected database').catch(e => console.log(e));
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

app.use(express.urlencoded({ extended: false }));
app.use(express.static('html'));
app.get('/', (req, res) => res.sendFile(__dirname+'/html/index.html'));

app.post('/submitDetails', async  (req, res) => {
    const { ID, Name, Roll, Father, Address, Phone } = req.body;
    const id = await model.create({
        ID,
        Name,
        Roll,
        Father,
        Address,
        Phone,
    }).catch(e => res.render('form-submission.ejs', { Message: e }));
    res.render('form-submission.ejs', { Message:'Form has been submitted'});
});
app.get('/getUsers', async (req, res) => {
    const user = await model.find({});
    res.json({
        users: user,
    });
});
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

app.post('/Id', async (req, res) => {
    const { Image } = req.body;
    const id = await (await model.find({}, { _id: 1, ID: 1 }));
    for (var i = 0; i < id.length; i++) {
        if (Image == id[i].ID) {
            await model.findOneAndDelete({ ID: id[0].ID });
        }
    }
    
});
function fetchColumn(id,column) {
    arr = [];
    for (var i = 0; i < id.length; i++) {
        const a = id[i][column];
        arr.push(a);
    }
    return arr;
}
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
app.listen(process.env.PORT || 80, () => console.log('Connection Established'));