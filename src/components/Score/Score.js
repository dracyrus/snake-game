import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAppleAlt} from "@fortawesome/free-solid-svg-icons";

import './Score.css';

const score = props => {
    return (
        <div className="score-container">
            <h4 className={props.foodColor}>{props.score} <FontAwesomeIcon icon={faAppleAlt}/></h4>
        </div>
    );
}

export default score;