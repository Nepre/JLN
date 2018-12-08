// Archivo que se encarga de cifrar

var fs = require('fs');  // Load the File System to execute our common tasks (CRUD)
var cryptico = require('cryptico');
var aesjs = require('aes-js');
var pbkdf2 = require('pbkdf2');
var defaultPath = "C:/apaso/";
var path = "C:/apaso/cifrados/";
var rsa;
var public;
  var arra = new Uint8Array(10);
  var PassPhrase = crypto.getRandomValues(arra);
  var Bits = 1024;
  rsa = cryptico.generateRSAKey(PassPhrase, Bits);
  console.log(rsa);
  // Creamos la key publica
  public = cryptico.publicKeyString(rsa);
  console.log(public);

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
    var message = file.toString();
    //Ciframos
    var array = new Uint8Array(10);
    var mes = crypto.getRandomValues(array).toString();
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
    var key2 = Decodeuint8arr(key);
    console.log(key2);
    var res = cryptico.encrypt(key2, public);
    console.log(res);
    var txt = res.cipher.toString();
    console.log(txt);
    var str = fileNameTxt.split(".")[0] + "-key.txt";
    let fileName3 = path + str ;
    console.log(fileName3);
    fs.writeFile(fileName3, txt, (err) => {
      if(err){
        printMSG("Error al escribir el archivo.");
      }
      console.log("Todo ok");
    });
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
    console.log(encryptedHex);
    //Desciframos
    var str = fileNameTxt.split(".")[0] + "-key.txt";
    var filePathAndName2 = dirname + "/cifrados/" + str;
    fs.readFile(filePathAndName2, function read(err, data)
    {
      if (err)
      {
          console.log("error");
      }
      let file1 = data;
      console.log(file1.toString());
      var DecryptionResult = cryptico.decrypt(file1.toString(), rsa);
      console.log(DecryptionResult);
      var key = Encodeuint8arr(DecryptionResult.plaintext);
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
}

function Decodeuint8arr(uint8array){
    return new TextDecoder("utf-8").decode(uint8array);
}

function Encodeuint8arr(myString){
    return new TextEncoder("utf-8").encode(myString);
}
