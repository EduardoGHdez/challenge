import React, { useState } from "react";
import { charactersFrequency } from "./utils";

function PeopleList({ people }) {
  const peopleTable = () => (
    <table id="people">
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

  const charactersCountTable = () => {
    const charactersList = people.map(
      ({ emailAddress }) => emailAddress.split("")
    ).flat();

    const uniqueCharactersCount = Object.entries(charactersFrequency(charactersList))
      .sort((a, b) => b[1] - a[1]);

    return (
      <table id="characters">
        <thead>
          <tr>
            <th> Character </th>
            <th> Count </th>
          </tr>
        </thead>
        <tbody>
          { uniqueCharactersCount.map((character) =>
              <tr key={character[0]}>
                <td><span>Character</span>{ character[0] }</td>
                <td><span>Count</span>{ character[1] }</td>
              </tr>
          )}
        </tbody>
      </table>
    )
  };

  const renderTable = {
    peopleTable: {
      title: "People",
      table: peopleTable
    },
    charactersCountTable: {
      title: "Unique Characters Count",
      table: charactersCountTable
    }
  };

  const [tableToRender, setTableToRender] = useState("peopleTable");
  const showCharactersCountTable = () => setTableToRender("charactersCountTable");
  const showPeopleTable = () => setTableToRender("peopleTable");

  return (
    <section>
      <nav className="action-buttons">
        <button id="showPeople" onClick={ showPeopleTable }> People </button>
        <button id="showCharacters" onClick={ showCharactersCountTable }> Unique Characters Count </button>
      </nav>
      <h1><b>{ renderTable[tableToRender].title }</b></h1>
      { renderTable[tableToRender].table() }
    </section>
  );
}

export default PeopleList;
