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
 * @param formInputs
 * @returns {[]}
 */
export const getFormElementsArray = formInputs => {
    const formElementsArray = [];

    for (let key in formInputs) {
        formElementsArray.push({
            id: key,
            config: formInputs[key]
        });
    }

    return formElementsArray;
};






