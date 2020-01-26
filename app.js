const start = document.getElementById('start');
const exit = document.getElementById('hamburger');
const pocket = document.getElementById('pocket');
const btnItems = document.querySelectorAll('.btnall');
const up = document.querySelectorAll('.up');
const levels = Array.from(document.querySelectorAll('.level'));
const passive = document.getElementById('passive');
const upText = document.querySelectorAll('.upText');

let gold = 0;
let planets = [{
        name: "mars",
        level: 0,
        levelCost: [10, 20, 30, 40],
        passiveGold: [1, 3, 6, 9]
    },
    {
        name: "neptune",
        level: 0,
        passiveGold: [3, 6, 9, 12],
        levelCost: [10, 20, 30, 40]
    },
    {
        name: "venus",
        level: 0,
        passiveGold: [10, 20, 30, 40],
        levelCost: [20, 40, 30, 40]
    }
];


function startHandler() {
    document.getElementById('loading').style.opacity = '0';
    document.getElementById("loading").style.pointerEvents = "none";
};

function exitHandler() {
    document.getElementById('loading').style.opacity = '1';
    document.getElementById("loading").style.pointerEvents = "auto";
    document.getElementbyId('hamburger').style.display = 'none';
};

function addGold() {
    gold++;
    pocket.textContent = `${gold}g`;
}

function upgrade(planet) {
    if (gold >= planets[planet].levelCost[planets[planet].level]) {
        gold -= planets[planet].levelCost[planets[planet].level];
        pocket.textContent = `${gold}g`
        planets[planet].level += 1;
        levels[planet].textContent = `${planets[planet].level} lvl`;
        upText.textContent = `${planets[planet].levelCost[planets[planet]]}g`;


        setInterval(function() {
            gold = gold + planets[planet].passiveGold[planets[planet].level - 1];
            pocket.textContent = `${gold}g`;
            passive.textContent = `${planets[planet].passiveGold[planets[planet].level - 1]}`
        }, 1000);


    } else {
        alert("Za mało złota kurwiu");
    }
}


start.addEventListener('click', startHandler);
exit.addEventListener('click', exitHandler);
btnItems.forEach(btnItem => btnItem.addEventListener("click", addGold));