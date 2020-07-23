import {useRef, useEffect} from 'react';

/**
 *
 * @param oldObject
 * @param updatedProperties
 */
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

/**
 *
 * @param value
 * @returns {undefined}
 */
export const usePrevious = value => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
};

/**
 *
 * @param callback
 * @param delay
 */
export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;

    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}


