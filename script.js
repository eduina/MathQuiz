const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
let isDrawing = false;
let currentTool = 'pencil';
let currentColor = '#333';

function setTool(tool) {
    currentTool = tool;
}

function setColor() {
    currentColor = document.getElementById('colorPicker').value;
}

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
}

function draw(e) {
    if (!isDrawing) return;

    context.lineCap = 'round';
    context.strokeStyle = currentColor;

    switch (currentTool) {
        case 'pencil':
            context.lineWidth = 2;
            break;
        case 'brush':
            context.lineWidth = 5;
            break;
        case 'marker':
            context.lineWidth = 50;
            break;
        case 'eraser':
            context.strokeStyle = '#fff'; // Set color to white for eraser
            context.lineWidth = 100; // Increase width for better erasing
            break;
        case 'paintBucket':
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
            fillArea(x, y, currentColor);
            break;
        default:
            break;
    }

    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function fillArea(x, y, fillColor) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixelStack = [[x, y]];

    const targetColor = getPixelColor(x, y, imageData);
    if (targetColor === fillColor) return;

    while (pixelStack.length) {
        const newPos = pixelStack.pop();
        const x = newPos[0];
        let y = newPos[1];

        while (y-- >= 0 && getPixelColor(x, y, imageData) === targetColor);

        y++;
        let reachLeft = false;
        let reachRight = false;

        while (y < canvas.height && getPixelColor(x, y, imageData) === targetColor) {
            setPixelColor(x, y, fillColor, imageData);

            if (x > 0) {
                if (getPixelColor(x - 1, y, imageData) === targetColor && !reachLeft) {
                    pixelStack.push([x - 1, y]);
                    reachLeft = true;
                } else if (getPixelColor(x - 1, y, imageData) !== targetColor) {
                    reachLeft = false;
                }
            }

            if (x < canvas.width - 1) {
                if (getPixelColor(x + 1, y, imageData) === targetColor && !reachRight) {
                    pixelStack.push([x + 1, y]);
                    reachRight = true;
                } else if (getPixelColor(x + 1, y, imageData) !== targetColor) {
                    reachRight = false;
                }
            }

            y++;
        }
    }

    context.putImageData(imageData, 0, 0);
}

function getPixelColor(x, y, imageData) {
    const index = (y * imageData.width + x) * 4;
    return `rgba(${imageData.data[index]}, ${imageData.data[index + 1]}, ${imageData.data[index + 2]}, ${imageData.data[index + 3] / 255})`;
}

function setPixelColor(x, y, color, imageData) {
    const index = (y * imageData.width + x) * 4;
    const rgba = color.match(/\d+/g);
    imageData.data[index] = rgba[0];
    imageData.data[index + 1] = rgba[1];
    imageData.data[index + 2] = rgba[2];
    imageData.data[index + 3] = rgba[3] * 255;
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);


const btn = document.getElementById('btn');

btn.addEventListener('click', function onClick() {
  btn.style.backgroundColor = 'darkslategrey';
  btn.style.color = 'white';
});
