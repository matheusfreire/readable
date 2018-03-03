import React from 'react';
import {shallow} from 'enzyme';
import SideMenu from '../components/SideMenu';

describe('<SideMenu />', () => {
    it('shallow render correctly', () => {
        expect(shallow(<SideMenu />))
    })
})