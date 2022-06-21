//Constants
const INITIAL_SIZE = 16;
const INITIAL_BACKGROUND = "#FFFFFF";
const INITIAL_COLOR = "#000000";
const INITIAL_MODE = "COLOR";

//HTML Elements
const canvas = document.getElementById("canvas");
const inputColor = document.getElementById("inputColor");
const backgroundColor = document.getElementById("backgroundColor");
const colorButton = document.getElementById("colorButton");
const rainbowButton = document.getElementById("rainbowButton");
const eraserButton = document.getElementById("eraserButton");
const resetButton = document.getElementById("resetButton");
const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");

inputColor.oninput = (e) => setPaintColor(e.target.value);
backgroundColor.oninput = (e) => reloadCanvas(e.target.value);
colorButton.onclick = () => setPaintMode("COLOR");
rainbowButton.onclick = () => setPaintMode("RAINBOW");
eraserButton.onclick = () => setPaintMode("ERASER");
resetButton.onclick = () => reloadCanvas("#FFFFFF");
sizeSlider.onmousemove = (e) => setSizeValue(e.target.value);
sizeSlider.onchange = (e) =>setCanvasSize(e.target.value);

//Variables
let currentBackgroundColor = INITIAL_BACKGROUND;
let currentColor = INITIAL_COLOR;
let currentMode = INITIAL_MODE;
let currentSize = INITIAL_SIZE

//Detect Click and Drag Action
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


//Functions
function setPaintColor(newColor) {
    currentColor = newColor;
}

function reloadCanvas(color) {
    canvas.innerHTML = ''; //Clear old contents
    currentBackgroundColor = color;
    createCanvas(currentSize, color);
}

function setPaintMode(newMode) {
    currentMode = newMode;
}

function setSizeValue(newValue) {
    sizeValue.innerHTML = `${newValue} x ${newValue}`;
}

function setCanvasSize(newSize) {
    currentSize = newSize;
    reloadCanvas(currentBackgroundColor);
}

function createCanvas(size, color) {
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const grids = document.createElement("div");
        grids.classList.add("single-grid");
        grids.style.backgroundColor = color;
        grids.addEventListener('mouseover', paintColor)
        grids.addEventListener('mousedown', paintColor)
        canvas.appendChild(grids);
    }    
}

function paintColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === "COLOR") {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === "RAINBOW") {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    } else if (currentMode === "ERASER") {
        e.target.style.backgroundColor = "#FFFFFF";
    }
}

window.onload = () => {
    createCanvas(INITIAL_SIZE, INITIAL_BACKGROUND);
};
