/* =====================================================
   THE LITTLE DISTRICT
   Pocket Folk Reader v0.2
===================================================== */

let pocketFolk = null;

const book = {

    currentPage: 0,

    pages: [],

    isTurning: false,

    turnForward() {

        if (this.isTurning)
         return;
        if (this.currentPage >= this.pages.length - 1)
         return;
        this.isTurning = true;

        const currentSheet = this.pages[this.currentPage].querySelector(".sheet");

        const onTransitionEnd = () => {
            currentSheet.classList.remove("turning");
            currentSheet.removeEventListener( "transitionend", onTransitionEnd);

            this.currentPage++;
            rebuildStack();
            this.isTurning = false;
        };
        currentSheet.addEventListener("transitionend", onTransitionEnd);
        currentSheet.classList.add("turning");
    },

    moveCurrentPageToBack() {

    const page = this.pages[this.currentPage];

    page.style.zIndex = 0;

}

};


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

        pocketFolk = await response.json();

        book.pages = [...document.querySelectorAll(".page")];

        populateBook();

        rebuildStack();

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

    document.getElementById("cover-character").src =
        pocketFolk.image;

    document.getElementById("cover-name").textContent =
        pocketFolk.name;


    document.getElementById("character-image").src =
        pocketFolk.image;

    document.getElementById("name").textContent =
        pocketFolk.name;

    document.getElementById("introduction").textContent =
        pocketFolk.introduction;


    document.getElementById("whisper").textContent =
        pocketFolk.whispers[0];


    document.getElementById("journal-prompt").textContent =
        pocketFolk.journalPrompts[0];


    document.getElementById("farewell").textContent =
        pocketFolk.farewell;

}


/* =====================================================
   SHOW PAGE
===================================================== */

function rebuildStack() {

    book.pages.forEach((page, index) => {

        page.classList.remove("active");

        page.style.zIndex =
            book.pages.length - index;

    });

    const topPage =
        book.pages[book.currentPage];

    topPage.classList.add("active");

    topPage.style.zIndex = 100;

}


/* =====================================================
   TURN PAGE
===================================================== */

 

/* =====================================================
   INITIALIZE
===================================================== */

function initializeBook() {

    document
    .getElementById("book")
    .addEventListener("click", () => {

        book.turnForward();

    });

}