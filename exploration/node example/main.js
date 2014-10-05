global.$ = $;

var abar = require('address_bar');
var folder_view = require('folder_view');
var path = require('path');
var shell = require('nw.gui').Shell;

$(document).ready(function() {
  var folder = new folder_view.Folder($('#files'));
  var addressbar = new abar.AddressBar($('#addressbar'));

  folder.open(process.cwd());
  addressbar.set(process.cwd());

  folder.on('navigate', function(dir, mime) {
    if (mime.type == 'folder') {
      addressbar.enter(mime);
    } else {
      shell.openItem(mime.path);
    }
  });

  addressbar.on('navigate', function(dir) {
    folder.open(dir);
  });

  /**
  folder.ondrop = function(e){
    e.preventDefault();

    console.log("ON DROP");
    for (var i = 0; i < e.dataTransfer.files.length; ++i){
      console.log(e.dataTransfer.files[i].path);
    }
    return false;
  }
  **/
});


