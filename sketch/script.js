let container = document.querySelector(".container");
let cells = 80;
let resetBtn = document.querySelector(".reset");
let resizeBtn = document.querySelector(".resize");
let colorBtn = document.querySelector(".color");
let colorPicker = document.querySelector(".colorPicker");


colorBtn.addEventListener("click", () => {
    setColor();
});

resetBtn.addEventListener("click", () => {
    resetBackground();
});

resizeBtn.addEventListener("click", () => {
    window.location.reload();
});

function changeBackground(event) {
    let pass = Number(event.target.getAttribute("pass"));
    event.target.style.backgroundColor = colorPicker.value;
    event.target.style.opacity = pass;
    event.target.setAttribute("pass", pass + 0.1);
    document.querySelector(".color-indicator").style.color = colorPicker.value;
}

function resetBackground() {
    let gridCells = document.querySelectorAll(".gridCell")
    gridCells.forEach((gridCell) => {
        gridCell.style.backgroundColor = "white";
    })
}

function setColor() {
    colorPicker.focus();
    colorPicker.click();
    document.querySelector(".color-indicator").style.color = colorPicker.value;
}

function createGrid(cells) {
    for (let i = 0; i < cells*cells; i++) {
        let gridCell = document.createElement("div");
        gridCell.classList.add("gridCell");
        gridCell.style.width = 600 / cells;
        gridCell.style.height = 600 / cells;
        gridCell.setAttribute("pass", 0.2);
        container.appendChild(gridCell);
    }   
}

createGrid(Math.abs(Number(prompt("Enter the no. of cells per row:\nRecommended: 16 / 32 / 64 / 128 ", "16"))));

let itemsList = document.querySelectorAll(".gridCell");
itemsList.forEach((item) => {
    item.addEventListener("mouseover", () => {
        changeBackground(event);
    }
);
})