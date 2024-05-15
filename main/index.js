console.log("Требоваяния к верстке:\n" +
    "1. [+] Реализация burger menu на обеих страницах +26\n" +
    "2. [+/-] Реализация слайдера-карусели на странице main +32\n" +
    "- при изменении ширины экрана (от 1280px до 320px и обратно), слайдер перестраивается\n" +
    "3. [-] Реализация пагинации на странице Pets 0\n" +
    "4. [+] Реализация попап на обеих страницах +12\n");
console.log("Итого: 70 баллов");

let burgerMenu = document.querySelector(".burger-menu");
let header = document.querySelector(".header");
let menuLinks = document.querySelectorAll(".menu-link");
let bodyBackground = document.querySelector(".body-background");

function openMenu() {
    header.classList.toggle("open");
    document.body.classList.toggle("blocked-body-menu");
    bodyBackground.classList.toggle("body-background-active");
}

burgerMenu.addEventListener("click", openMenu);
menuLinks.forEach((link) => link.addEventListener("click", openMenu));
document.querySelector(".inactive-menu-link").addEventListener("click", openMenu);

let popUp = document.querySelector(".pop-up");
let animals = ["Jennifer", "Sophia", "Woody", "Scarlett", "Katrine", "Timmy", "Freddie", "Charly"];

let listOptions = ["age", "inoculations", "diseases", "parasites"];

let popUpTemplate = function (num) {
    let popupContainer = document.createElement("div");
    popupContainer.classList.add("pop-up-container");
    let popupBody = document.createElement("div");
    popupBody.classList.add("pop-up-body");

    let closeBtn = document.createElement("div");
    closeBtn.classList.add("pop-up-close");
    closeBtn.classList.add("button-paginator");
    closeBtn.classList.add(json[num].name);
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    closeBtn.appendChild(span1);
    closeBtn.appendChild(span2);

    let img = document.createElement("img");
    img.src = json[num].img;
    img.classList.add("pop-up-image");

    let popupContent = document.createElement("div");
    popupContent.classList.add("pop-up-content");

    let h3 = document.createElement("h3");
    h3.innerText = json[num].name;
    popupContent.appendChild(h3);
    let h4 = document.createElement("h4");
    h4.innerText = `${json[num].type} - ${json[num].breed}`;
    popupContent.appendChild(h4);
    let paragraph = document.createElement("p");
    paragraph.innerText = json[num].description;
    popupContent.appendChild(paragraph);

    let list = document.createElement("ul");
    list.classList.add("pop-up-list");
    for (let i = 0; i < 4; i++) {
        let li = document.createElement("li");
        li.textContent = json[num][listOptions[i]];

        let strong = document.createElement("strong");
        strong.textContent = ` ${listOptions[i]}: `;
        li.prepend(strong);

        let span = document.createElement("span");
        span.insertAdjacentHTML("afterbegin", "&#8226;");
        li.prepend(span);
        list.appendChild(li);
    }
    popupContent.appendChild(list);
    popupBody.appendChild(closeBtn);
    popupBody.appendChild(img);
    popupBody.appendChild(popupContent);

    popupContainer.appendChild(popupBody);
    return popupContainer;
};

let cardClick = function (event) {
    if (event.currentTarget.classList.contains("animal-card")) {
        let generatedPopup;
        for (let i = 0; i < animals.length; i++) {
            if (event.currentTarget.classList.contains(animals[i])) {
                generatedPopup = popUpTemplate(i);
            }
        }
        popUp.innerHTML = "";
        popUp.appendChild(generatedPopup);
        popUp.classList.toggle("pop-up-open");
        document.body.classList.toggle("blocked-body");

        document.querySelector(".pop-up-close").addEventListener("click", (event) => {
            popUp.classList.remove("pop-up-open");
            document.body.classList.remove("blocked-body");
        });
    }
};

let alreadyShownInMiddleNums = [0, 0, 0];

let buttonLeft = document.querySelector(".button-paginator-left");
let buttonRight = document.querySelector(".button-paginator-right");
let carousel = document.querySelector(".animal-card-container");

let moveLeft = function () {
    carousel.classList.add("transition-left");
    buttonLeft.removeEventListener("click", moveLeft);
    buttonRight.removeEventListener("click", moveRight);

    generateNewThreeUnique();

    let card1 = cardTemplate(alreadyShownInMiddleNums[0]);
    let card2 = cardTemplate(alreadyShownInMiddleNums[1]);
    let card3 = cardTemplate(alreadyShownInMiddleNums[2]);
    card2.classList.add("animal-card-hidden-320");
    card3.classList.add("animal-card-hidden-768");
    document.querySelector(".left-slider").innerHTML = "";
    document.querySelector(".left-slider").appendChild(card1);
    document.querySelector(".left-slider").appendChild(card2);
    document.querySelector(".left-slider").appendChild(card3);
};

let moveRight = function () {
    carousel.classList.add("transition-right");
    buttonLeft.removeEventListener("click", moveLeft);
    buttonRight.removeEventListener("click", moveRight);

    generateNewThreeUnique();

    let card1 = cardTemplate(alreadyShownInMiddleNums[0]);
    let card2 = cardTemplate(alreadyShownInMiddleNums[1]);
    let card3 = cardTemplate(alreadyShownInMiddleNums[2]);
    card2.classList.add("animal-card-hidden-320");
    card3.classList.add("animal-card-hidden-768");
    card1.addEventListener("click", cardClick, true);
    card2.addEventListener("click", cardClick, true);
    card3.addEventListener("click", cardClick, true);
    document.querySelector(".right-slider").innerHTML = "";
    document.querySelector(".right-slider").appendChild(card1);
    document.querySelector(".right-slider").appendChild(card2);
    document.querySelector(".right-slider").appendChild(card3);
};

buttonLeft.addEventListener("click", moveLeft);
buttonRight.addEventListener("click", moveRight);

carousel.addEventListener("animationend", (animationEvent) => {

    if (animationEvent.animationName === "move-left") {
        carousel.classList.remove("transition-left");
        let leftItems = document.querySelector(".left-slider").innerHTML;
        document.querySelector(".target-slider").innerHTML = leftItems;

    } else if (animationEvent.animationName === "move-right") {
        carousel.classList.remove("transition-right");
        let rightItems = document.querySelector(".right-slider").innerHTML;
        document.querySelector(".target-slider").innerHTML = rightItems;

    }

    buttonLeft.addEventListener("click", moveLeft);
    buttonRight.addEventListener("click", moveRight);
    document.querySelectorAll(".animal-card").forEach((card) => {
        card.addEventListener("click", cardClick, true);
    });
});

let cardTemplate = function (num) {
    let animalCard = document.createElement("div");
    animalCard.classList.add("animal-card");
    animalCard.classList.add(json[num].name);

    let img = document.createElement("img");
    img.src = json[num].img;
    img.classList.add("animal-card-img");

    let cardBottomContainer = document.createElement("div");
    cardBottomContainer.classList.add("animal-card-bottom-container");
    let cardText = document.createElement("p");
    cardText.classList.add("animal-card-text");
    cardText.innerText = json[num].name;

    let cardButtonContainer = document.createElement("div");
    cardButtonContainer.classList.add("card-button-container");
    let cardButton = document.createElement("button");
    cardButton.classList.add("animal-card-button");

    cardButton.innerText = "Learn more";
    cardButtonContainer.appendChild(cardButton);
    cardBottomContainer.appendChild(cardText);
    cardBottomContainer.appendChild(cardButtonContainer);
    animalCard.appendChild(img);
    animalCard.appendChild(cardBottomContainer);

    return animalCard;
};

let carouselFill = function () {
    generateNewThreeUnique();

    let card1 = cardTemplate(alreadyShownInMiddleNums[0]);
    let card2 = cardTemplate(alreadyShownInMiddleNums[1]);
    let card3 = cardTemplate(alreadyShownInMiddleNums[2]);
    card2.classList.add("animal-card-hidden-320");
    card3.classList.add("animal-card-hidden-768");
    document.querySelector(".target-slider").innerHTML = "";
    document.querySelector(".target-slider").appendChild(card1);
    document.querySelector(".target-slider").appendChild(card2);
    document.querySelector(".target-slider").appendChild(card3);
    document.querySelectorAll(".animal-card").forEach((card) => {
        card.addEventListener("click", cardClick, true);
    });
};

carouselFill();

function generateNewThreeUnique() {
    let totalCountOfCards = 8;
    let maxCountOfCardsInOneBlock = 3;
    let newUniqueCards = [];

    while (newUniqueCards.length != maxCountOfCardsInOneBlock) {
        let newCardCount = Math.floor(Math.random() * totalCountOfCards);
        if (newUniqueCards.includes(newCardCount) || alreadyShownInMiddleNums.includes(newCardCount)) {
            continue;
        } else {
            newUniqueCards.push(newCardCount);
        }
    }
    alreadyShownInMiddleNums = newUniqueCards;
    return alreadyShownInMiddleNums;
}
