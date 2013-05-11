#!/usr/bin/env node

var nomnom = require("nomnom");
var img = require("../lib/imgbase64.js");
var fs = require("fs");

var PROGNAME = require("../package.json").name;

var args = nomnom
  .script(PROGNAME)
  .options({
    htmlfile: {
      position: 0,
      required: true,
      help: "HTML file with img tags."
    },
    output: {
      position: 1,
      required: true,
      help: "Output file."
    },
    version: {
      abbr: "V",
      flag: true,
      callback: function() {
        return PROGNAME + " " + require("../package.json").version;
      },
      help: "Show version and quit."
    }
  })
  .parse();

try {
  var html = fs.readFile(args.htmlfile, "utf8", _);
  var outStream = fs.createWriteStream(
      args.output, {flags: "w+", encoding: "utf8"});
  var imgCrit = /(<img [^\/]*src=)(?:(["'])([^"']+)(["']))/g;
  var res, offset = 0;
  while ((res = imgCrit.exec(html)) != null) {
    outStream.write(html.substring(offset, res.index));
    outStream.write(res[1]);
    outStream.write(res[2]);
    outStream.write(img.imgToDataProtocol(res[3], _));
    outStream.write(res[4]);
    offset = imgCrit.lastIndex;
  }
  outStream.end(html.substring(offset));
} catch (e) {
  console.error(e.message);
}
