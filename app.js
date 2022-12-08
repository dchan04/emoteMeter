const channel = "strylander";
const countElement = document.getElementById("count");
const gauge = document.querySelector(".gaugeBar");
const emoteImg = document.getElementById("emote");

var step = 0,
  count = 0,
  res;

var timer = setInterval(loop, 100);

function loop() {
  if (countElement.textContent >= 0) {
    count = countElement.textContent - 0.1;
    countElement.textContent = count;
    if (count < 0) {
      count = 0;
    } else if (count < 25) {
      gauge.style.backgroundColor = "#FA233E";
    } else if (count <= 50) {
      gauge.style.backgroundColor = "#FFA15C";
    } else if (count < 75) {
      gauge.style.backgroundColor = "#F5EB67";
    } else {
      gauge.style.backgroundColor = "#44D492";
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
    if (
      message.includes("KEKW") ||
      message.includes("pepeLaugh") ||
      message.includes("LUL") ||
      message.includes("GOTTEM") ||
      message.includes("LOLW") ||
      message.includes("PepePoint") ||
      message.includes("PepeLmao") ||
      message.includes("ICANT") ||
      message.includes("OMEGALUL") ||
      message.includes("laff")
    ) {
      switch (true) {
        case message.includes("KEKW"):
          if (!emoteImg.src.includes("KEKW.png")) {
            emoteImg.src = "./img/KEKW.png";
            emoteImg.classList.remove("swing-in-top-fwd");
            emoteImg.offsetWidth;
            emoteImg.classList.add("swing-in-top-fwd");
          }
          break;
        case message.includes("pepeLaugh"):
          if (!emoteImg.src.includes("pepeLaugh.png")) {
            emoteImg.src = "./img/pepeLaugh.png";
            emoteImg.classList.remove("swing-in-top-fwd");
            emoteImg.offsetWidth;
            emoteImg.classList.add("swing-in-top-fwd");
          }
          break;
        case message.includes("OMEGALUL"):
          if (!emoteImg.src.includes("OMEGALUL.png")) {
            emoteImg.src = "./img/OMEGALUL.png";
            emoteImg.classList.remove("swing-in-top-fwd");
            emoteImg.offsetWidth;
            emoteImg.classList.add("swing-in-top-fwd");
          }
          break;
        case message.includes("GOTTEM"):
          if (!emoteImg.src.includes("GOTTEM.png")) {
            emoteImg.src = "./img/GOTTEM.png";
            emoteImg.classList.remove("swing-in-top-fwd");
            emoteImg.offsetWidth;
            emoteImg.classList.add("swing-in-top-fwd");
          }
          break;
        case message.includes("LOLW"):
          if (!emoteImg.src.includes("LOLW.png")) {
            emoteImg.src = "./img/LOLW.png";
            emoteImg.classList.remove("swing-in-top-fwd");
            emoteImg.offsetWidth;
            emoteImg.classList.add("swing-in-top-fwd");
          }
          break;
        case message.includes("PepePoint"):
          if (!emoteImg.src.includes("pepePoint.png")) {
            emoteImg.src = "./img/pepePoint.png";
            emoteImg.classList.remove("swing-in-top-fwd");
            emoteImg.offsetWidth;
            emoteImg.classList.add("swing-in-top-fwd");
          }
          break;
        case message.includes("PepeLmao"):
          if (!emoteImg.src.includes("PepeLmao.png")) {
            emoteImg.src = "./img/PepeLmao.png";
            emoteImg.classList.remove("swing-in-top-fwd");
            emoteImg.offsetWidth;
            emoteImg.classList.add("swing-in-top-fwd");
          }
          break;
        case message.includes("ICANT"):
          if (!emoteImg.src.includes("ICANT.png")) {
            emoteImg.src = "./img/ICANT.png";
            emoteImg.classList.remove("swing-in-top-fwd");
            emoteImg.offsetWidth;
            emoteImg.classList.add("swing-in-top-fwd");
          }
          break;
        case message.includes("LUL"):
          if (!emoteImg.src.includes("LUL.png")) {
            emoteImg.src = "./img/LUL.png";
            emoteImg.classList.remove("swing-in-top-fwd");
            emoteImg.offsetWidth;
            emoteImg.classList.add("swing-in-top-fwd");
          }
          break;
        case message.includes("laff"):
          if (!emoteImg.src.includes("laff.png")) {
            emoteImg.src = "./img/laff.png";
            emoteImg.classList.remove("swing-in-top-fwd");
            emoteImg.offsetWidth;
            emoteImg.classList.add("swing-in-top-fwd");
          }
          break;
        default:
      }
      count = parseInt(countElement.textContent) + 20;
      if (count > 100) {
        emoteImg.classList.remove("bounce-7");
        emoteImg.classList.remove("swing-in-top-fwd");
        emoteImg.offsetWidth;
        emoteImg.classList.add("bounce-7");
        count = 0;
      }
      countElement.innerHTML = count;
      gauge.style.transform = `rotate(${count / 2 / 100}turn)`;
      gauge.style.transition = `transform 0.2s ease-in-out`;
    }
  }); //count number of emotes then
};

loop();
