const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const resizeCanvas = () => {
    const container = document.querySelector('.drawing-board');
    const toolbarWidth = document.getElementById('toolbar').offsetWidth;
    const size = Math.min(window.innerWidth - toolbarWidth - 40, window.innerHeight - 40);
    canvas.width = size;
    canvas.height = size;
};

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let isPainting = false;
let lineWidth = 10;
let startX;
let startY;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const getPointerPosition = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    const y = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
    return {
        x: x - rect.left,
        y: y - rect.top
    };
};

const draw = (e) => {
    if (!isPainting) {
        return;
    }
    e.preventDefault();
    
    const { x, y } = getPointerPosition(e);
    
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
};

const startPainting = (e) => {
    isPainting = true;
    const { x, y } = getPointerPosition(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
};

const endPainting = () => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
};

canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', endPainting);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', startPainting);
canvas.addEventListener('touchend', endPainting);
canvas.addEventListener('touchmove', draw);

// Prevent scrolling when touching the canvas
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });


var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}