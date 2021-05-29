import React from "react"

function PeopleList({ people }) {
  const peopleRows = people.map(({ id, emailAddress, title, displayName }) =>
    <tr key={id.toString()}>
      <td><span>Name</span>{ displayName }</td>
      <td><span>Email</span>{ emailAddress }</td>
      <td><span>Job Title</span>{ title }</td>
    </tr>
  );

  return (
    <section>
      <h1><b>People</b></h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
         { peopleRows }
        </tbody>
      </table>
    </section>
  );
}

export default PeopleList
