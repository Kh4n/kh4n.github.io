window.onload = function(_) {
    link("parser_input", "parser_output", "oninput", parser_submit)
}

function convert(str) {
    str = str.replace(/ /g, "");
    return parser.parse(str);
}

function parser_submit(input, output) {
    output.innerHTML = ""
    if (input.value != "") {
        try {
            converted = convert(input.value)
            var display_output = document.createElement('p')
            display_output.innerHTML = converted
            var copy = document.createElement("button")
            copy.type = "button"
            copy.addEventListener('click', copyTextToClipboard(converted), true)
            copy.innerHTML = "Copy"
            output.appendChild(display_output)
            output.appendChild(copy)
        }
        catch (error) {
            var error_msg = document.createElement('p')
            error_msg.innerHTML = error
            output.appendChild(error_msg)
        }
    }
}