const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type : String
    },
    gender: {
        type: String
    },
    salary: {
        type: Number
    }
})

const Employees = mongoose.model('employees', EmployeeSchema);
module.exports = Employees;
//employees