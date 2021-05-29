import React, { useState } from "react";

function PeopleList({ people }) {
  const peopleTable = () => (
    <table>
      <thead>
        <tr>
          <th> Name </th>
          <th> Email </th>
          <th> Job title </th>
        </tr>
      </thead>
      <tbody>
        { people.map(({ id, emailAddress, title, displayName }) =>
            <tr key={id.toString()}>
              <td><span>Name</span>{ displayName }</td>
              <td><span>Email</span>{ emailAddress }</td>
              <td><span>Job Title</span>{ title }</td>
            </tr>
        )}
      </tbody>
    </table>
  );

  const renderTable = {
    peopleTable: {
      title: "People",
      table: peopleTable
    },
  };

  const [tableToRender, setTableToRender] = useState("peopleTable");

  return (
    <section>
      <h1><b>{ renderTable[tableToRender].title }</b></h1>
      { renderTable[tableToRender].table() }
    </section>
  );
}

export default PeopleList;
