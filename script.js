async function loadPocketFolk() {
    try {

        const params = new URLSearchParams(window.location.search);
        const character = params.get("character") || "pepper";

        const response = await fetch(`data/${character}.json`);

        const pocketFolk = await response.json();

        document.getElementById("character-image").src = pocketFolk.image;
        document.getElementById("name").textContent = pocketFolk.name;
        document.getElementById("greeting").textContent = pocketFolk.greeting;

    } catch (error) {
        console.error("Couldn't load Pocket Folk.", error);
    }
}

loadPocketFolk();