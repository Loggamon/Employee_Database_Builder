const express = require("express");
const res = require("express/lib/response");
const mysql = require("mysql2");
const cTable = require("console.table");
//const inquirer = require("inquirer");
const sequelize = require("../config/connection");

function callDepts() {

    sequelize.query(`SELECT * FROM department;`, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
          const table = cTable.getTable(res.json({rows}));
              
          console.log(table);
    });         
}

module.exports = callDepts();