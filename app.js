const channel = "strylander";
const countElement = document.getElementById("count");
const gauge = document.querySelector(".gaugeBar");
const emoteImg = document.getElementById("emote");

var step = 0,
  count = 0,
  res;

var timer = setInterval(loop, 100);

function loop() {
  //console.log(`${countElement.textContent}`);
  if (countElement.textContent >= 0) {
    count = countElement.textContent - 1;
    countElement.textContent = count;
    if (count < 0) {
      count = 0;
    } else if (count < 25) {
      console.log("TEST1");
      gauge.style.backgroundColor = "#d2222d";
      //gauge.style.transition = `background 1s ease-in-out`;
    } else if (count <= 50) {
      gauge.style.backgroundColor = "#ffbf00";
      //gauge.style.transition = `background 1s ease-in-out`;
    } else if (count < 75) {
      emoteImg.style.removeProperty("animation");
      gauge.style.backgroundColor = "#90EE90";
      //gauge.style.transition = `background 1s ease-in-out`;
    } else {
      gauge.style.backgroundColor = "#238823";
      //gauge.style.transition = `background 1s ease-in-out`;
    }
    gauge.style.transform = `rotate(${count / 2 / 100}turn)`;
    gauge.style.transition = `transform 0.2s ease-in-out`;
  }
}

function stopLoop() {
  clearInterval(timer);
}

function counter() {
  step--;
}

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channel],
});
window.onload = () => {
  client.connect().then(() => {
    console.log(`Listening for messages in ${channel}...`);
  });

  client.on("message", (channel, tags, message, self) => {
    console.log(message);
    if (message.includes("KEKW")) {
      count = parseInt(countElement.textContent) + 25;
      if (count > 100) {
        emoteImg.style.animation = `rotate-scale-up 1s linear 2 both`;
        count = 100;
      }
      countElement.innerHTML = count;
      gauge.style.transform = `rotate(${count / 2 / 100}turn)`;
      gauge.style.transition = `transform 0.2s ease-in-out`;
    }
  }); //count number of emotes then
};

loop();
