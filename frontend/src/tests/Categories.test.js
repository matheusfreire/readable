import React from 'react';
import {shallow} from 'enzyme';
import Categories from '../components/Categories';

describe('<Categories />', () => {
    it('shallow render correctly', () => {
        expect(shallow(<Categories />))
    })
})