// Variables
const btn = document.querySelector(".get-jokes");
const number = document.querySelector("#number");
const jokeOutput = document.querySelector(".jokes");

// Event
btn.addEventListener("click", getJokes);

// Get Jokes
function getJokes(e) {
  return new Promise(function (resolve, reject) {
    let numSelection = number.value;

    e.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `http://api.icndb.com/jokes/random/${numSelection}`, true);

    xhr.onload = function () {
      if (this.status === 200) {
        let jokeTransfer = JSON.parse(xhr.responseText);
        let jokeContent = jokeTransfer.value;

        resolve(
          jokeContent.forEach((jokes) => {
            const newJokeLi = document.createElement("li");
            newJokeLi.textContent = jokes.joke;
            jokeOutput.appendChild(newJokeLi);
          })
        );
      } else {
        reject("Error");
      }
    };

    xhr.send();
  });
}

getJokes().then();
