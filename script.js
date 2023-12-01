function init() {
    renderFretboard(REL_TUNINGS['guitar']['standard']);
}

function renderFretboard(tuning) {
    renderFrets(tuning); // Z-Index 2 - Strings im Hintergrund, Z-Index 1
    renderTuning(tuning);
}

function renderFrets(tuning) {
    const fretboard = document.getElementById('fretboard');
    fretboard.innerHTML = '';
    for (let i = 0; i < tuning.length; i++) {
       fretboard.innerHTML += fretboardRowHtml(i);
    }
}

function renderTuning(tuning) {

}

function renderScale(root, intervals) {

}

function fretboardRowHtml(index) {
    let html = `<tr id="row${index}">`;
    for (let j = 0; j < 13; j++) {
        html += `<td id="row${index}column${j}"></td>`; 
    }
    html += `</tr>`;
    return html;
}