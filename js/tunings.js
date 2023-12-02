const REL_TUNINGS = {
    guitar: {
        'standard': [0, 5, 10, 15, 19, 24],
        'drop': [0, 7, 12, 17, 21, 26]
    }
};

function getAbsTuning(tuning, root) {
    let absTuning = [];
    const relRoot = getNoteIndex(root, 'default');
    for (let i = 0; i < tuning.length; i++) {
        const interval = tuning[i];
        const relNote = intervalToRelNote(relRoot, interval);
        const absNote = NOTES[relNote]['default'];
        absTuning.push(absNote);
    }
    return absTuning;
}