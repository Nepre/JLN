// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//TODO poner etiqueta <aside>
//Prueba gitkraken
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
var defaultPath = "C:/apaso/";

function createFile(){
  path = defaultPath;
  if(document.getElementById("path").value != "") path = document.getElementById("path").value;
  let content = "Some text to save into the file";
  let fileName = path  + document.getElementById("tit").value + ".txt";

  console.log(fileName);

  if(document.getElementById("tit").value == "" || document.getElementById("text").value ==""){
    document.getElementById("error").innerHTML = "Error, introduce todos los elementos necesarios.";
  }
  else{
    document.getElementById("error").innerHTML = "";
    fs.writeFile(fileName, document.getElementById("text").value, (err) => {
      readFiles();
    });

  }
  document.getElementById("tit").value = "";
  document.getElementById("text").value = "";

}

function readFiles() {
  let dirname = defaultPath;
  if(document.getElementById("path").value != "") dirname = document.getElementById("path").value;
  let listaFile = "";
  fs.readdir(dirname, function(err, filenames) {
    console.log(filenames);
    if (err) {
      onError(err);
      return;
    }
    filenames.sort();
    let i = 0;
    filenames.forEach(function(filename) {
      //console.log("yeet
      if(filename != ""){
        let id = "file" + i;
        let functionDel = "return deleteFile(this);";
        let functionEd = "return editFile(this);";
        listaFile += "<li><a class = "+ id +">" + filename + "</a>";
        if(filename.split(".")[1] == "txt") listaFile += "<a class="+ id +" href='#' onclick='" + functionDel + "'><span class='icon-cancel'></span></a>" +"<a> | </a>"+ "<a class="+ id +" href='#' onclick='" + functionEd + "'><span class='icon-pencil'></span> </a>"
        listaFile += "</li>";
        i += 1;

      }

    });
    //console.log(listaFile);
    if(i == 0){
      document.getElementById("vacia").innerHTML = "<p>La carpeta esta vacia.</p>";
      document.getElementById("listaFile").innerHTML = listaFile;
    }
    else {
      document.getElementById("listaFile").innerHTML = listaFile;
      document.getElementById("vacia").innerHTML = "";
    }

  });
}

function deleteFile(filename){
  let dirname = defaultPath;
  if(document.getElementById("path").value != "") dirname = document.getElementById("path").value;
  let filePathAndName = dirname + document.getElementsByClassName(filename.className)[0].innerHTML;
  console.log(filePathAndName);
  fs.unlink(filePathAndName, function (err) {
    console.log('File deleted!');
    readFiles();
  });
}

function editFile(filename){
  let dirname = defaultPath;
  if(document.getElementById("path").value != "") dirname = document.getElementById("path").value;
  let fileNameTxt = document.getElementsByClassName(filename.className)[0].innerHTML;
  let fileName = fileNameTxt.split(".")[0];
  console.log(fileName);
  let filePathAndName = dirname + fileNameTxt;
  console.log(filePathAndName);
  document.getElementById("tit").value = fileName;
  var content = "";
  fs.readFile(filePathAndName, function read(err, data) {
    if (err) {
        throw err;
    }
    content = data.toString();
    document.getElementById("text").value = content;
  });
}

function cleanFields() {
  document.getElementById("tit").value = "";
  document.getElementById("text").value = "";
}
