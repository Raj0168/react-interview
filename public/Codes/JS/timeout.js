console.log("start");

function greeting(name, callback) {
  setTimeout(() => {
    callback(`Hello ${name}`);
  }, 1000);
}

function introduce(name, callback) {
  setTimeout(() => {
    callback(`I'm ${name}`);
  }, 500);
}

greeting("Alex", (message) => {
  console.log(message);
  introduce("Joe", (intro) => {
    console.log(intro);
  });
});

const weather = new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = false;
    if (result) {
      resolve("success");
    } else {
      reject("failed");
    }
  }, 1000);
});

weather
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
