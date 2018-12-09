// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
var defaultPath = document.getElementById("path");
var mkdirp = require('mkdirp');

function createFile()
{

  path = defaultPath;

  if(document.getElementById("path").value != "")
    path = document.getElementById("path").value;

  let content = "Some text to save into the file";
  let fileName = path + "/" + document.getElementById("tit").value + ".txt";

  console.log(fileName);

  if(document.getElementById("tit").value == "" || document.getElementById("text").value =="")
  {

    printMSG("Error, introduce todos los elementos necesarios.");

  }

  else
  {

    fs.writeFile(fileName, document.getElementById("text").value, (err) => {
      if(err){
        printMSG("Error al escribir el archivo.");
      }
      readFiles();

    });

  }

  document.getElementById("tit").value = "";
  document.getElementById("text").value = "";

  closeFile();

}


function readFiles()
{
  saveDirectory();
  let dirname = defaultPath;

  if(document.getElementById("path").value != "")
    dirname = document.getElementById("path").value;

  let listaFile = "";

  fs.readdir(dirname, function(err, filenames)
  {

    if (err) {

      onError(err);
      return;

    }

    filenames.sort();

    let i = 0;

    filenames.forEach(function(filename) {

      if(filename != "")
      {

        let id = "file" + i;
        let functionDel = "return deleteFile(this);";
        let functionEd = "return editFile(this);";

        listaFile += "<li><a class = "+ id +">" + filename + "</a>";
        if(filename.split(".")[1] == "txt")
          listaFile += "<a class="+ id +" href='#' onclick='" + functionDel + "'><span class='icon-cancel'></span></a>" +"<a> | </a>"+ "<a class="+ id +" href='#' onclick='" + functionEd + "'><span class='icon-pencil'></span> </a>"
        listaFile += "</li>";

        i += 1;

      }

    });

    if(i == 0)
    {

      document.getElementById("vacia").innerHTML = "<p>La carpeta esta vacia.</p>";
      document.getElementById("listaFile").innerHTML = listaFile;

    }
    else
    {

      document.getElementById("listaFile").innerHTML = listaFile;
      document.getElementById("vacia").innerHTML = "";

    }

  });
}


function deleteFile(filename)
{

  let dirname = defaultPath;

  if(document.getElementById("path").value != "")
    dirname = document.getElementById("path").value;

  let filePathAndName = dirname + "/" + document.getElementsByClassName(filename.className)[0].innerHTML;

  fs.unlink(filePathAndName, function (err)
  {

    console.log('File deleted!');
    readFiles();

  });
}


function editFile(filename)
{
  let dirname = defaultPath;

  if(document.getElementById("path").value != "")
    dirname = document.getElementById("path").value;

  let fileNameTxt = document.getElementsByClassName(filename.className)[0].innerHTML;
  let fileName = fileNameTxt.split(".")[0];
  let filePathAndName = dirname + "/" + fileNameTxt;
    console.log(filePathAndName);

  document.getElementById("tit").value = fileName;
  document.getElementById("tit").disabled = true;

  var content = "";

  fs.readFile(filePathAndName, function read(err, data)
  {
    if (err)
    {
        console.log("error");
    }

    content = data.toString();
    document.getElementById("text").value = content;


  });
}


function cleanFields()
{

  document.getElementById("tit").value = "";
  document.getElementById("text").value = "";

}


function createFolder()
{
  var path = document.getElementById("path2").value + "/" + document.getElementById("folderName").value;
  mkdirp(path, function(err) {
    if(err){
      printMSG("No se ha podido crear el directorio en el Path deseado.");
    }
  });

}

function printMSG(error)
{

  iconClose = "<a href='#' onclick='closeError();'><span class='icon-cancel'></span></a>";
  document.getElementById("error").innerHTML = error + iconClose;

}

function closeError()
{

  document.getElementById("error").innerHTML = "JLN&copy;";

}

function closeFile(){
    document.getElementById("tit").disabled = false;
    cleanFields();
}

function pull(){


    //Variable de string del principio y contador del while
    let file = "file";
    let i = 0;

    //Booleano para cuando lleguemos al final
    let end = false;
    let filename;

    //Paths y error
    let pathDrive, pathCifrado;
    let err = false;

    //Recorremos el listado de archivos hasta que no encontremos txt
    //y los copiamos
    fs.readFile('./options.json', (err, data) => {

      optionsJSON = JSON.parse(data);

      if (err)
      {

        printMSG("No se han podido abrir las opciones");
        return;

      }

      if(optionsJSON.hasOwnProperty('pathDrive'))
        pathDrive = optionsJSON.pathDrive;
      else
        err = true;

      if(optionsJSON.hasOwnProperty('pathCifrado'))
        pathCifrado = optionsJSON.pathCifrado;
      else
        err = true;

      console.log(pathDrive);
        fs.readdir(pathDrive, function(err, filenames)
        {

          if (err) {

            onError(err);
            return;

          }

          filenames.sort();

          let i = 0;

          while (!end && !err) {
            console.log(filenames[i]);
            if(filenames[i] == undefined){
              err = true;
              console.log("err");
            }
            else{
              copyFile(pathDrive+"/"+filenames[i], pathCifrado+"/"+filenames[i]);
            }
            i++;

          }

          printMSG("Se ha hecho pull correctamente.")
        });

    });


}

function push(){

  //Variable de string del principio y contador del while
  let file = "file";
  let i = 0;

  //Booleano para cuando lleguemos al final
  let end = false;
  let filename;

  //Paths y error
  let pathDrive, pathCifrado;
  let err = false;

  //Recorremos el listado de archivos hasta que no encontremos txt
  //y los copiamos
  fs.readFile('./options.json', (err, data) => {

    optionsJSON = JSON.parse(data);

    if (err)
    {

      printMSG("No se han podido abrir las opciones");
      return;

    }

    if(optionsJSON.hasOwnProperty('pathDrive'))
      pathDrive = optionsJSON.pathDrive;
    else
      err = true;

    if(optionsJSON.hasOwnProperty('pathCifrado'))
      pathCifrado = optionsJSON.pathCifrado;
    else
      err = true;

    console.log(pathCifrado);
      fs.readdir(pathCifrado, function(err, filenames)
      {

        if (err) {

          onError(err);
          return;

        }

        filenames.sort();

        let i = 0;

        while (!end && !err) {
          console.log(filenames[i]);
          if(filenames[i] == undefined || filenames[i].split(".")[1]!="txt"){
            err = true;
            console.log("err");
          }
          else{
            copyFile(pathCifrado+"/"+filenames[i], pathDrive+"/"+filenames[i]);
          }
          i++;

        }
        printMSG("Se ha hecho push correctamente.");
      });

  });



}
