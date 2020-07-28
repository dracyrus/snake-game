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

