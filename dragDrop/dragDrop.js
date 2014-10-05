//$(document).ready(function() {

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    items = evt.dataTransfer.items;
    var length = evt.dataTransfer.items.length;
    var output = [];
    console.log(items);

    for (var i = 0; i < length; i++) {
      f = items[i];
      console.log(f);
      var entry = items[i].webkitGetAsEntry();
      console.log(entry.filesystem.root);
      if (entry) {
         traverseFileTree(entry);
      }
      // if (entry.isFile) {
      //   output.push('<li><strong> file: ', escape(entry.name), '</strong> (', f.type || 'n/a', ') - ',
      //             f.size, ' bytes, last modified: ',
      //             f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
      //             '</li>');
      //   //showFileEntry(entry)

      // } else if (entry.isDirectory) {
      //   var dirReader = entry.createReader();
      //   dirReader.readEntries(function(entries) {
      //     for (var i=0; i<entries.length; i++) {
      //       traverseFileTree(entries[i], path + entry.name + "/");
      //     }
      //   });
      // }
    }

function traverseFileTree(item, path) {
  path = path || "";
  if (item.isFile) {
    console.log('hi');
    // Get file
    item.file(function(file) {
      console.log("File:", path + file.name);
    }, function(e) {console.log(e);});
  } else if (item.isDirectory) {
    // Get folder contents
    var dirReader = item.createReader();
    dirReader.readEntries(function(entries) {
      for (var i=0; i<entries.length; i++) {
        traverseFileTree(entries[i], path + item.name + "/");
      }
    });
  }
}


    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropzone = document.getElementById('dropzone');
  dropzone.addEventListener('dragover', handleDragOver, false);
  dropzone.addEventListener('drop', handleFileSelect, false);


//});
