;
require("./../state.js");
var record_id = require("./../utils/record_id.js").record_id;

var watch_button = document.getElementById("watch-variables-btn");
record_id("watch-variables-btn");

toggle_watch_variables = function () {
    if (RUR.state.watch_vars) {
        RUR.state.watch_vars = false;
        $("#watch-variables-btn").addClass("blue-gradient");
        $("#watch-variables-btn").removeClass("reverse-blue-gradient");
        $("#watch-variables").html("");
        $("#Reeborg-watches").dialog("close");
    } else {
        RUR.state.watch_vars = true;
        $("#watch-variables-btn").addClass("reverse-blue-gradient");
        $("#watch-variables-btn").removeClass("blue-gradient");
        $("#watch-variables").html("");
        $("#Reeborg-watches").dialog("open");
    }
};
watch_button.addEventListener("click", toggle_watch_variables, false);
