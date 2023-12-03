const NOTES = [
    {
        default: 'a',
        sharp: 'gx',
        flat: 'bbb'
    },

    {
        default: 'a#',
        sharp: 'a#',
        flat: 'bb'
    },

    {
        default: 'b',
        sharp: 'ax',
        flat: 'cb'
    },
    
    {
        default: 'c',
        sharp: 'b#',
        flat: 'dbb'
    },
    
    {
        default: 'c#',
        sharp: 'c#',
        flat: 'db'
    },

    {
        default: 'd',
        sharp: 'cx',
        flat: 'ebb'
    },

    {
        default: 'd#',
        sharp: 'd#',
        flat: 'eb'
    },

    {
        default: 'e',
        sharp: 'dx',
        flat: 'fb'
    },

    {
        default: 'f',
        sharp: 'e#',
        flat: 'gbb'
    },

    {
        default: 'f#',
        sharp: 'ex',
        flat: 'gb'
    },

    {
        default: 'g',
        sharp: 'fx',
        flat: 'abb'
    },

    {
        default: 'g#',
        sharp: 'g#',
        flat: 'ab'
    },
];

function getNoteIndex(note, accidental) {
    note = note.toLowerCase();
    for (let i = 0; i < 12; i++) {
        if (NOTES[i][accidental] == note) {
            return i;
        }
    }
    return -1; // Fehler
}

function intervalToRelNote(start, interval) {
    while(start + interval < 0) {
        interval += 12;
    }
    return (start + interval) % 12; 
}

function getAbsoluteNotes(intervals, root) {
    let absolute = [];
    const relRoot = getNoteIndex(root, 'default');
    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        const relNote = intervalToRelNote(relRoot, interval);
        const absNote = NOTES[relNote]['default'];
        absolute.push(absNote.toUpperCase());
    }
    return absolute;
}