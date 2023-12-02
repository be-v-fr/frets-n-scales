function init() {
    renderFretboard(REL_TUNINGS['guitar']['standard'], 'e');
}

function renderFretboard(tuning, root) {
    renderFrets(tuning); // Z-Index 2 - Strings im Hintergrund, Z-Index 1
    renderTuning(tuning, root);
}

function renderFrets(tuning) {
    const fretboard = document.getElementById('fretboard');
    const numberOfStrings = tuning.length;
    fretboard.innerHTML = '';
    for (let i = 0; i < numberOfStrings; i++) { // Index für Zeile bzw. Saite
        fretboard.innerHTML += fretboardRowHtml(i);
    }
}

function renderTuning(tuning, root) {
    const numberOfStrings = tuning.length;
    const absTuning = getAbsTuning(tuning, root);
    for (let i = 0; i < numberOfStrings; i++) { // Index für Zeile bzw. Saite
        const row = numberOfStrings - 1 - i;
        const container = document.getElementById(`row${row}column0`);
        container.innerHTML = absTuning[i];
    }
}

function renderScale(root, intervals) {

}

function fretboardRowHtml(index) {
    let html = `<tr id="row${index}">`;
    for (let j = 0; j < 13; j++) { // Index für Spalte bzw. Bund
        html += `<td id="row${index}column${j}"></td>`;
    }
    html += `</tr>`;
    return html;
}