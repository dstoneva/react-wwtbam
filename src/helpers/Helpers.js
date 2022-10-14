export const pickRandomElement = (arr) => {
  let element = arr[Math.floor(Math.random() * arr.length)];

  return element;
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export function getRandomIntBetweenValues(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function addToCertainValue(max, count) {
  const results = [];
  let currSum = 0;
  for (let i = 0; i < count; i++) {
    results.push(Math.random());
    currSum += results[i];
  }
  for (let i = 0; i < results.length; i++) {
    results[i] = Math.round((results[i] / currSum) * max);
  }
  return results;
}
