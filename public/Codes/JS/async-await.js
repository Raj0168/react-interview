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

const result = async () => {
  try {
    const message = await getMessage("Please welcome...");
    console.log(message);
    const greeting = await getGreeting("Clark");
    console.log(greeting);
  } catch (err) {
    console.error(err);
  }
};
result();

const API_URL = `https://dummyjson.com/quotes`;
let data;

async function loadQuotes(url) {
  const res = await fetch(url);
  try {
    if (res.ok) {
      const json = await res.json();
      data = json.quotes.slice(0, 2);
      console.log(data);
      return data;
    }
  } catch (err) {
    console.error(err);
  }
}

loadQuotes(API_URL);
