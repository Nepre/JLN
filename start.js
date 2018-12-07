function start() {
  startDataBase();
  startCheckFolders();
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
