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

document.querySelectorAll(".animal-card").forEach((card) => {
    card.addEventListener("click", cardClick, true);
});