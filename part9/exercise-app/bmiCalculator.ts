export type bmiCategory = 
  'Underweight (Severe thinness)' |
  'Underweight (Moderate thinness)' |
  'Underweight (Mild thinness)' |
  'Normal (healthy weight)' |
  'Overweight (Pre-obese)' |
  'Obese (Class I)' |
  'Obese (Class II)' |
  'Obese (Class III)';

// interface BmiValues {
//   height: number,
//   weight: number
// }

// const parseBmiArgs = (args: Array<string>): BmiValues => {
//   if (args.length < 4) {
//     throw new Error('not enough args');
//   }
//   if (args.length > 4) {
//     throw new Error('too many args');
//   }

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3])
//     }
//   } else {
//     throw new Error('arg not number');
//   }
// }

export const calculateBmi = (height: number, weight: number): bmiCategory => {
  const bmi: number = (weight / (height * height)) * 10000;
  
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } 
  if (bmi >= 16 && bmi < 17) {
    return 'Underweight (Moderate thinness)';
  }
  if (bmi >= 17 && bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  }
  if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  }
  if (bmi >= 25 && bmi < 30) {
    return 'Overweight (Pre-obese)';
  }
  if (bmi >= 30 && bmi < 35) {
    return 'Obese (Class I)';
  }
  if (bmi >= 35 && bmi < 40) {
    return 'Obese (Class II)';
  }
  if (bmi >= 40) {
    return 'Obese (Class III)';
  }

  throw new Error('Provided values are not numbers');
};

// try {
//   const { height, weight } = parseBmiArgs(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (e) {
//   console.log('something went wrong: ', e.message);
// }