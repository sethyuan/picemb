#!/usr/bin/env node

var nomnom = require("nomnom");
var img = require("../lib/imgbase64.js");
var fs = require("fs");

var args = nomnom
  .script("picemb")
  .options({
    imgpath: {
      position: 0,
      required: true,
      help: "Image to convert to data protocol."
    },
    version: {
      abbr: "V",
      flag: true,
      callback: function() {return "picemb " + require("../package.json").version;},
      help: "Show version"
    }
  }).parse();

img.imgToDataProtocol(args.imgpath, function(err, text) {
  if (err) return console.error(err);
  console.log(text);
});
