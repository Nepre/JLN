// Archivo que se encarga de cifrar

var fs = require('fs');  // Load the File System to execute our common tasks (CRUD)
var cryptico = require('cryptico');
var aesjs = require('aes-js');
var pbkdf2 = require('pbkdf2');
var defaultPath = "C:/apaso/";
var path = "C:/apaso/cifrados/";

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
    // document.getElementById("error").innerHTML = file;

    // Creamos la key de RSA
    var gen = Math.random().toString();
    var PassPhrase = gen;
    var Bits = 1024;

    var RSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
    console.log(RSAkey);

    // Creamos la key publica
    var PublicKeyString = cryptico.publicKeyString(RSAkey);
    console.log(PublicKeyString);

    var message = file.toString();
    //Ciframos
    var mes = Math.random().toString();
    var key = pbkdf2.pbkdf2Sync( mes , 'salt', 1, 256 / 8, 'sha512');
    console.log(key);
    var textBytes = aesjs.utils.utf8.toBytes(message);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptedHex);
    var message2 = encryptedHex.toString();

    let fileName = path + fileNameTxt;
    console.log(fileName);
    fs.writeFile(fileName, message2, (err) => {
      if(err){
        printMSG("Error al escribir el archivo.");
      }
      console.log("Todo ok");
    });

    var res = cryptico.encrypt(key.toString() , PublicKeyString);
    var txt = res.cipher.toString();
    let fileName3 = path + "prueba.txt";
    console.log(fileName3);
    fs.writeFile(fileName3, txt, (err) => {
      if(err){
        printMSG("Error al escribir el archivo.");
      }
      console.log("Todo ok");
    });
    fileName3 = path + "prueba1.txt";
    fs.writeFile(fileName3, RSAkey, (err) => {
      if(err){
        printMSG("Error al escribir el archivo.");
      }
      console.log("Todo ok");
    });
    console.log(txt);
  });
}

function decifrater(){

  let dirname = path;

  if(document.getElementById("path").value != "")
    dirname = document.getElementById("path").value;

  let fileNameTxt = document.getElementsByClassName("file0")[0].innerHTML;
  let filePathAndName = dirname + "/cifrados/" + fileNameTxt;
    console.log(filePathAndName);

  fs.readFile(filePathAndName, function read(err, data)
  {
    if (err)
    {
        console.log("error");
    }
    let file = data;
    var encryptedHex = file.toString();
    //Desciframos
    filaNameTxt = "prueba.txt";
    filePathAndName = dirname + "/cifrados/" + fileNameTxt;
    fs.readFile(filePathAndName, function read(err, data)
    {
      if (err)
      {
          console.log("error");
      }
      let file1 = data;
      filaNameTxt = "prueba1.txt";
      filePathAndName = dirname + "/cifrados/" + fileNameTxt;
      fs.readFile(filePathAndName, function read(err, data)
      {
        if (err)
        {
            console.log("error");
        }
        let file2 = data;
        console.log(file1);
        console.log(file2);
        let uno = file1.toString();
        let dos = file2.toString();
        console.log(uno);
        console.log(dos);
      //  var DecryptionResult = cryptico.decrypt(uno,dos);
      //  console.log(DecryptionResult);
        var key;
        var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        console.log(decryptedText);
        var message3= decryptedText.toString();
        let fileName2 = path + "Holades.txt";
        console.log(fileName2);
        fs.writeFile(fileName2, message3, (err) => {
          if(err){
            printMSG("Error al escribir el archivo.");
          }
          console.log("Todo ok");
        });
      });
    });
  });
}
