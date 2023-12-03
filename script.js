// Default-Werte
let currentTuning = getAbsoluteNotes(REL_TUNINGS['guitar']['standard'], 'e');
let currentScale = getAbsoluteNotes(REL_SCALES['diatonic']['major'], 'c');

function init() {
    renderFretboard();
    renderScale();
}

function updateTuning(relTuning, root) {
    currentTuning = getAbsoluteNotes(relTuning, root);
}

function updateScale(relScale, root) {
    currentScale = getAbsoluteNotes(relScale, root);
}

function renderFretboard() {
    renderFrets(); // Z-Index 2 - Strings im Hintergrund, Z-Index 1
    renderTuning();
}

function renderFrets() {
    const fretboard = document.getElementById('fretboard');
    const numberOfStrings = currentTuning.length;
    fretboard.innerHTML = '';
    for (let i = 0; i < numberOfStrings; i++) { // Index für Zeile bzw. Saite
        fretboard.innerHTML += fretboardRowHtml(i);
    }
}

function renderTuning() {
    const numberOfStrings = currentTuning.length;
    for (let i = 0; i < numberOfStrings; i++) { // Index für Zeile bzw. Saite
        const row = numberOfStrings - 1 - i;
        const container = document.getElementById(`row${row}column0`);
        container.innerHTML = currentTuning[i];
    }
}

function renderScale() {
    const numberOfStrings = currentTuning.length;
    for (let i = 0; i < numberOfStrings; i++) { // Index für Zeile bzw. Saite
        const row = numberOfStrings - 1 - i;
        const absFret0 = currentTuning[i];
        // const relFret0 = getNoteIndex(absFret0, 'default'); 
        for (let j = 0; j < 12; j++) {
            const absNote = getAbsoluteNotes([j], absFret0);
            const column = j + 1;
            const fretJ = document.getElementById(`row${row}column${column}`);
            fretJ.innerHTML = '';
            if(currentScale.includes(absNote[0])) {
                fretJ.innerHTML = noteHtml(absNote);
            }
        }
        const container = document.getElementById(`row${row}column0`);
        container.innerHTML = currentTuning[i];
    }
}

function fretboardRowHtml(index) {
    let html = `<tr id="row${index}">`;
    for (let j = 0; j < 13; j++) { // Index für Spalte bzw. Bund
        html += `<td id="row${index}column${j}"></td>`;
    }
    html += `</tr>`;
    return html;
}

function noteHtml(absNote) {
    let html = `<p class="note`;
    if(absNote == currentScale[0]) {
        html += ` rootNote`
    }
    html += `">${absNote}</p>`;
    return html;
}