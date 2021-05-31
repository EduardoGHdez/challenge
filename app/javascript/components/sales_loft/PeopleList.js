import React, { useState } from "react";
import { charactersFrequency, levenshteinSimilarityRatio } from "./utils";

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

  const possibleDuplicates = () => {
    const minSimilarityRatio = 0.9;

    const groupedEmails = people.reduce((groupedEmails, { emailAddress: currentEmail }) => {
      const didFindGroup = groupedEmails.find((emailGroup) => {
        if (emailGroup.find((email) => levenshteinSimilarityRatio(email, currentEmail) > minSimilarityRatio)) {
          emailGroup.push(currentEmail);
          return true;
        }

        return false;
      });

      if (!didFindGroup) {
        groupedEmails.push([currentEmail]);
      }

      return groupedEmails;
    }, []);

    return (
      <ul id="possibleDuplicatedEmails">
        { groupedEmails.filter((group) => group.length > 1).map((emailGroup) => (
          <li key={emailGroup[0]}>{ emailGroup.join(", ") }</li>
        ))}
      </ul>
    )
  }

  const renderTable = {
    peopleTable: {
      title: "People",
      table: peopleTable
    },
    charactersCountTable: {
      title: "Unique Characters Count",
      table: charactersCountTable
    },
    possibleDuplicates: {
      title: "Possible Duplicated Emails",
      table: possibleDuplicates
    }
  };

  const [tableToRender, setTableToRender] = useState("peopleTable");
  const showCharactersCountTable = () => setTableToRender("charactersCountTable");
  const showPeopleTable = () => setTableToRender("peopleTable");
  const showDuplicatedEmails = () => setTableToRender("possibleDuplicates");

  return (
    <section>
      <nav className="action-buttons">
        <button id="showPeople" onClick={ showPeopleTable }> People </button>
        <button id="showCharacters" onClick={ showCharactersCountTable }> Unique Characters Count </button>
        <button id="showDuplicatedEmails" onClick={ showDuplicatedEmails }> Possible Duplicated Emails </button>
      </nav>
      <h1><b>{ renderTable[tableToRender].title }</b></h1>
      { renderTable[tableToRender].table() }
    </section>
  );
}

export default PeopleList;
