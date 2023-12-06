let startY = null;

function scrollListMouse(event) {
    let list = eval(this.id); // erhalte JSON-Array aus ID
    if (checkMouseScrollDirectionIsUp(event)) {
        scrollListUp(list, 1);
    } else {
        scrollListUp(list, -1);
    }
}

function checkMouseScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}

function scrollListTouchStart(event) {
    startY = event.touches[0].clientY;
}

function scrollListTouchMove(event) {
    if (startY !== null) {
        let list = eval(this.id);
        // Berechne die Änderung der Y-Koordinate
        const touchDeltaY = event.touches[0].clientY - startY;

        // Hier kannst du die Logik für nach oben oder unten scrollen implementieren
        if (touchDeltaY > 10) {
            // Nach unten scrollen
            scrollListUp(list, 1);
        } else if (touchDeltaY < -10) {
            // Nach oben scrollen
            scrollListUp(list, -1);
        }

        // Aktualisiere die Startposition für das nächste touchmove-Ereignis
        startY = event.touches[0].clientY;
    }
}

function scrollListTouchEnd() {
    // Setze die Startposition zurück, wenn das Touch-Ereignis endet
    startY = null;
}

function scrollListUp(list, steps) { // PARAMETER BEARBEITEN
    if (checkScrollingAllowed(list, steps)) {
        const length = list['data'].length;
        list['focus'] += steps;
        while (list['focus'] < 0) {
            list['focus'] += length;
        }
        list['focus'] %= length;
        moveList(list, steps);
        setTimeout(renderList, 200, list);
    }
}

function checkScrollingAllowed(list) {
    const length = list['data'].length;
    if (length < 5) { // unvollständige Liste
        if (
            (list['focus'] == 0 && steps < 0) || // am oberen Rand der Liste und nach oben
            (list['focus'] == (length - 1) && steps > 0) // am unteren Rand der Liste und nach unten
        ) {
            return false; // kein Scrolling
        }
    }
    return true;
}

function moveList(list, steps) {
    for (let i = 0; i < 7; i++) {
        const itemId = list['id'] + 'li' + i;
        const listItem = document.getElementById(`${itemId}`);
        listItem.style.transform = `translateY(calc(-20px * ${steps}))`;
        moveListItemClass(list, i, steps);
    }
}

function moveListItemClass(list, listItemIndex, steps) {
    const itemId = list['id'] + 'li' + listItemIndex;
    const listItem = document.getElementById(`${itemId}`);
    let newIndex = listItemIndex - steps;
    if (newIndex < 0) {
        newIndex += 7;
    } else {
        newIndex %= 7;
    }
    listItem.classList.add(`listItem${newIndex}`);
    listItem.classList.remove(`listItem${listItemIndex}`);
}