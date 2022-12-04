const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const employeeModel = require("./models/employees")

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://rikimata30:legendkurama3010@cluster0.mrvq3t5.mongodb.net/Assignment01?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
    }
);

app.post("/insert", async (req, res) => {

    const fName = req.body.fName;
    const lName = req.body.lName;
    const gender = req.body.gender;
    const salary = req.body.salary;

    const employ = new employeeModel({
        first_name: fName,
        last_name: lName,
        gender: gender,
        salary: salary
    })

    try {
        await employ.save();
        res.send("Employee Data  Inserted");
    }catch(err){
        console.log(err)
    }
});

app.get("/read", async (req, res) => {
    employeeModel.find({}, (err, result) => {
        if (err){
            res.send(err);
        }

        res.send(result);
    })
});

app.put("/update", async (req, res) => {

    const id = req.body.id;
    const newFName = req.body.newFName;
    const newLName = req.body.newLName;
    const newGender = req.body.newGender;
    const newSalary = req.body.newSalary;

    try {
        await employeeModel.findById(id, (err, updatedEmployee) =>{
            updatedEmployee.first_name = newFName,
            updatedEmployee.last_name = newLName,
            updatedEmployee.gender = newGender,
            updatedEmployee.salary = newSalary
            updatedEmployee.save();
            res.send("Updated")
        });
    }catch(err){
        console.log(err)
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    
    await employeeModel.findByIdAndRemove(id).exec();
    res.send("Deleted")
})



app.listen(3001, ()=> {
    console.log('Server Running on Port 3001....')
})