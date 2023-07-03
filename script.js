'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i + 1} ${type}
          </div>
          <div class="movements__value">
          ${mov}
          </div>
          </div>
          `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
// console.log(account1);

////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// })

// const movementsUSD = movements.map(mov => mov * eurToUsd);
// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) {
//   movementsUSDfor.push(mov * eurToUsd);
// }
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map((mov, i) => {
//   return `Movement ${i + 1} : You ${mov > 0 ? 'deposited' : 'withdrew'} ${
//     mov > 0 ? mov : Math.abs(mov)
//   }`;
// });
// console.log(movementsDescriptions);

// const displayMovements2 = function (movements) {
//   for(const[i, mov] of movements.entries()) {
//     const html = `
//       <div class="movements__row">
//           <div class="movements__type movements__type--deposit">${i}</div>
//           <div class="movements__value">${mov}</div>
//         </div>
//       `;
//   };
// };

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

/////////////////////////////////////////////////

// SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log([...arr]);

// SPLICE
//console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1,2);
// console.log(arr);

// REVERSE
// let arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// JOIN
// console.log(letters.join(' - '));

// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// getting the last array element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log('jonas'.at(0));
// console.log('jonas'.at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// //for(const movement of movements){
// for (const [i, movement] of movements.entries()) {
//   console.log(
//     `Movement ${i + 1} : You ${movement > 0 ? 'deposited' : 'withdrew'} ${
//       movement > 0 ? movement : Math.abs(movement)
//     }`
//   );
//   if (movement === 70) break; // différence entre la for of loop et forEach
// }

// console.log('-----------------METHOD FOREACH-------------------');

// movements.forEach(function (movement, i, arr) {
// console.log(
//   `Movement ${i + 1} : You ${movement > 0 ? 'deposited' : 'withdrew'} ${
//     movement > 0 ? movement : Math.abs(movement)
//   }`
// );
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key} ${value}`);
// });

// Set
// const currenciesUnique = new Set(['USD', 'EUR', 'USD', 'EUR', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value} ${value}`);
// });

// // TEST DATA 1
// let juliaDatas = [3, 5, 2, 12, 7];
// let kateDatas = [4, 1, 15, 8, 3];
// const copyArray = function(arr){
//   const arrCopy = [...arr];
//   return arrCopy
// };
// const suppressFirstAndLastTwo = function(arr){
//   const arrCorrected = arr.slice(1, -2);
//   return arrCorrected
// };

// const kateDatas2 = copyArray(kateDatas);
// const juliaDatasCorrected = suppressFirstAndLastTwo(juliaDatas);

// console.log('TEST DATA 1');
// const checkDogs = function (dogs) {
//   for (const [i, dogAge] of dogs.entries()) {
//     console.log(
//       `Dog number ${i + 1} is ${
//         dogAge > 1 ? 'an adult ' : 'still a puppy '
//       } and he is ${dogAge} years old`
//     );
//   }
// };
// console.log('checkDogs(juliaDatasCorrected) :');
// checkDogs(juliaDatasCorrected);
// console.log('checkDogs(kateDatas2) :');
// checkDogs(kateDatas2);

// // TEST DATA 2
// console.log('TEST DATA 2');
// juliaDatas = [9,16,6,8,3];
// kateDatas = [10,5,6,1,4];
// const kateDatas3 = copyArray(kateDatas);
// const juliaDatasCorrected2 = suppressFirstAndLastTwo(juliaDatas);
// console.log('checkDogs(juliaDatasCorrected2) :');
// checkDogs(juliaDatasCorrected2);
// console.log('checkDogs(kateDatas3) :');
// checkDogs(kateDatas3);
