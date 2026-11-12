const INPUT_KEYS = {
    "up" : ["w", "ArrowUp"],
    "down" : ["s", "ArrowDown"],
    "left" : ["a", "ArrowLeft"],
    "right" : ["d", "ArrowRight"],
}

let keysDown = {};

window.onkeyup = function (e) {
    keysDown[e.key] = false;
};

window.onkeydown = function (e) {
    keysDown[e.key] = true;
};

function isKeyDown(key) {
    return keysDown[key];
}

function isInputted(input) {
    return INPUT_KEYS[input].some((key) => isKeyDown(key));
}