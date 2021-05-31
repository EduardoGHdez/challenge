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

/**
 * levenshteinSimilarityRatio: Calculates the similarity-ration between two words, based on the
 * Levenshtein model.
 * @param {string} wordA [eg: "Banana"]
 * @param {string} wordB [eg: "Bannana"]
 * @returns {number} SimilarityRation
 */
export const levenshteinSimilarityRatio= (wordA, wordB) => {
  const rowsSize = wordA.length + 1;
  const columnsSize = wordB.length + 1;

  const distanceMatrix = new Array(rowsSize).fill(0).map( row =>  new Array(columnsSize).fill(0));
  const costOfSubstitution = 2;

  // Initialize Matrix by filling indeces of each word.
  distanceMatrix.slice(1).forEach((row, index) => {
    distanceMatrix[index + 1][0] = index + 1;
    distanceMatrix[0][index + 1] = index + 1;
  });

  // Compute the cost of deletions,insertions or substitutions
  for (let rowIndex = 1; rowIndex < rowsSize; rowIndex++) {
    for (let columnIndex = 1; columnIndex < columnsSize; columnIndex++){
      const cost = (wordA[rowIndex - 1] == wordB[columnIndex - 1]) ? 0 : costOfSubstitution;

      distanceMatrix[rowIndex][columnIndex] = Math.min(
        distanceMatrix[rowIndex - 1][columnIndex] + 1, // Cost of Deletion
        distanceMatrix[rowIndex][columnIndex - 1] + 1, // Cost of Insertion
        distanceMatrix[rowIndex - 1][columnIndex - 1] + cost, // Cost of Substitution
      );
    }
  }

  const distance = distanceMatrix[rowsSize - 1][columnsSize -1];

  return (wordA.length + wordB.length - distance) / (wordA.length + wordB.length)
}
