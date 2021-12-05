import { shuffle } from "lodash";

type Histogram = { [key: string]: number };

export const createRandomPairGenerator = (
  shuffleArray = shuffle
): {
  histogram: Histogram;
  generator: (list: string[]) => Array<string>[];
} => {
  const histogram: Histogram = {};
  const recordPair = (pair: any[]) => {
    const key = pair[0] + " and " + pair[1];
    if (!histogram[key]) histogram[key] = 0;
    histogram[key] += 1;
  };

  const generator = (list: string[]) => {
    const randomisedList = shuffleArray(list);
    const out = [];
    for (let i = 0; i < randomisedList.length - 1; i += 1) {
      const pair = [randomisedList[i], randomisedList[i + 1]];
      out.push(pair);
      recordPair(pair);
    }
    const lastPair = [
      randomisedList[randomisedList.length - 1],
      randomisedList[0],
    ];
    out.push(lastPair);
    recordPair(lastPair);
    return out;
  };
  return { histogram, generator };
};
