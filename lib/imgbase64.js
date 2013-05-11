var fs = require("fs");
var path = require("path");
var imgToBase64;

exports.imgToBase64 = imgToBase64 = function(imgPath, callback) {
  fs.readFile(imgPath, function(err, data) {
    callback(err, err ? null : data.toString("base64"));
  });
};

exports.imgToDataProtocol = function(imgPath, callback) {
  imgToBase64(imgPath, function(err, b64) {
    callback(err, err ? null :
      "data:image/" + path.extname(imgPath).slice(1) + ";base64," + b64);
  });
};
