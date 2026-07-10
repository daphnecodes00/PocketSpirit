const whispers = [
    "You don't have to earn your rest.",
    "The moon isn't late. Neither are you.",
    "Small steps still move mountains.",
    "Someone is smiling because of your kindness.",
    "Today is allowed to be gentle.",
    "You are becoming the person you needed years ago."
];

const today = new Date(); //luna knows today.
const dayOfYear = today.getDate();

const revealButton = document.getElementById("revealButton");
const whisper = document.getElementById("whisper");
const farewell = document.getElementById("farewell");

revealButton.addEventListener("click", function () {
    //const randomNumber = Math.floor(Math.random() * whispers.length); // rolling the dice
    const whisperIndex = dayOfYear % whispers.length;
    //whisper.textContent = whispers[randomNumber];  //change the content of whisper
    whisper.textContent = whispers[whisperIndex];
    whisper.style.display = "block";
    revealButton.style.display = "none";
    farewell.style.display = "block";

});