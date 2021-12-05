import { standardDeviation, mean, sum } from "@/lib/array-math";
import { createRandomPairGenerator } from "@/RandomPairGenerator";

const noOpShuffle = (list: string[]) => list;
const reverse = (list: string[]) => list.reverse();

describe("Random Pair Generator", () => {
  it("should create a expected set of pairs for even inputs", () => {
    const { generator } = createRandomPairGenerator(noOpShuffle);
    expect(generator(["a", "b", "c", "d"])).toEqual([
      ["a", "b"],
      ["b", "c"],
      ["c", "d"],
      ["d", "a"],
    ]);
  });
  it("should create a expected set of pairs for odd inputs", () => {
    const { generator } = createRandomPairGenerator(noOpShuffle);
    expect(generator(["a", "b", "c", "d", "e"])).toEqual([
      ["a", "b"],
      ["b", "c"],
      ["c", "d"],
      ["d", "e"],
      ["e", "a"],
    ]);
  });
  it("should invoke injected shuffle as expected", () => {
    const { generator } = createRandomPairGenerator(reverse);
    expect(generator(["a", "b", "c", "d", "e"])).toEqual([
      ["e", "d"],
      ["d", "c"],
      ["c", "b"],
      ["b", "a"],
      ["a", "e"],
    ]);
  });
  it("should return expected histogram after each invocation", () => {
    const { histogram, generator } = createRandomPairGenerator(noOpShuffle);
    generator(["a", "b", "c", "d"]);
    expect(histogram).toEqual({
      "a and b": 1,
      "b and c": 1,
      "c and d": 1,
      "d and a": 1,
    });
    generator(["a", "b", "c", "d"]);
    expect(histogram).toEqual({
      "a and b": 2,
      "b and c": 2,
      "c and d": 2,
      "d and a": 2,
    });
  });
  it("should have no large variance in random number generator", () => {
    const runCount = 1e5;
    const optionCount = 2;
    const randomNumbers: number[] = Array(runCount)
      .fill(0)
      .map(() => Math.floor(Math.random() * optionCount));
    const histogram = randomNumbers.reduce(
      (histogram: { [key: string]: number }, randomNumber: number) => {
        histogram[randomNumber] += 1;
        return histogram;
      },
      Array(optionCount)
        .fill(0)
        .reduce((histogram, v, i) => {
          histogram[i] = 0;
          return histogram;
        }, {})
    );
    const bins = Object.values(histogram);
    const binsMean = mean(bins);
    expect(binsMean).toBe(runCount / optionCount);
    const percentageDeviationFromMean = standardDeviation(bins) / binsMean;

    expect(percentageDeviationFromMean).toBeLessThan(0.01);
  });
  it("should not show a bias with default shuffle", () => {
    const { histogram, generator } = createRandomPairGenerator();
    const count = 1e5;
    const list = ["a", "b", "c", "d", "e", "f"];
    for (let i = 0; i < count; i += 1) generator(list);
    const bins = Object.values(histogram);
    expect(sum(bins)).toBe(count * list.length);

    const binMean = mean(bins);
    // Make sure the expected number of runs have been made
    expect(binMean).toBe(sum(bins) / (list.length * (list.length - 1)));
    // I used the 0.01 from the test to ensure that this randomness is no worse than Math.random
    expect(standardDeviation(bins) / binMean).toBeLessThan(0.01);
  });
});
