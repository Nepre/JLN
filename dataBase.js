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

    let error = false;

    if(optionsJSON.hasOwnProperty('path'))
      document.getElementById("path").value = optionsJSON.path;
      else {
        printMSG("Error encontrando el path en opciones.");
        error = true;
      }

    if(optionsJSON.hasOwnProperty('pathCifrado'))
      document.getElementById("pathCifrado").value = optionsJSON.pathCifrado;
    else {
      printMSG("Error encontrando el pathCifrado en opciones.");
      error = true;
    }

    //decryptAndEncryptAll(optionsJSON.path, optionsJSON.pathCifrado);
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



function setRSA(RSAPub, RSAPriv) {
  var optionsJSON;
  fs.readFile('./options.json', (err, data) => {
    optionsJSON = JSON.parse(data);
    if (err)
    {
      printMSG("No se han podido abrir las opciones para obtener la RSA.");
      return;
    }
    optionsJSON = JSON.parse(data);

    if(optionsJSON.hasOwnProperty('RSAPub') && optionsJSON.hasOwnProperty('RSAPriv')){
      optionsJSON.RSAPub = RSAPub;
      optionsJSON.RSAPriv = RSAPriv;

      fs.writeFile('./options.json', JSON.stringify(optionsJSON, null, 4), (err) => {
        if(err){
          printMSG("Error al modificar las opciones.");
        }

      });
    }
  });
}

function getRSA() {
  var optionsJSON;
  var data = fs.readFileSync('./options.json');
  optionsJSON = JSON.parse(data);
  if(optionsJSON.hasOwnProperty('RSAPub') && optionsJSON.hasOwnProperty('RSAPriv')){
    var RSArray = [optionsJSON.RSAPub, optionsJSON.RSAPriv];
  }
  else {
    printMSG("Hay un problema en el sistema de opciones, vuelva a restaurarlo a base.");
    var RSArray = [-1, -1];
  }

  return RSArray;
}


function copyFile(src, dest) {

  let readStream = fs.createReadStream(src);

  readStream.once('error', (err) => {
    console.log(err);
  });

  readStream.once('end', () => {
    console.log('done copying');
  });

  readStream.pipe(fs.createWriteStream(dest));
}
