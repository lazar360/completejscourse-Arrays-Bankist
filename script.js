'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

///////////////////////////////////////////

/*const account1 = {
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
}*/

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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i + 1} ${type}
          </div>
          <div class="movements__value">
          ${mov} €
          </div>
          </div>
          `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const outputs = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outputs)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const deposits = movements.filter(mov => mov > 0);
const withdrawal = movements.filter(mov => mov < 0);

const balance = movements.reduce((acc, cur) => acc + cur, 0);
// const maxValue = movements.reduce(
//   (acc, cur) => (acc > cur ? acc : cur),
//   movements[0]
// );
// console.log('maxValue', maxValue);

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance} EUR`;
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear fields
    inputLoginPin.value = '';
    inputLoginUsername.value = '';
    inputLoginPin.blur();

    // updateUI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // update ui
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);
    // update
    updateUI(currentAccount);
    // clear field
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputLoginPin.value = inputLoginUsername.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

////////////////////////////////
// LECTURES

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

// TEST DATA 1
// let data1 = [5, 2, 4, 1, 15, 8, 3];
// TEST DATA 2
// let data2 = [16, 6, 10, 5, 6, 1, 4];

// 1 map
// const calcHumanAge = data =>
//   data.map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4));
// const humanAge1 = calcHumanAge(data1);
// const humanAge2 = calcHumanAge(data2);
// console.log(humanAge1);
// console.log(humanAge2);

// 2 filter
// const filterHumanAge = data => data.filter(humanAge => humanAge >= 18);
// const humanAge1filtered = filterHumanAge(humanAge1);
// const humanAge2filtered = filterHumanAge(humanAge2);
// console.log(humanAge1filtered);
// console.log(humanAge2filtered);

// 3 reduce
// const calcAverage = data => data.reduce((acc, age) => acc + age) / data.length;
// console.log(calcAverage(humanAge1filtered));
// console.log(calcAverage(humanAge2filtered));

// const calcAverageHumanAge = function (dogAges) {
//   const humanAges = dogAges.map(dogAge =>
//     dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
//   );
//   const humanAgesFiltered = humanAges.filter(humanAge => humanAge >= 18);

//   const average =  humanAgesFiltered.reduce(
//       (acc, age, i, arr) => acc + age / arr.length,0
//   );

//   return average
// };

// const calcAverageHumanAge = data =>
//   data.map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
//       .filter(humanAge => humanAge >= 18)
//       .reduce((acc, age, i, arr) => acc + age / arr.length,0);

// console.log(calcAverageHumanAge(data1));
// console.log(calcAverageHumanAge(data2));

// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   // debug .map((mov, i, arr) => {console.log(arr); return mov * eurToUsd});
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// const firstWithdrawal = movements.find(move => move < 0);
// console.log(firstWithdrawal);
// console.log(accounts);
// console.log(accounts.find(account => account.owner === 'Jessica Davis'));
// let account;
// for (let acc of accounts) {
//   if (acc.owner === 'Jessica Davis') {
//     account = acc;
//   }
// }
// console.log(account);

// console.log('movements', movements);

// // EQUALITY
// console.log('movements includes -130 : ', movements.includes(-130));

// // SOME CONDITION
// console.log(
//   'movements.some(mov => mov > 0) : ',
//   movements.some(mov => mov > 0)
// );

// // EVERY CONDITION
// console.log(
//   'movements.every(mov => mov > 0) : ',
//   movements.every(mov => mov > 0)
// );s

// // Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// const arr = [[1, 2, 3, 4], [5, 6, 7], 8, 9];
// console.log(arr.flat());
// const arrDeep = [[[1, 2], 3, 4], [5, 6, 7], 8, 9];
// console.log(arrDeep.flat(2));

// // flat
// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log('overallBalance', overallBalance);

// // flatMap : one level deep
// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log('overallBalance2', overallBalance2);

// // Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// // Numbers
// console.log(movements);

// // return < 0, A, B
// // return > 0, B, A

// // Ascending

// // movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (a < b) return -1;
// // });

// movements.sort((a, b) => a - b);
// console.log(movements);

// // Descending
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (a < b) return 1;
// // });

// // movements.sort((a, b) => b - a);
// // console.log(movements);
// const arr = [1, 2, 3, 4, 5, 6];
// const x = new Array(7);
// console.log(x.fill(1, 3, 5));
// console.log(arr.fill(1, 3, 5));
// console.log(Array.from({ length: 7 }, () => 1));
// console.log(Array.from({ length: 7 }, (cur, i) => (cur = i + 1)));
// console.log(Math.trunc(Math.random() * 6) + 1);
// // Générer un tableau de 100 lancés aléatoires de dé (6 faces)
// console.log(
//   Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6) + 1)
// );

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});
