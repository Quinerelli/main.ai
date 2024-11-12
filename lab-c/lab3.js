let map = L.map('map', { zoomControl: false }).setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

document.getElementById('locateBtn').addEventListener('click', getUserLocation);

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup("Twoja lokalizacja")
                .openPopup();
            map.setView([latitude, longitude], 16);
        });
    } else {
        alert("Geolokalizacja nie jest wspierana w tej przeglądarce.");
    }
}

document.getElementById('downloadMapBtn').addEventListener('click', createSnapshot);

function createSnapshot() {
    const canvas = document.getElementById('snapshotCanvas');
    const ctx = canvas.getContext('2d');
    const controls = document.querySelector('.leaflet-control-container');
    controls.style.display = 'none';

    leafletImage(map, function (err, imageCanvas) {
        if (err) {
            console.error("Błąd podczas generowania obrazu mapy:", err);
            return;
        }

        canvas.width = 300;
        canvas.height = 300;
        ctx.drawImage(imageCanvas, 0, 0, canvas.width, canvas.height);

        controls.style.display = 'block';
        createPuzzle(imageCanvas);
    });
}

function createPuzzle(snapshotCanvas) {
    const puzzleBoard = document.getElementById('puzzleBoard');
    const solutionBoard = document.getElementById('solutionBoard');
    puzzleBoard.innerHTML = "";
    solutionBoard.innerHTML = "";
    const pieceSize = 75;
    const pieces = [];

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.style.backgroundImage = `url(${snapshotCanvas.toDataURL()})`;
            piece.style.backgroundPosition = `-${x * pieceSize}px -${y * pieceSize}px`;
            piece.draggable = true;
            piece.dataset.correctPosition = `${x},${y}`;

            piece.addEventListener('dragstart', dragStart);
            piece.addEventListener('dragend', dragEnd);

            pieces.push(piece);
        }
    }

    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach(piece => puzzleBoard.appendChild(piece));

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            const cell = document.createElement('div');
            cell.classList.add('puzzle-cell');
            cell.dataset.position = `${x},${y}`;
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('drop', drop);
            solutionBoard.appendChild(cell);
        }
    }

    puzzleBoard.addEventListener('dragover', dragOver);
    puzzleBoard.addEventListener('drop', dropBackToPuzzleBoard);
}

let draggedPiece = null;

function dragStart(e) {
    draggedPiece = this;
    setTimeout(() => this.style.visibility = "hidden", 0);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const targetCell = e.target;

    if (targetCell.classList.contains('puzzle-cell') && draggedPiece) {
        if (targetCell.firstChild) {
            targetCell.firstChild.style.visibility = "visible";
            targetCell.removeChild(targetCell.firstChild);
        }
        targetCell.appendChild(draggedPiece);
        draggedPiece.style.visibility = "visible";
        checkWinCondition();
    }
}

function dropBackToPuzzleBoard(e) {
    e.preventDefault();
    if (draggedPiece) {
        if (draggedPiece.parentElement && draggedPiece.parentElement.classList.contains('puzzle-cell')) {
            draggedPiece.parentElement.removeChild(draggedPiece);
        }
        document.getElementById('puzzleBoard').appendChild(draggedPiece);
        draggedPiece.style.visibility = "visible";
    }
}

function dragEnd() {
    this.style.visibility = "visible";
}

function checkWinCondition() {
    const cells = document.querySelectorAll('.puzzle-cell');
    let isComplete = true;

    cells.forEach(cell => {
        const piece = cell.firstChild;
        if (piece && cell.dataset.position !== piece.dataset.correctPosition) {
            isComplete = false;
        } else if (!piece) {
            isComplete = false;
        }
    });

    if (isComplete) {
        console.log("Gratulacje! Puzzle zostały poprawnie ułożone.");
        alert("Gratulacje! Ułożyłeś wszystkie puzzle!");
    }
}

