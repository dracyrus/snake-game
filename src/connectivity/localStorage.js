export const loadState = () => {
    try {
        let serializedState = localStorage.getItem('snake-game');
        serializedState = new Buffer.from(serializedState, 'base64').toString('utf8');

        if (serializedState === null) return undefined;

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        let serializedState = JSON.stringify(state);
        serializedState = new Buffer(serializedState).toString('snake-game');
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Ignore write errors.
    }
};
