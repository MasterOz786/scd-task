const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

// load .env file
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI,
  console.log('MongoDB connected')
)


app.listen(process.env.SERVER_PORT,
  console.log(`Server listening on port: ${process.env.SERVER_PORT}`)
)

app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task })
      .then(result => res.json(result))
      .catch(err => console.log(err));
   
});

app.get('/get',(req,res)=>{
  TodoModel.find()
  .then(result=> res.json(result))
  .catch(err=>console.log(err));
});
  
app.put('/edit/:id',(req,res)=>{
  const{id} = req.params;
  TodoModel.findByIdAndUpdate(id,{done:true},{new:true})
  .then(result=> res.json(result))
  .catch(err=>res.json(err));
 });

app.put('/update/:id',(req,res)=>{
  const{id} = req.params;
  const{task} = req.body;
  TodoModel.findByIdAndUpdate(id,{task:task})
  .then(result=> res.json(result))
  .catch(err=>res.json(err));
 });

app.delete('/delete/:id',(req,res)=>{
  const{id} = req.params;
  TodoModel.findByIdAndDelete({_id:id})
  .then(result=> res.json(result))
  .catch(err=>res.json(err));
 }); 

module.exports=app;
