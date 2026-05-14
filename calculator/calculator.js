function getResult() {
    const input = document.getElementById("inputWord").value;
    const output = evaluate(input);
    document.getElementById("output").textContent = output;
}

function evaluate(string) {
    return tokenize(string)
    // return evaluateParsed(parse(tokenize(string)))
}

function tokenize(string) {
    string = string + " "
    const singles = ["(", ")", "+", "-", "*", "/", "^", "="];
    const tokens = [];
    let index = 0;
    let token_start_index = 0;
    let chr = string[index];
    while (index < string.length) {
        chr = string[index];
        if (singles.includes(chr)) {
            if (index > token_start_index) {
                tokens.push(string.substring(token_start_index, index));
            }
            tokens.push(chr);
            index++;
            token_start_index = index;
        } else if (chr == " ") {
            if (index > token_start_index) {
                tokens.push(string.substring(token_start_index, index));
            }
            index++;
            token_start_index = index;
        } else {
            index++;
        }
    }
    return tokens.join(", ")
    // return tokens
}

function parse(tokens) {
    function parse_from(index) {
        token = tokens[index];
        if (token == "(") {
            let 
        }
        return tokens
    }
    return tokens
}
