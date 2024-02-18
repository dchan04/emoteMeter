const channel = "strylander";
const countElement = document.getElementById("count");
const goalElement = document.getElementById("goal-count");
const gauge = document.querySelector(".gaugeBar");
const emoteImg = document.getElementById("emote");
const emoteMap = new Map([
	["gigl", "gigl.png"],
	["GOTTEM", "GOTTEM.png"],
	["HEHE", "HEHE.png"],
	["icent", "icent.png"],
	["KEKWPoint", "KEKWPoint.png"],
	["laff", "laff.png"],
	["LOLW", "LOLW.png"],
	["mokokoGiggle", "mokokoGiggle.png"],
	["OMEGALOOL", "OMEGALOOL.png"],
	["OMEGALUL", "OMEGALUL.png"],
	["LUL", "LUL.png"],
	["pepeLaugh", "pepeLaugh.png"],
	["PepeLmao", "PepeLmao.png"],
	["pepePoint", "pepePoint.png"],
	["xddICANT", "xddICANT.png"],
	["xdding", "xdding.png"],
	["ICANT", "ICANT.png"],
	["KEKW", "KEKW.png"],
	["xdd", "xdd.png"],
	["LUL", "LUL.png"],
	["om", "om.png"],
]);

var step = 0,
	count = 0,
	goalCount = 0,
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
		const wordsInMessage = message.trim().split(/\s+/); // Split the message into words

		for (const [keyword, emoteFileName] of emoteMap) {
			if (wordsInMessage.includes(keyword.trim())) {
				// Check if any word in the message matches the keyword
				const emotePath = emoteFileName
					? `./img/${emoteFileName}`
					: null;

				if (emotePath && !emoteImg.src.includes(emotePath)) {
					emoteImg.src = emotePath;
					emoteImg.classList.remove("swing-in-top-fwd");
					emoteImg.offsetWidth;
					emoteImg.classList.add("swing-in-top-fwd");
					count = parseInt(countElement.textContent) + 20;
					if (count > 100) {
						emoteImg.classList.remove("bounce-7");
						emoteImg.classList.remove("swing-in-top-fwd");
						emoteImg.offsetWidth;
						emoteImg.classList.add("bounce-7");
						count = 0;
						goalCount += 1;
					}
				}
				break; // Stop checking once a matching keyword is found
			}
		}

		countElement.innerHTML = count;
		goalElement.innerHTML = goalCount;
		gauge.style.transform = `rotate(${count / 2 / 100}turn)`;
		gauge.style.transition = `transform 0.2s ease-in-out`;
	}); //count number of emotes then
};

loop();
