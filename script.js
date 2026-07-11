/* =====================================================
   THE LITTLE DISTRICT
   Pocket Folk Reader
===================================================== */

let pocketFolk = null;

let currentPage = 0;


/* =====================================================
   START
===================================================== */

window.addEventListener("DOMContentLoaded", () => {

    loadPocketFolk();

});


/* =====================================================
   LOAD CHARACTER
===================================================== */

async function loadPocketFolk() {

    try {

        const params = new URLSearchParams(window.location.search);

        const character =
            params.get("character") || "pepper";

        const response =
            await fetch(`data/${character}.json`);

        pocketFolk =
            await response.json();

        populateBook();

        showPage(0);

        initializeBook();

    }

    catch (error) {

        console.error(error);

    }

}


/* =====================================================
   POPULATE BOOK
===================================================== */

function populateBook() {

    /* ---------- Cover ---------- */

    document.getElementById("cover-character").src =
        pocketFolk.image;

    document.getElementById("cover-name").textContent =
        pocketFolk.name;


    /* ---------- Meet ---------- */

    document.getElementById("character-image").src =
        pocketFolk.image;

    document.getElementById("name").textContent =
        pocketFolk.name;

    document.getElementById("introduction").textContent =
        pocketFolk.introduction;


    /* ---------- Today's Thought ---------- */

    document.getElementById("whisper").textContent =
        pocketFolk.whispers[0];


    /* ---------- Reflection ---------- */

    document.getElementById("journal-prompt").textContent =
        pocketFolk.journalPrompts[0];


    /* ---------- Back Cover ---------- */

    document.getElementById("farewell").textContent =
        pocketFolk.farewell;

}


/* =====================================================
   SHOW PAGE
===================================================== */

function showPage(index) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });

    pages[index].classList.add("active");

}


/* =====================================================
   TURN PAGE
===================================================== */

function turnPage() {

    const pages =
        document.querySelectorAll(".page");

    if (currentPage >= pages.length - 1)
        return;

    currentPage++;

    showPage(currentPage);

}


/* =====================================================
   INITIALIZE BOOK
===================================================== */

function initializeBook() {

    document
        .getElementById("book")
        .addEventListener("click", function () {

            turnPage();

        });

}i