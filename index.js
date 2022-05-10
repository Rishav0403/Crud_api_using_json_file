import express from 'express';

import fs from 'fs';
const app = express();

const dataPath = './data.json';

// middleware
app.use(express.json());

// To get all books
app.get('/api/v1/book', (req, res) => {
  fs.readFile(dataPath, 'utf-8', function(err, data){
    if(err){
      console.log(err);
    }
    data = JSON.parse(data);
    res.json(data);
  })
})

// to store new books
app.post('/api/v1/book', (req, res) => {
  fs.readFile(dataPath, 'utf-8', function(err, data){
    if(err){
      console.log(err);
    }
    data = JSON.parse(data);
    const newBook = {
      id: data[data.length-1].id +1,
      author: req.body.author,
      title: req.body.title
    }
    let newdata = [...data, newBook];
    newdata = JSON.stringify(newdata);
    fs.writeFile(dataPath, newdata, function(err) {
      if(err){
        console.log(err);
      }
      else {
        console.log("Successfully written data");
      }
    })
    newdata = JSON.parse(newdata)
    res.json(newdata);
  })
})

// To get book with an id
app.get('/api/v1/book/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dataPath, 'utf-8', function(err, data){
    if(err){
      console.log(err);
    }
    data = JSON.parse(data);
    if(id > data[data.length-1].id){
      return res.json({ msg: `book with id: ${id}, doesn't exist ` })
    }
    console.log(id)
    const requiredBook= data.find((item) => item.id==id );
    res.json(requiredBook);
  })
})

// to update a book
app.put('/api/v1/book/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dataPath, 'utf-8', function(err, data){
    if(err){
      console.log(err);
    }
    data = JSON.parse(data);
    if(id > data[data.length-1].id){
      return res.json({ msg: `book with id: ${id}, doesn't exist ` })
    }
    console.log(id)
    const updatedBook = {
      id,
      author: req.body.author,
      title: req.body.title
    }
    data[id-1] = updatedBook;
    const newData = JSON.stringify(data);
    fs.writeFile(dataPath, newData, function(err) {
      if(err){
        console.log(err);
      }
      else {
        console.log("Successfully written data");
      }
    })
    res.json(data);
  })
})

// to delete a book
app.delete('/api/v1/book/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dataPath, 'utf-8', function(err, data){
    if(err){
      console.log(err);
    }
    data = JSON.parse(data);
    if(id > data[data.length-1].id){
      return res.json({ msg: `book with id: ${id}, doesn't exist ` })
    }
    console.log(id)
    const requiredBooks = data.filter((item) => item.id!=id );
    const newData = JSON.stringify(requiredBooks);
    fs.writeFile(dataPath, newData, function(err) {
      if(err){
        console.log(err);
      }
      else {
        console.log("Successfully written data");
      }
    })
    res.json(requiredBooks);
  })
})

app.listen(5000, () => {
  console.log("connected to server ...");
})
