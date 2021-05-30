import React from "react";
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import PeopleList from "./PeopleList";

const mockedPeople = [
  { id: 1, emailAddress: "homer.simpson@gmail.com", displayName: "Homer Simpson", title: "Sr. Software Engineer" },
  { id: 2, emailAddress: "bart.simpson@gmail.com", displayName: "Bart Simpson", title: "Software Engineer" },
  { id: 3, emailAddress: "lisa.simpson@gmail.com", displayName: "Lisa Simpson", title: "Tech Lead" }
];

describe("<PeopleList />", () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<PeopleList people={mockedPeople} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders people table in first load', () => {
    const wrapper = mount(<PeopleList people={ mockedPeople } />);

    expect(wrapper.find("table#people").length).toBe(1);
  });

  it('renders 2 buttons', () => {
    const wrapper = mount(<PeopleList people={ mockedPeople } />);

    expect(wrapper.find("button").length).toBe(2);
  });

  it("renders characters-count-list when 'Unique Characters Count' is clicked", () => {
    const wrapper = mount(<PeopleList people={ mockedPeople } />);

    // Initial load
    expect(wrapper.find('table#people').length).toBe(1);

    wrapper.find('button#showCharacters').simulate('click');

    // People table is no longer shown
    expect(wrapper.find('table#people').length).toBe(0);
    // It shows characters table
    expect(wrapper.find('table#characters').length).toBe(1);
  });
});
