// Initalization of Variables
var selected_language = document.getElementById("selected_language");
var selected_theme = document.getElementById("selected_theme"); 
var myCodeMirror = CodeMirror.fromTextArea(editor, {
    mode:  selected_language.value,
    matchBrackets: true,
    theme: selected_theme.value,
    lineNumbers: true
});
myCodeMirror.setSize("100%", 500);

// File Uploading Functionality
let file_input = document.getElementById("file-upload");
file_input.addEventListener ('change', () => {
    let files = file_input.files;
    if (files.length == 0) return;

    const file = files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        myCodeMirror.setOption("value", lines.join('\n'));
    };
    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
});


// File Saving Function
function saveLocally() {
    let inputValue = myCodeMirror.getValue();
    let file = new Blob([inputValue], {type: "text/plain;charset=utf-8"});
    let filename  = document.getElementById("fileName").value;
    {
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

// Theme Change Function
function themeChange() {
    selected_theme = document.getElementById("selected_theme");
    myCodeMirror.setOption("theme", selected_theme.value);
}

// Language Change Function
function languageChange() {
    selected_language = document.getElementById("selected_language");
    myCodeMirror.setOption("mode", selected_language.value);
}