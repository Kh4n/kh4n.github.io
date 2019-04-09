window.onload = function(e) {
    link("parser_input", "parser_output", "oninput", parser_submit)
}

function convert(str) {
    str = str.replace(/ /g, "");
    try {
        ret = parser.parse(str);
    } catch (error) {
        ret = error
    }
    return ret
}

function parser_submit(input, output) {
    if (input.value != "")
        output.innerHTML = convert(input.value)
    else
        output.innerHTML = ""
}