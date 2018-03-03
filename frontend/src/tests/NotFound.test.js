import React from 'react';
import {shallow} from 'enzyme';
import NotFound from '../components/NotFound';

describe('<NotFound />', () => {
    it('shallow render correctly', () => {
        expect(shallow(<NotFound />))
    })
})