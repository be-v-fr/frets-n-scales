let instruments = {
    id: 'instrument',
    data: [],
    focus: 0
};

let relTunings = {
    id: 'relTuning',
    data: [],
    focus: 0
};

let tuningRoots = {
    id: 'tuningRoot',
    data: [],
    focus: 0
};

let scaleCategories = {
    id: 'scaleCategory',
    data: [],
    focus: 0
};

let scaleRoots = {
    id: 'scaleRoot',
    data: [],
    focus: 0
};

let relScales = {
    id: 'relScale',
    data: [],
    focus: 0
};

function initNavTuning() {
    instruments['data'] = Object.keys(REL_TUNINGS);
    for (let i = 0; i < NOTES.length; i++) {
        const note = NOTES[i]['default'];
        tuningRoots['data'].push(note);
    }
    updateRelTunings();
    addListeners(instruments);
    addListeners(relTunings);
    addListeners(tuningRoots);
}

function renderNavTuning() {
    renderList(instruments);
    renderList(relTunings);
    renderList(tuningRoots);    
}

function updateRelTunings() {
    const focus = instruments['focus'];
    const instrument = instruments['data'][focus]; // aktuelles Instrument bestimmen
    relTunings['data'] = Object.keys(REL_TUNINGS[instrument]); // Instrument legt Optionen für rel. Tunings fest
    relTunings['focus'] = 0; // Fokus zurücksetzen
    // GGF. NOCH FUNKTION FÜR TUNING-ROOTS UPDATE ERGÄNZEN, UM BEI NEUER STIMMUNG ABSOLUTE STANDARDSTIMMUNG AUSZUWÄHLEN (EVTL. STANDARDNOTE ZU REL_TUNINGS ERGÄNZEN)
}

function addListeners(list) {
    const listElement = document.getElementById(`${list['id']}`);
    listElement.addEventListener('wheel', scrollListMouse);
    listElement.addEventListener('touchstart', scrollListTouchStart);
    listElement.addEventListener('touchmove', scrollListTouchMove);
    listElement.addEventListener('touchend', scrollListTouchEnd);
}

function renderList(list) { // Übergabeparameter ID und ggf. Array hinzufügen
    const listElement = document.getElementById(`${list['id']}`);
    const length = list['data'].length;
    listElement.innerHTML = '';
    for (let i = 0; i < 7; i++) { // Laufindex bis 7, da im Vorfeld zwei unsichtbare Listeneinträge gerendert werden, um die Scroll-Animation weicher zu gestalten
        let dataIndex = list['focus'] - 3 + i; // Liste wird von oben nach unten gerendert, Fokus liegt aber mittig
        if (length >= 5) { // ermöglicht zyklisches Scrollen
            while (dataIndex < 0) {
                dataIndex += length;
            }
            dataIndex %= length;
            listElement.innerHTML += liHtml(list, i, dataIndex);
        } else {
            if(dataIndex < 0 || dataIndex >= length) {
                listElement.innerHTML += liHtml(list, i, -1);
            } else {
                listElement.innerHTML += liHtml(list, i, dataIndex);
            }
        }
    }
}

function handleListClick(id, dataIndex) {
    let list = eval(id);
    const length = list['data'].length;
    let steps = dataIndex - list['focus'];
    if (steps == 0) { // mittiger Klick
        // do stuff or nothing
    } else {
        if (steps > 2) {
            steps -= length;
        } else {
            if (steps < -2) {
                steps += length;
            }
        }
        scrollListUp(list, steps);
    }
}

function liHtml(list, listIndex, dataIndex) {
    const itemId = list['id'] + 'li' + listIndex;
    let html = `<li id="${itemId}" class="listItem${listIndex} preventSelect">`;
    if (dataIndex >= 0) { // für leere Felder wurde dataIndex = -1 übergeben
        const listItem = list['data'][dataIndex];
        html += `<button onclick="handleListClick(${list['id']}, ${dataIndex})">${listItem}</button>`;
    }
    html += `</li>`;
    return html;
}