import React from 'react';
import CourseForm from './CourseForm';
import {shallow} from 'enzyme';

function renderCourseForm(args) {
    const defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };
    const props = { ...defaultProps, ...args};
    return shallow(<CourseForm {...props} />);
}

it("render form and header", () => {
    const Wrapper = renderCourseForm();
    expect(Wrapper.find('form').length).toBe(1);
    expect(Wrapper.find('h2').text()).toEqual("Add Course");
})

it('labels save buttons as "save" when not saving', () => {
    const Wrapper = renderCourseForm();
    expect(Wrapper.find("button").text()).toEqual("Save")
})

it('labels save buttons as "saving..." when  saving', () => {
    const Wrapper = renderCourseForm({saving: true});
    expect(Wrapper.find("button").text()).toEqual("Saving...")
})