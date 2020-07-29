import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAppleAlt} from "@fortawesome/free-solid-svg-icons";

import {PropTypes} from "prop-types";

import './Score.css';

const score = props => {
    const scoreStyle = ['score-container', props.styleTemplateBoardSize]

    return (
        <div className={scoreStyle.join(' ')}>
            <h4 className={props.foodColor}>{props.score} <FontAwesomeIcon icon={faAppleAlt}/></h4>
        </div>
    );
}

score.propTypes = {
    score: PropTypes.number.isRequired,
    foodColor: PropTypes.string.isRequired,
    styleTemplateBoardSize: PropTypes.string.isRequired,
}

export default score;