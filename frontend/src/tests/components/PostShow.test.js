import React from 'react';
import {shallow, mount} from 'enzyme';
import PostShow from '../../components/PostShow';

describe('<PostShow />', () => {
    it('shallow render correctly', () => {
        expect(shallow(<PostShow />))
    })
})