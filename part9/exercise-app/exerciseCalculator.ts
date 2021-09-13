export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

// interface ExerciseValues {
//   days: Array<number>,
//   target: number
// }

// const parseArgs = (args: Array<string>): ExerciseValues => {
//   if (args.length < 4) {
//     throw new Error('not enough arguments');
//   }

//   const target = Number(args[2]);
//   if (isNaN(target)) {
//     throw new Error('arg not number');
//   }
//   const days: Array<number> = args.slice(3).map((arg) => {
//     const hours = Number(arg);
//     if (isNaN(hours)) {
//       throw new Error('arg not number');
//     }
//     return hours;
//   });

//   console.log(days);
  
//   return {
//     days: days,
//     target: target
//   };
// };

const ratingDescription: Array<string> = [
  'work harder next week',
  'not too bad but could be better',
  'great job!'
];

const calcRating = (averageHours: number, target: number): number => {
  if (averageHours >= target) {
    return 3;
  }
  if (averageHours/target >= 0.5) {
    return 2;
  }
  return 1;
};

export const calculateExercises = (dailyHours: Array<number>, target: number): Result => {
  if (!dailyHours || !target) {
    throw new Error('parameters missing');
  }
  let trainingDays = 0;
  const averageHours = dailyHours.reduce((total, current) => {
    if (isNaN(current)) {
      throw new Error('malformatted parameters');
    }
    if (current) {
      trainingDays++;
    }
    return total + current;
  }
  , 0) / dailyHours.length;

  const rating = calcRating(averageHours, target);
  
  return {
    periodLength: dailyHours.length,
    trainingDays: trainingDays,
    success: averageHours >= target,
    rating: rating,
    ratingDescription: ratingDescription[rating - 1],
    target: target,
    average: averageHours
  };
};

// try {
//   const { days, target } = parseArgs(process.argv);
//   console.log(calculateExercises(days, target));
// } catch (e) {
//   if (e instanceof Error) {
//     console.log('something went wrong: ', e.message);
//   }
// }