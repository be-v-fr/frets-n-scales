// Default-Parameter
const DEF_TUNING = ['guitar', 'standard', 'e'];
const DEF_SCALE = ['diatonic', 'major', 'c'];

// globale Variablen
let currentTuning = getAbsoluteNotes(REL_TUNINGS[DEF_TUNING[0]][DEF_TUNING[1]], DEF_TUNING[2]);
let currentScale = getAbsoluteNotes(REL_SCALES[DEF_SCALE[0]][DEF_SCALE[1]], DEF_SCALE[2]);

function init() {
    renderNav();
    renderFretboard();
    renderScale();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderNav() {
    const tuning = document.getElementById('navTuning');
    const scale = document.getElementById('navScale');
    tuning.innerHTML = '';
    tuning.innerHTML += `${capitalizeFirstLetter(DEF_TUNING[0])}: `;
    tuning.innerHTML += `${capitalizeFirstLetter(DEF_TUNING[1])} `;
    tuning.innerHTML += `${capitalizeFirstLetter(DEF_TUNING[2])}`;
    scale.innerHTML = '';
    scale.innerHTML = `${capitalizeFirstLetter(DEF_SCALE[2])} `;
    scale.innerHTML += `${DEF_SCALE[1]} (${DEF_SCALE[0]})`;
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
        for (let j = 0; j < 12; j++) { // Index für Bund
            const absNote = getAbsoluteNotes([j], absFret0);
            const column = j + 1;
            const fretJ = document.getElementById(`row${row}column${column}`);
            fretJ.innerHTML = '';
            if (currentScale.includes(absNote[0])) {
                fretJ.innerHTML = noteHtml(absNote, j);
            }
        }
        const container = document.getElementById(`row${row}column0`);
        container.innerHTML = currentTuning[i];
    }
}

function fretboardRowHtml(index) {
    let html = `<tr id="row${index}">`;
    for (let j = 0; j < 13; j++) { // Index für Spalte bzw. Bund
        html += `<td id="row${index}column${j}" class="column${j}"></td>`;
    }
    html += `</tr>`;
    return html;
}

function noteHtml(absNote, fret) {
    let html = `<p class="note`;
    if (fret == 0) {
        html += ` fret0Note`;
    } else {
        if (absNote == currentScale[0]) {
            html += ` rootNote`;
        }
    }
    html += `">${absNote}</p>`;
    return html;
}