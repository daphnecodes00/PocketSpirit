async function loadPocketFolk() {
    try {

        const params = new URLSearchParams(window.location.search);
        const character = params.get("character") || "pepper";

        const response = await fetch(`data/${character}.json`);

        const pocketFolk = await response.json();

        document.getElementById("character-image").src = pocketFolk.image;
        document.getElementById("name").textContent = pocketFolk.name;
        document.getElementById("greeting").textContent = pocketFolk.greeting;

        document.getElementById("whisper").textContent = pocketFolk.whispers[0];

    } catch (error) {
        console.error("Couldn't load Pocket Folk.", error);
    }
}

function showScreen(screenId) {

    document.getElementById("screen-cover").style.display = "none";
    document.getElementById("screen-greeting").style.display = "none";
    document.getElementById("screen-whisper").style.display = "none";

    document.getElementById(screenId).style.display = "block";

}

loadPocketFolk();

const continueButton = document.getElementById("continue-button");
continueButton.addEventListener("click", function () {
    showScreen("screen-whisper");
});

const openButton = document.getElementById("open-button");
openButton.addEventListener("click", function () {
    showScreen("screen-greeting");
});