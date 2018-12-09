function start() {
  startDataBase();
  startCheckFolders();
}

function decryptAndEncryptAll(path, pathCifrado){

  console.log(path, pathCifrado);

  encryptAll(path);
  decryptAll(pathCifrado);

}

function encryptAll(path) {

  var dirname = path;

  fs.readdir(dirname, function(err, filenames)
  {

    if (err) {

      printMSG("Ha habido un error leyendo los directorios para encriptar.");
      return;
    }

    filenames.sort();

    let i = 0;
    console.log("Encrypt:");
    filenames.forEach(function(filename) {
      console.log(filename);
      if(filename.split(".")[1] == "txt") cifrater(filename);

    });
  });


}

function decryptAll(pathCifrado) {

  var dirname = pathCifrado;
  console.log("Se ha llamado a " + dirname);

  fs.readdir(dirname, function(err, filenames)
  {

    if (err) {

      mkdirp(dirname, function(err) {
      });

    }

    filenames.sort();

    let i = 0;
    console.log("Descencrypt:");
    filenames.forEach(function(filename) {
     console.log(filename);

     if(filename.split(".")[1] == "txt" && filename.split("-")[1] != "key.txt") decifrater(filename);

    });
  });


}

function startCheckFolders() {

  fs.readFile('./options.json', (err, data) => {

    optionsJSON = JSON.parse(data);

    if (err)
    {

      printMSG("No se han podido abrir las opciones");
      return;

    }

    if(optionsJSON.hasOwnProperty('path') && !fs.existsSync(optionsJSON.path)){
      mkdirp(optionsJSON.path, function(err) {
        if(err){
          printMSG("No se ha podido crear el directorio determinado por las opciones.");
          return;
        }
      });
    }
    else if(!optionsJSON.hasOwnProperty('path')){
      printMSG("No se ha encontrado la propiedad 'Path' de las opciones");
      return;
    }

    if(optionsJSON.hasOwnProperty('pathCifrado') && !fs.existsSync(optionsJSON.path)){
      mkdirp(optionsJSON.pathCifrado, function(err) {
        if(err){
          printMSG("No se ha podido crear el directorio determinado por las opciones.");
          return;
        }
      });
    }
    else if(!optionsJSON.hasOwnProperty('pathCifrado')){
      printMSG("No se ha encontrado la propiedad 'Path' de las opciones");
      return;
    }
    else if (optionsJSON.path == optionsJSON.pathCifrado) {
      printMSG("El path de archivos no puede ser igual que el path de cifrado");
      return;
    }

    readFiles();
  });

}
