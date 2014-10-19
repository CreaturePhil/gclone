var fs = require('fs');

var file = __dirname + '/.gclone';

var std = {

  /**
   * in - Reads a file and returns the repo.
   * @name: Name of the repo or variable.
   * @cb: Callback called that returns the repo if found.
   *
   * Example: 
   *    std.in('underscore', function(repo) {
   *      if (!repo) // handle error 
   *      // do something with the repo
   *    });
   */
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

  /**
   * out - Writes to a file.
   * @name: Variable name.
   * @url: The name of the repository.
   * @remove: If the variable name should be remove or not.
   * @cb: Callback
   *
   * Example: 
   *    std.out('markus', 'creaturephil/markus', false, function() {
   *      // do something
   *    });
   */
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
