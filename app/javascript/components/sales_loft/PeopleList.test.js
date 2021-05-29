import React from "react";
import renderer from 'react-test-renderer';

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
});
