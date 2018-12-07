var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

function startDataBase() {

  var optionsJSON;

  fs.readFile('./options.json', (err, data) => {

    optionsJSON = JSON.parse(data);

    if (err)
    {

      printMSG("No se han podido abrir las opciones");
      return;

    }

    if(optionsJSON.hasOwnProperty('path'))
      document.getElementById("path").value = optionsJSON.path;

      if(optionsJSON.hasOwnProperty('pathCifrado'))
        document.getElementById("pathCifrado").value = optionsJSON.pathCifrado;
  });

}

function saveDirectory(){
  var optionsJSON;
  fs.readFile('./options.json', (err, data) => {
    optionsJSON = JSON.parse(data);
    if (err)
    {

      printMSG("No se han podido abrir las opciones.");
      return;

    }

    if (document.getElementById("path").value != "") {

      if(optionsJSON.hasOwnProperty('path')){

        optionsJSON.path = document.getElementById("path").value;

        fs.writeFile('./options.json', JSON.stringify(optionsJSON, null, 4), (err) => {
          if(err){
            printMSG("Error al modificar las opciones.");
          }

        });

      }
      else{

        printMSG("Error en las opciones, no se encuentra la propiedad 'Path' en options.json");

      }
    }

    else {

      printMSG("Especifica un directorio.");
      return

    }



  });


}
