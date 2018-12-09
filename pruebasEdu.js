
function pruebaUInt(){

  //Path
  var path = "C:/apaso/cifrados/";

  //Creamos el array y la key de AES
  var array = new Uint16Array(10);
  var mes = crypto.getRandomValues(array).toString();
  var key = pbkdf2.pbkdf2Sync( mes , 'salt', 1, 256 / 8, 'sha512');
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

  //Log key
  console.log("La key: ");
  console.log(key);
  console.log("El aesCtr: ");
  console.log(aesCtr);

  //Creamos el mensaje y lo pasamos a bytes
  var message = "Me gustan los trenes";
  var textBytes = aesjs.utils.utf8.toBytes(message);
  console.log("El mensaje: " + message);
  console.log("Text bytes: " + textBytes);

  //Ciframos el mensaje
  var encryptedBytes = aesCtr.encrypt(textBytes);
  console.log("EncriptedBytes: " + encryptedBytes);


  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  console.log("Texto encriptado: " + encryptedHex);


  //Asumimos que conseguimos el texto encriptado y lo pasamos a bytes
  encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
  console.log("EncryptedBytes: " + encryptedBytes);
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);
  console.log("DecryptedBytes: " + decryptedBytes);
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  var message2= decryptedText.toString();
  console.log("Mensaje desencriptado: " + message2);


}
