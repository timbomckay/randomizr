import shuffle from "./shuffle";
import { getStorage } from "./storage";

let stack: string[] = [];
let data = getStorage();

function calculateAverage(arr: number[]) {
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  const average = sum / arr.length;
  return Math.floor(average);
}

export function* stackGenerator() {
  // get latest storage
  data = getStorage();

  // get average number of items
  const avg = calculateAverage(data.map((x) => parseInt(x.count)));

  // create arrays of average
  const bowls = Array.from(Array(avg)).map(() => []);

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
