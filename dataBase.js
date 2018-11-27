var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

function startDataBase() {
  fs.readFile('./options.json', (err, data) => {
    if (err){
      document.getElementById("error").value = "No se han podido abrir las opciones";
      return;
    }
    console.log(JSON.parse(data).path);
    console.log(JSON.parse(data).theme);
  });
}
