const start = document.getElementById('start');
const exit = document.getElementById('hamburger');
const pocket = document.getElementById('pocket');
const btnItems = document.querySelectorAll('.btnall');
const up = document.querySelectorAll('.up');
const levels = Array.from(document.querySelectorAll('.level'));
const passive = document.getElementById('passive');
const mars = document.getElementById('mars');
const neptune = document.getElementById('neptune');



let gold = 0;
let passiveGold = [0];
let planets = [
    {
        name: "mars",
        level: 0,
        passiveGold: [1, 3, 6, 9, 0],
        levelCost: [10, 30, 60, 90, "max"],
        buildings: [{
            requiredLevel: [2, 3, 4, 5],
            building: ["water", "tree", "mountains", "lava"],
            buildingLevel: 0
        }, ]
    },
    {
        name: "neptune",
        level: 0,
        passiveGold: [3, 6, 9, 12, 0],
        levelCost: [50, 100, 150, 200, "max"],
        buildings: [{
            requiredLevel: [2, 3, 4, 5],
            building: ["water", "tree", "mountains", "lava"],
            buildingLevel: 0
        }, ]
    },
    {
        name: "saturn",
        level: 0,
        passiveGold: [10, 20, 30, 40, 0],
        levelCost: [200, 300, 400, 500, "max"]
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
    if(planets[planet].level >= planets[planet].levelCost.length-1 && planets[planet].passiveGold.length-1){
        levels.textContent = `${planets[planet].level}max`;
        // up.textContent = "max"
        console.log(up.textContent);
        alert("Osiągnąłeś maksymalny poziom planety")
    }else {
        if (gold >= planets[planet].levelCost[planets[planet].level]) {
            gold -= planets[planet].levelCost[planets[planet].level];
            pocket.textContent = `Gold: ${gold}`
            planets[planet].level += 1;
            levels[planet].textContent = `${planets[planet].level} lvl`;
            up[planet].textContent = `Upgrade - cost: ${planets[planet].levelCost[planets[planet].level]} g`;
            passiveGold.push(planets[planet].passiveGold[planets[planet].level]);

            if (planets[planet].level == 1) {
                const planetName = planets[planet].name;
                const planetElement = document.getElementById(planetName);
                planetElement.style.display = "block";
            }

            if (planets[planet].level == planets[planet].buildings[0].requiredLevel[planets[planet].buildings[0].buildingLevel]) {

                let hook = document.getElementById(planets[planet].name);
                const nature = document.createElement("div");

                hook.appendChild(nature);
                nature.classList.add(planets[planet].buildings[0].building[planets[planet].buildings[0].buildingLevel]);
                planets[planet].buildings[0].buildingLevel++
            }


        } else {
            alert("Za mało złota");
        }
    }
    if(planets[0].level && planets[1].level && planets[2].level == 4){
        alert("wygrałeś")
    }
}

// function build() {
//
// }

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
