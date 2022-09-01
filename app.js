import express from 'express';
const app = express();
import mongoose from 'mongoose'
import auth from './Routes/auth.js'
import usersroute from './Routes/usersroute.js'
import productsroutes from './Routes/productsroutes.js'
import orderroutes from './Routes/orderroutes.js'
import request from 'request'

app.use(express.json());
app.use('/', auth)
app.use('/', auth)
app.use('/update', usersroute)
app.use('/add', productsroutes)
app.use('/updateproduct', productsroutes)
app.use('/deleteproduct', productsroutes)
app.use('/get', productsroutes)
app.use('/productbyid', productsroutes)
app.use('/all', usersroute)
app.use('/user', usersroute)
app.use('/addorder', orderroutes)
app.use('/updateorder', orderroutes)
app.use('/users/update', orderroutes)
app.use('/order', orderroutes)
mongoose.connect("mongodb://127.0.0.1:27017/Ecomapi", {
    useNewurlParser: true,
    useunifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connection sucessfully")
    }
})

//>>>>>>>>>>>>>>>>>>>>>Api call>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// app.get('/', (req, res) => {
//     let city = req.query.city;

//     request(
//         `https://samples.openweathermap.org/data/2.5/forecast?q=${city}&appid=cf7bcbacd441f829bd7425fadffc1616`,
//         function(error, response, body) {

//             let data = JSON.parse(body);
//             if (response.statusCode === 200) {
//                 res.send(`The weather in your city "${city}" is ${data.list[0].weather[0].description}`);
//             } else {
//                 res.send(`something missing`);
//             }
//         }
//     );
// });


app.listen(2000), () => {

    Console.log("port set sucessfully")
}