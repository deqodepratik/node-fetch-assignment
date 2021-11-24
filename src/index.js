import axios from "axios";
import { Buffer } from "buffer";
import express from "express";
import { writeFile } from "fs";
import { get } from "lodash";
import moment from "moment";
// import fetch from "node-fetch";

const app = express();

app.use(express.json());

// getting the data from the external server
app.get("/", async (req, res) => {
  try {
    const date = moment().format("YYYY-MM-DD");

    const response = await axios.get(
      "http://dummy.restapiexample.com/api/v1/employee/1"
    );

    const data = response.data;

    const id = get(data, "data.id");
    const name = get(data, "data.employee_name");
    const salary = get(data, "data.employee_salary");
    const age = get(data, "data.employee_age");

    // const text = `The employee name is ${name} and salary is ${salary} and age is ${age}`;

    const dataText = new Uint8Array(
      Buffer.from(
        `The employee name is ${name} and salary is ${salary} and age is ${age}`
      )
    );

    const fileName = `${date}_employee_${id}.txt`;

    writeFile(fileName, dataText, (err) => {
      if (err) throw err;
      // here the file is written successfully
    });

    res.json({
      msg: "File created successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3300, () => {
  console.log("Server listening");
});
