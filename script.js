/* =====================================================
   GLOBALS
===================================================== */

let pocketFolk;

let currentPage = 0;

const pages = [
    "page-cover",
    "page-meet",
    "page-thought",
    "page-reflection",
    "page-back-cover"
];


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

    document.getElementById("book-cover").src =
        pocketFolk.bookCover;


    /* ---------- Meet ---------- */

    document.getElementById("character-image").src =
        pocketFolk.image;

    document.getElementById("name").textContent =
        pocketFolk.name;

    document.getElementById("introduction").textContent =
        pocketFolk.introduction;


    /* ---------- Thought ---------- */

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

function showPage(pageNumber) {

    document
        .querySelectorAll(".page")
        .forEach(function(page) {

            page.style.display = "none";

        });

    document
        .getElementById(pages[pageNumber])
        .style.display = "flex";

}


/* =====================================================
   TURN PAGE
===================================================== */

function turnPage() {

    if (currentPage >= pages.length - 1) {

        return;

    }

    currentPage++;

    showPage(currentPage);

}


/* =====================================================
   TAP BOOK
===================================================== */

document
    .getElementById("book")
    .addEventListener("click", function () {

        turnPage();

    });


/* =====================================================
   START
===================================================== */

loadPocketFolk();