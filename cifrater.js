// Archivo que se encarga de cifrar

var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
var defaultPath = "C:/apaso/";

function cifrater(){

  let dirname = defaultPath;

  if(document.getElementById("path").value != "")
    dirname = document.getElementById("path").value;

  let fileNameTxt = document.getElementsByClassName("file0")[0].innerHTML;
  let filePathAndName = dirname + "/" + fileNameTxt;
    console.log(filePathAndName);

  fs.readFile(filePathAndName, function read(err, data)
  {
    if (err)
    {
        console.log("error");
    }

    let file = data;
      console.log(file);


  });





}
