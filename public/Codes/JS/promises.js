function getGreeting(username) {
  return new Promise((res, rej) => {
    if (typeof username !== "string") {
      rej(`Invalid type of username "${username}". Should be a string`);
    }
    setTimeout(() => {
      res(`Hi ${username}`);
    }, 1000);
  });
}

function getMessage(message) {
  return new Promise((res, rej) => {
    if (typeof message !== "string") {
      rej(`Invalid type of message "${message}". Should be a string`);
    }
    setTimeout(() => {
      res(message);
    }, 500);
  });
}

// Promise chaining
getGreeting("Prateek")
  .then((res) => {
    console.log(res);
    return getMessage("Welcome!");
  })
  .then((res) => {
    console.log(res);
    return getGreeting("Alex");
  })
  .then((res) => {
    console.log(res);
    return getMessage("Nice to meet you!");
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

const promiseArr = [
  getGreeting("Nathan"),
  getMessage("Good day!"),
  getGreeting("Drake"),
  getMessage("Looking good!"),
];

//   promise all
Promise.all(promiseArr)
  .then((res) => {
    console.log("All:", res);
  })
  .catch((err) => {
    console.error(err);
  });

// promise all settled
Promise.allSettled(promiseArr)
  .then((res) => {
    console.log("All Settled:", res);
  })
  .catch((err) => {
    console.error(err);
  });

// // promise race
Promise.race(promiseArr)
  .then((res) => {
    console.log("Race:", res);
  })
  .catch((err) => {
    console.error(err);
  });

// // promise any
Promise.any(promiseArr)
  .then((res) => {
    console.log("Any:", res);
  })
  .catch((err) => {
    console.error(err);
  });
