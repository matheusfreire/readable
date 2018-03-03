import React from 'react';
import {shallow, mount} from 'enzyme';
import PostForm from '../../components/PostForm';

describe('<PostForm />', () => {
    it('shallow render correctly', () => {
        expect(shallow(<PostForm />))
    })
})