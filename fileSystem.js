module.exports = function (){
  document.getElementById('yolo').innerHTML = "DENTRO";
  console.log("dentro");
  var remote = require('remote'); // Load remote compnent that contains the dialog dependency
  var dialog = remote.require('dialog'); // Load the dialogs component of the OS
  var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

  var app = require('electron').remote;
  var dialog = app.dialog;

  let content = "Some text to save into the file";
  let fileName = "C:/apaso/prueba1.txt";
  // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
  dialog.showSaveDialog((fileName) => {
      if (fileName === undefined){
          console.log("You didn't save the file");
          return;
      }

      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.writeFile(fileName, content, (err) => {
          if(err){
              alert("An error ocurred creating the file "+ err.message)
          }

          alert("The file has been succesfully saved");
      });
  });

}
