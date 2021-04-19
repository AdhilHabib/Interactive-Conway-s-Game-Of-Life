var UNIVERSE_WIDTH = 20;
var UNIVERSE_HEIGHT = 20;
const AUTOPLAY_INTERVAL = 100; 

let population = {
    generation: 0,
    neighbourhood: [], 
    layout: [],
}
let universe;
let autoplayIntervalObj;

document.addEventListener('DOMContentLoaded', function() {
    var size = parseInt(prompt("Enter a Value"));
    createUniverse(size, size);
    createRandomPopulationLayout();
    populateUniverse();
    addControls();

   
    GenButton.onclick = function(){
    for ( let i = 0; i < 23; i++ ) {
      document.getElementById("nextGenButton").click();
    }
    };

   Clear.onclick = function(){

    population.generation = 0;
    population.neighbourhood= []; 
    population.layout= [];

    CLEARPopulationLayout();
    createNextGeneration();
    };

    nextGenButton.onclick = function() {
        createNextGeneration();
    };

    PATTERN1.onclick = function() {
       
        makeStillLifeBox();
    };
    PATTERN2.onclick = function() {
        
        makeBeacon();
    };
    PATTERN3.onclick = function() {
  
        makeBlinker();
    };

let allCells = document.getElementsByClassName('cell')
  console.log(allCells)

for(let i = 0 ; i < allCells.length ; i++) {
  allCells[i].addEventListener('click', function() {
    allCells[i].onclick = function() {
      console.log("I clicked a button");

    if(allCells[i].classList.contains("alive")){
        allCells[i].classList.remove('alive');
    }else{
      allCells[i].classList.add('alive');
    }

    }

  });
}
    autoplayButton.onclick = function() {
        if (!autoplayIntervalObj) {
            document.getElementById('autoplayButton').value = 'Stop';
            autoplayIntervalObj = setInterval(function() {
                createNextGeneration();
            }, AUTOPLAY_INTERVAL);
        } else {
            clearInterval(autoplayIntervalObj);
            autoplayIntervalObj = null;
            document.getElementById('autoplayButton').value = 'Start';
        }
    };
}, false);

function createUniverse(universeWidth = UNIVERSE_WIDTH, universeHeight = UNIVERSE_HEIGHT) {
    universe = document.createElement('table');
    universe.id = 'universe';
    universe.width = universeWidth;
    universe.height = universeHeight;
    for (let i = 0; i < universe.height; i++) {
        let universeRow = document.createElement('tr');
        for (let j = 0; j < universe.width; j++) {
            let universeCell= document.createElement('td');
            universeCell.classList.add('cell');
            universeRow.appendChild(universeCell);
        }
        universe.appendChild(universeRow);
    }
    document.body.appendChild(universe);
}

function createRandomPopulationLayout() {
    for (let i = 0; i < universe.height; i++) {
        population.neighbourhood.push([]);
        population.layout.push([]);
        for (let j = 0; j < universe.width; j++) {
            population.layout[i].push(getRandomNumberBetweenZeroAndN(2)); // 0 or 1 == dead or alive
        }
    }
    population.generation++;
}

function CLEARPopulationLayout() {

    for (let i = 0; i < universe.height; i++) {
        population.neighbourhood.push([]);
        population.layout.push([]);
        for (let j = 0; j < universe.width; j++) {
            population.layout[i].push(getRandomNumberBetweenZeroAndN(0)); // 0 or 1 == dead or alive
        }
    }

}

function makeStillLifeBox() {

    if(universe.width>=10){
        population.layout[1][1] = 1;
        population.layout[1][2] = 1;
        population.layout[2][1] = 1;
        population.layout[2][2] = 1;
        document.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].classList.add('alive');
        document.getElementsByTagName("tr")[1].getElementsByTagName("td")[2].classList.add('alive');
        document.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].classList.add('alive');
        document.getElementsByTagName("tr")[2].getElementsByTagName("td")[2].classList.add('alive');
        populateUniverse();
    }


}

function makeBeacon() {

    if(universe.width>=10){
        population.layout[1][1] = 1;
        population.layout[1][2] = 1;
        population.layout[2][1] = 1;
        population.layout[4][3] = 1;
        population.layout[4][4] = 1;
        population.layout[3][4] = 1;
        document.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].classList.add('alive');
        document.getElementsByTagName("tr")[1].getElementsByTagName("td")[2].classList.add('alive');
        document.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].classList.add('alive');
        document.getElementsByTagName("tr")[4].getElementsByTagName("td")[3].classList.add('alive');
        document.getElementsByTagName("tr")[4].getElementsByTagName("td")[4].classList.add('alive');
        document.getElementsByTagName("tr")[3].getElementsByTagName("td")[4].classList.add('alive');
        populateUniverse();
    }


}

function makeBlinker() {

    if(universe.width>=10){
        population.layout[2][1] = 1;
        population.layout[2][2] = 1;
        population.layout[2][3] = 1;

        document.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].classList.add('alive');
        document.getElementsByTagName("tr")[2].getElementsByTagName("td")[2].classList.add('alive');
        document.getElementsByTagName("tr")[2].getElementsByTagName("td")[3].classList.add('alive');
        populateUniverse();
    }


}

function populateUniverse() {
    for (let i = 0; i < universe.height; i++) {
        for (let j = 0; j < universe.width; j++) {
            if (population.layout[i][j] == 1) {
                document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].classList.add('alive');
            }
            else {
                document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].classList.remove('alive');
            }
        }
    }
}

function getRandomNumberBetweenZeroAndN(max = 2) {
    return Math.floor(Math.random() * max);
}

function addControls() {
    let controlsDiv = document.createElement('div');
    controlsDiv.id = 'controlsDiv';

    let genDiv = document.createElement('div');
    let genLabel = document.createElement('label');
    genLabel.innerHTML = 'Generation: ';
    let genCounterSpan = document.createElement('span');
    genCounterSpan.id = 'genCounterSpan';
    genCounterSpan.innerHTML = population.generation;
    genDiv.appendChild(genLabel);
    genDiv.appendChild(genCounterSpan);

    let statsDiv = document.createElement('div');
    let statsLabel = document.createElement('label');
   
    let timeControlDiv = document.createElement('div');
    let nextGenButton = document.createElement('input');
    nextGenButton.type = 'button';
    nextGenButton.id = 'nextGenButton';
    nextGenButton.value = 'Next Generation';
      let Clear = document.createElement('input');
    Clear.type = 'button';
    Clear.id = 'Clear';
    Clear.value = 'Reset';


     let Pattern1 = document.createElement('input');
    Pattern1.type = 'button';
    Pattern1.id = 'PATTERN1';
    Pattern1.value = 'Block';

    let Pattern2 = document.createElement('input');
    Pattern2.type = 'button';
    Pattern2.id = 'PATTERN2';
    Pattern2.value = 'Beacon';

    let Pattern3 = document.createElement('input');
    Pattern3.type = 'button';
    Pattern3.id = 'PATTERN3';
    Pattern3.value = 'Blinker';
	
	let patternDiv = document.createElement('div');
	patternDiv.appendChild(Pattern1);
	patternDiv.appendChild(Pattern2);
	patternDiv.appendChild(Pattern3);
	document.body.appendChild(patternDiv);
    let GenButton = document.createElement('input');
    GenButton.type = 'button';
    GenButton.id = 'GenButton';
    GenButton.value = 'After 23 Generations';
    let autoplayButton = document.createElement('input');
    autoplayButton.type = 'button';
    autoplayButton.id = 'autoplayButton';
    autoplayButton.value = 'Start';
    timeControlDiv.appendChild(nextGenButton);
    timeControlDiv.appendChild(autoplayButton);
    timeControlDiv.appendChild(GenButton);
    timeControlDiv.appendChild(Clear);

    let resizer = document.createElement('div');
    controlsDiv.appendChild(genDiv);
    controlsDiv.appendChild(statsDiv);
    controlsDiv.appendChild(timeControlDiv);
    controlsDiv.appendChild(resizer);
    document.body.appendChild(controlsDiv);
}

 function createNextGeneration() {
    checkLivingConditions();

    for (let i = 0; i < universe.height; i++) {
        for (let j = 0; j < universe.width; j++) {
            if (population.neighbourhood[i][j] < 2 || population.neighbourhood[i][j] > 3) { // lonely or too crowded
                population.layout[i][j] = 0;
            }
            else if (population.neighbourhood[i][j] == 3) {
                population.layout[i][j] = 1; // IT'S ALIVE!!! ^.^
            }
        }
    }

    populateUniverse();
    population.generation++;
    document.getElementById('genCounterSpan').innerHTML = population.generation;
    document.getElementById('livingCellsCounterSpan').innerHTML = getLivingCellsCount();
}

function checkLivingConditions() {
    let neighbourCount; // num of living cells surrounding the current cell
    for (let i = 0; i < universe.height; i++) {
        for (let j = 0; j < universe.width; j++) {
            neighbourCount = 0;

            // check for neighbours in the prev row
            if (typeof population.layout[i-1] !== 'undefined') {
                if (typeof population.layout[i-1][j-1] !== 'undefined' && population.layout[i-1][j-1] == 1) {
                    neighbourCount++;
                }
                if (population.layout[i-1][j] == 1) {
                    neighbourCount++;
                }
                if (typeof population.layout[i-1][j+1] !== 'undefined' && population.layout[i-1][j+1] == 1) {
                    neighbourCount++;
                }
            }

            // check for neighbours in current row
            if (typeof population.layout[i][j-1] !== 'undefined' && population.layout[i][j-1] == 1) {
                neighbourCount++;
            }
            if (typeof population.layout[i][j+1] !== 'undefined' && population.layout[i][j+1] == 1) {
                neighbourCount++;
            }

            // check for neighbours in the next row
            if (typeof population.layout[i+1] !== 'undefined') {
                if (typeof population.layout[i+1][j-1] !== 'undefined' && population.layout[i+1][j-1] == 1) {
                    neighbourCount++;
                }
                if (population.layout[i+1][j] == 1) {
                    neighbourCount++;
                }
                if (typeof population.layout[i+1][j+1] !== 'undefined' && population.layout[i+1][j+1] == 1) {
                    neighbourCount++;
                }
            }

            population.neighbourhood[i][j] = neighbourCount;
        }
    }
}

function getLivingCellsCount() {
    let livingCellsCount = 0;
    for (let i = 0; i < universe.height; i++) {
        for (let j = 0; j < universe.width; j++) {
            if (population.layout[i][j] == 1) {
                livingCellsCount++;
            }
        }
    }
    return livingCellsCount;
}
