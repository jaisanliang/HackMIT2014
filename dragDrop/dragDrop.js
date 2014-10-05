//$(document).ready(function() {

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    items = evt.dataTransfer.items;
    var length = evt.dataTransfer.items.length;
    var output = [];

    for (var i = 0; i < length; i++) {
      f = items[i];
      var entry = evt.dataTransfer.items[i].webkitGetAsEntry();
      //entry.copyTo(temporaryFs.root, entry.name, successCallback, errorCallback);

      if (entry.isFile) {
        output.push('<li><strong> file: ', escape(entry.name), '</strong> (', f.type || 'n/a', ') - ',
                  entry.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
        //showFileEntry(entry)
        console.log(entry);
      } else if (entry.isDirectory) {
        //traverseDirectoryTree(entry);
        console.log(entry);
      }
    }

      //var item = files[i].webkitGetAsEntry();

      // var reader = new FileReader();
      // reader.onload = function(e) {
      //   var text = reader.result;
      //   console.log(text);
      // }

      // //reader.readAsText(files[i]);
      // reader.readAsDataURL(files[i]);

    
      //console.log(item);
      //if (item) {
      //  traverseFileTree(item);
      //}



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
