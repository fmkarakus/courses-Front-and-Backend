'use strict'

const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const config = require('../config');
const DATA_DIR = path.join(__dirname, '..', 'data', 'courses.json');

function validateCourse(course){
  const schema = Joi.object({ name: Joi.string() .min(3) .required() });
  return schema.validate(course);
}

const controllers = {
  hello: (req, res) => {
    console.log('hello')
    res.json({ api: 'courses!' });
  },

// GET METHOD
listFiles:(req, res, next) => {
  console.log('get files')
  fs.readFile(DATA_DIR, 'utf8', (err, data) => {
    console.log('list files')
      if (err) {
        next(err);
        return;
      }
  
      res.send(JSON.parse(data));
  });
},

// POST METHOD
postFile:(req, res, next) => {
  console.log('post files')
  const { error } = validateCourse(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  fs.readFile(DATA_DIR, 'utf-8', (err, data) => {
      if (err)  return res.status(500).send(err.message);
      let courses = JSON.parse(data);

      let highestID=0
      for(const cor of courses){
        if (cor.id > highestID){
          highestID=cor.id
        }
      }
      const course = {
          id:highestID+1,
          name: req.body.name
      };
     
      courses.push(course);
      res.send(course);
      let newData = JSON.stringify(courses, null, 2);
      
      fs.writeFile(DATA_DIR, newData, (err) => {
        if (err) {
          next(err);
          return;
        }
          console.log('Data written to file');
      });
  });
},

//PUT METHOD
editFile: (req, res, next) => {
  console.log('edit files')
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    fs.readFile(DATA_DIR, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err.message);
        let courses = JSON.parse(data);
        const course =courses.find(c => c.id === parseInt(req.params.id));

        if(!course) res.status(404).send('The course with the given ID was not found!');
        course.name=req.body.name;
        res.send(course);
        
        let updatedData = JSON.stringify(courses, null, 2);
        
        fs.writeFile(DATA_DIR, updatedData, (err) => {
          if (err) {
            next(err);
            return;
          }
            console.log('File is updated');
        });
    })
},

//Delete METHOD
deleteFile: (req, res, next) => {
  console.log('delete files')
  fs.readFile(DATA_DIR, 'utf-8', (err, data) => {
      if (err) return res.status(500).send(err.message);
      let courses = JSON.parse(data);

      const course =courses.find(c => c.id === parseInt(req.params.id));

      if(!course) res.status(404).send('The course with the given ID was not found!');
      const index = courses.indexOf(course);
      courses.splice(index, 1);

      res.send(course);
      
      let updatedData = JSON.stringify(courses, null, 2);
      
      fs.writeFile(DATA_DIR, updatedData, (err) => {
        if (err) {
          next(err);
          return;
        }
          console.log('File is deleted');
      });
  })



}
};

module.exports = controllers;
