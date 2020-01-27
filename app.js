const start = document.getElementById('start');
const exit = document.getElementById('hamburger');
const pocket = document.getElementById('pocket');
const btnItems = document.querySelectorAll('.btnall');
const up = document.querySelectorAll('.up');
const levels = Array.from(document.querySelectorAll('.level'));
const passive = document.getElementById('passive');


let gold = 0;
let passiveGold = [0];
let planets = [{
        name: "mars",
        level: 0,
        passiveGold: [1, 3, 6, 9],
        levelCost: [10, 30, 60, 90],
        buildings: [
            {
                requiredLevel: 1,
                building: "water"
            },
            {
                requiredLevel: 2,
                building: "tree"
            },
            {
                requiredLevel: 3,
                building: "mountains"
            },
            {
                requiredLevel: 4,
                building: "lava"
            }
        ]
    },
    {
        name: "neptune",
        level: 0,
        passiveGold: [3, 6, 9, 12],
        levelCost: [50, 100, 150, 200]
    },
    {
        name: "venus",
        level: 0,
        passiveGold: [10, 20, 30, 40],
        levelCost: [200, 300, 400, 500]
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
    pocket.textContent = `Gold: ${gold}`;
}

function upgrade(planet) {
    if (gold >= planets[planet].levelCost[planets[planet].level]) {
        gold -= planets[planet].levelCost[planets[planet].level];
        pocket.textContent = `Gold: ${gold}`
        planets[planet].level += 1;
        levels[planet].textContent = `${planets[planet].level} lvl`;
        up[planet].textContent = `Upgrade - cost:${planets[planet].levelCost[planets[planet].level]}g`;
        passiveGold.push(planets[planet].passiveGold[planets[planet].level]);

        if(planets[planet].level == 1) {
             const planetName = planets[planet].name;
             const planetElement = document.getElementById(planetName);
             planetElement.style.display = "block";
        }

        build();
    } else {
        alert("Za mało złota mój kurwo demonie");
    }
}

function build() {
    console.log("test");
}

function passiveGlobal() {
    let sum = 0;
    passiveGold.forEach(item => {
        sum += item;
    });

    gold = gold + sum;
    pocket.textContent = `Gold: ${gold}`;
    passive.textContent = `Passive Gold: ${sum}/s`;
}

setInterval(passiveGlobal, 1000);


start.addEventListener('click', startHandler);
exit.addEventListener('click', exitHandler);
btnItems.forEach(btnItem => btnItem.addEventListener("click", addGold));
