const express = require("express");
const multer = require("multer");
const exceljs = require("exceljs");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/download", upload.array("files"), (req, res) => {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("File Names");
    req.files.forEach((file, index) => {
      worksheet.getCell(index + 1, 1).value = file.originalname;
    });
    
    const filePath = path.join(__dirname, "file-names.xlsx");
    
    workbook.xlsx.writeFile(filePath)
      .then(() => {
        console.log("Excel file saved to", filePath);
        res.download(filePath, "file-names.xlsx");
      });
  });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
