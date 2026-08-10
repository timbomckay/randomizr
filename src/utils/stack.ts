import shuffle from "./shuffle";
import { getStorage } from "./storage";

let stack: string[] = [];
let data = getStorage();

function calculateAverage(arr: number[]) {
  if (arr.length === 0) return 0;

  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  const average = sum / arr.length;
  return Math.floor(average);
}

export function* stackGenerator() {
  // get latest storage
  data = getStorage();

  // get average number of items, but always keep at least one bowl: once most
  // profiles are drawn down the average rounds to 0, and `index % 0` is NaN,
  // which makes `bowls[NaN]` undefined. A malformed count parses to NaN, which
  // would poison the average and make Array(NaN) throw, so coerce those to 0.
  const counts = data.map((x) => parseInt(x.count) || 0);
  const avg = Math.max(1, calculateAverage(counts));

  // create arrays of average
  const bowls: string[][] = Array.from(Array(avg)).map(() => []);

  let index = 0;

  // shuffle profiles to randomize iteration
  shuffle(data as []).forEach(({ count, uid }) => {
    for (let i = 0; i < parseInt(count); i += 1) {
      bowls[index++ % avg].push(uid);
    }
  });

  stack = bowls
    // shuffle arrays
    .map((arr) => shuffle(arr as []))
    // flatten stack
    .flat();

  for (let i = 0; i < stack.length; i++) {
    yield stack[i];
  }
}
