import React from 'react';
import {shallow} from 'enzyme';
import Tag from '../components/Tag';

describe('<Tag />', () => {
    it('shallow render correctly', () => {
        expect(shallow(<Tag category=""/>))
    })
})