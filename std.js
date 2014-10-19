var fs = require('fs');

var file = __dirname + '/.gclone';

var std = {

  in: function(name, cb) {
    fs.exists(file, function (exists) {
      if(!exists) fs.writeFileSync(file);
    });
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) throw err;
      var lines = data.split('\n');
      var len = lines.length;
      while(len--) {
        if (!lines[len]) continue;
        var parts = lines[len].split(',');
        if (parts[0].toLowerCase() === name) {
          return cb(parts[1]);
        }
      }
      cb();
    });
  },

  out: function(name, url, remove, cb) {
    fs.exists(file, function (exists) {
      if(!exists) fs.writeFileSync(file);
    });
    var match = false;
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) throw err;
      var lines = data.split('\n');
      var len = lines.length;
      while(len--) {
        if (!lines[len]) continue;
        var parts = lines[len].split(',');
        if (parts[0] === name) {
          lines = lines[len];
          match = true;
          break;
        }
      }

      if (match) {
        var re = new RegExp(lines, 'g'); 
        var result;
        fs.readFile(file, 'utf8', function(err, data) {
          if (err) throw err;

          if (remove) {
            result = data.replace(re, '');
          } else {
            result = data.replace(re, name + ',' + url);
          }
          fs.writeFile(file, result, 'utf8', function(err, data) {
            if (err) throw err;
            cb();
          });
        });
      } else {
        var log = fs.createWriteStream(file, { 'flags': 'a' }); 
        log.write('\n' + name + ',' + url);
        cb();
      }
    });
  }
};

module.exports = std;
