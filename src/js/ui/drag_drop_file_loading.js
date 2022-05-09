/*  Allow users to drag and drop saved Reeborg files onto the page. 
    At some point, should probably refactor the ondrop function, as it
    is very similar (nearly identical) to the function that runs when
    the load solution button is pressed. 
*/

function handleFileDrops() {    
    var dropArea = document.getElementById("dropArea");

    dropArea.ondragover = function(evt) {
    //   console.log("dragging")
      evt.preventDefault();        
    };

    dropArea.ondrop = function(evt) {
      evt.preventDefault();
      let droppedFileReader = new FileReader();

      droppedFileReader.onload = function(e) {
          let content, parts, target;
          switch(RUR.state.input_method) {
              case "python":
              case "javascript":
                  target = editor;
                  break;
              case "blockly-py":
              case "blockly-js":
                  target = RUR.blockly;
                  break;
              case "py-repl":
                  alert(RUR.translate(
                          "No solution can be loaded when using REPL (Py).")
                       );
                  return;
          }
          content = droppedFileReader.result;
          parts = content.split(RUR.library_separator());
          if (parts.length == 2) {
              library.setValue(parts[1]);
          }
          target.setValue(parts[0]);
          fileInput.value = '';
      };

      if (evt.dataTransfer.items) {
        file = evt.dataTransfer.files[0];
        // We assume that the file name has been saved with the default
        //    world name.py
        // where "world name" is the name of the corresponding world as
        // shown in the HTML select. We thus remove the .py extension
        // and try to load that world, for convenience.
        let worldToLoad = file.name.split(".")[0];
        
        // If student attempts to click the run button, but accidentally
        // drags the icon, the content of the editor will become gibberish
        // (the bytes of the png file). To avoid this, only load the file if 
        // it's file extension is .py or .js.
        let fileExtension = file.name.split(".")[1];
        
        if (fileExtension === "py" || fileExtension === "js") {
            let worldURL = RUR.world_selector.url_from_shortname(worldToLoad);
            if (worldURL !== undefined) {
                RUR.world_selector.set_url(worldURL);
            }
            RUR.reload();
            droppedFileReader.readAsText(file);
        }
      };
    };
};

$(document).ready(handleFileDrops);