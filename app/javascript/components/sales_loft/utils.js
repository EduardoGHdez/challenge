/**
 * charactersFrequency: converts an arrays of chars to an Object with the unique characters as keys
 * and the frequency they are repeated as value.
 * @param {string[]} characters [eg: ["a", "b", "b"]] - An plain array with single chars
 * @return {Object}  [eg: {a: 1, b:2}] - An Object representing each unique character frequency
 */
export const charactersFrequency = (characters) => {
  return characters.reduce((dictionary, character) => {
    const isValidCharacter = character.length === 1 && character.match(/[a-z]/i);

    if(!isValidCharacter)
      return dictionary;

    if(character in dictionary) {
      dictionary[character] += 1;
    } else {
      dictionary[character] = 1;
    };

    return dictionary
  }, {});
}

