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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

const deposits = movements.filter(mov => mov > 0);
const withdrawal = movements.filter(mov => mov < 0);
console.log('movements', movements);
console.log('deposit', deposits);
console.log('withdrawal', withdrawal);

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);
const maxValue = movements.reduce(
  (acc, cur) => (acc > cur ? acc : cur),
  movements[0]
);
console.log('maxValue', maxValue);

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
  console.log(currentAccount);

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

    // Display movements
    displayMovements(currentAccount.movements);

    // Display balance
    calcDisplayBalance(currentAccount);

    // Display summary
    calcDisplaySummary(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }
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
