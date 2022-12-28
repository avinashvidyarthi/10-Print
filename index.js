const canvas = document.getElementById('theCanvas');
const canvasOuterDiv = document.getElementById('canvasOuterDiv');
const spacingSlider = document.getElementById('spacingControlRange');
const delaySlider = document.getElementById('delayControlRange');
const randomSlider = document.getElementById('randomControlRange');
const spacingOutput = document.getElementById('spacingOutput');
const delayOutput = document.getElementById('delayOutput');
const randomOutput = document.getElementById('randomOutput');
const startBtn = document.getElementById('startBtn');

let currentX = 0;
let currentY = 0;
let spacing = Number(spacingSlider.value);
let delay = Number(delaySlider.value);
let isRunning = false;
let randomization = 0.5;

function drawForwardSlash() {
	const canvasContext = canvas.getContext('2d');
	canvasContext.beginPath();
	canvasContext.strokeStyle = 'white';
	canvasContext.moveTo(currentX + spacing, currentY);
	canvasContext.lineTo(currentX, currentY + spacing);
	canvasContext.stroke();
	canvasContext.closePath();
	currentX += spacing;
}

function drawBackwardSlash() {
	const canvasContext = canvas.getContext('2d');
	canvasContext.beginPath();
	canvasContext.strokeStyle = 'white';
	canvasContext.moveTo(currentX, currentY);
	canvasContext.lineTo(currentX + spacing, currentY + spacing);
	canvasContext.stroke();
	canvasContext.closePath();
	currentX += spacing;
}

function round(n) {
	// Smaller multiple
	let a = parseInt(n / spacing, 10) * spacing;
	// Larger multiple
	let b = a + spacing;
	// Return of closest of two
	return n - a > b - n ? b : a;
}

function resizeCanvas() {
	canvas.width = round(canvasOuterDiv.offsetWidth * 0.95);
	canvas.height = round(window.innerHeight * 0.75);
}

function startDrawing() {
	let i = 0;
	let noOfIteration = (canvas.height / spacing) * (canvas.width / spacing);

	function draw() {
		if (Math.random() > randomization) {
			drawBackwardSlash();
		} else {
			drawForwardSlash();
		}
		if (currentX >= canvas.width) {
			currentX = 0;
			currentY += spacing;
		}
		if (i++ < noOfIteration) {
			setTimeout(draw, delay);
		} else {
			stoppedDrawing();
		}
	}
	draw();
}

function stoppedDrawing() {
	isRunning = false;
	startBtn.disabled = false;
	startBtn.innerText = 'Start';
	startBtn.style.cursor = 'pointer';
	spacingSlider.disabled = false;
	delaySlider.disabled = false;
    randomSlider.disabled = false;
}

function setSpacing() {
	spacing = Number(spacingSlider.value);
	setSpacingOutput();
}

function setSpacingOutput() {
	spacingOutput.innerHTML = spacing;
}

function setDelay() {
	delay = Number(delaySlider.value);
	setDelayOutput();
}

function setDelayOutput() {
	delayOutput.innerHTML = delay;
}

function setRandomization() {
    randomization = Number(randomSlider.value);
    setRandomOutput();
}

function setRandomOutput() {
    randomOutput.innerHTML = randomization;
}

spacingSlider.addEventListener('input', setSpacing);
spacingSlider.addEventListener('change', setSpacing);
delaySlider.addEventListener('input', setDelay);
delaySlider.addEventListener('change', setDelay);
randomSlider.addEventListener('input', setRandomization);
randomSlider.addEventListener('change', setRandomization);
startBtn.onclick = () => {
    currentX = 0;
    currentY = 0;
	if (!isRunning) {
		isRunning = true;
		startBtn.disabled = true;
		startBtn.innerText = 'running...';
		startBtn.style.cursor = 'not-allowed';
		spacingSlider.disabled = true;
		delaySlider.disabled = true;
        randomSlider.disabled = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
		resizeCanvas();
		startDrawing();
	}
};

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
setSpacingOutput();
setDelayOutput();
setRandomOutput();
