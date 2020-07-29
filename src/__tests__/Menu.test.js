import React from "react";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";
import Menu from "../components/Menu/Menu";

configure({adapter: new Adapter()})

describe('<Menu />', () => {
    let wrapper;
    it('should render faArrowAltCircleLeft icon when its in configuration mode', () => {
        wrapper = shallow(<Menu color='green' pathname='/configuration'/>);
        expect(wrapper.find(FontAwesomeIcon).prop('icon')).toBe(faArrowAltCircleLeft);
    });
});