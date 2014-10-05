require(["../../../scripts/parser/parser"], function(Parser){
  var App = new Parser();
  console.log(App);
  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    items = evt.dataTransfer.items;
	files = evt.dataTransfer.files;
    var length = evt.dataTransfer.items.length;
    var output = [];
    console.log(items);
	
    for (var i = 0; i < length; i++) {
      f = files[i];
      var reader = new FileReader();
	  reader.onload = (function(theFile) {
        return function(e) {
		  var temp = e.target.result;
		  read = App.parse(temp);
		  console.log(read.getName());
        };
      })(f);
	  reader.readAsText(f);
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
	
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  function initiateDropzone(){
	var dropzone = document.getElementById('edit');
	dropzone.addEventListener('dragover', handleDragOver, false);
	dropzone.addEventListener('drop', handleFileSelect, false);
  }
  initiateDropzone();
});