const express = require("./node_modules/express");
const path = require("path"); 
const app = express();
var mongoose = require('mongoose');
var ejs=require("ejs");
const bodyparser= require ("body-parser");
mongoose.connect('mongodb://localhost/knowmore', {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true});
const port = 8000;

// Define mongoose schema
var knowSchema = new mongoose.Schema({
    name: String,
    relation:String,
    hobby:String,
    memory:String
  });
  var Know = mongoose.model('Know', knowSchema);

// EXPRESS SPECIFIC STUFF
// app.use('/static', express.static('static')) // For serving static files
// app.use(express.urlencoded())
app.use("public",express.static(__dirname + 'public'));
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));


// HTML SPECIFIC STUFF
app.set('view engine', 'ejs') // Set the template engine as html
app.set('public', path.join(__dirname, 'public')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('index.ejs', params);
})
app.post('/',(req,res)=>{
    var myData = new Know(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("Item was not saved to the database")
    });

    
   
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});