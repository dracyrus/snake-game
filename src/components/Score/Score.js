import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAppleAlt} from "@fortawesome/free-solid-svg-icons";

import './Score.css';
import {connect} from "react-redux";

const Score = props => {
    const {styleTemplate} = props;

    const scoreStyle = ['score-container', styleTemplate.board[1]]

    return (
        <div className={scoreStyle.join(' ')}>
            <h4 className={props.foodColor}>{props.score} <FontAwesomeIcon icon={faAppleAlt}/></h4>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        styleTemplate: state.config.styleTemplate,
    };
};

export default connect(mapStateToProps)(Score);