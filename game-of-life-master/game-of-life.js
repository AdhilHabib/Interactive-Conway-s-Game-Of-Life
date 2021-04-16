var UNIVERSE_WIDTH = 20;
var UNIVERSE_HEIGHT = 20;
const AUTOPLAY_INTERVAL = 100; // ms

let population = {
    generation: 0,
    neighbourhood: [], // living neighbours layout
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

     /*builder.onclick = function() {
        var size = parseInt(document.getElementById("SIZE").value);
        createUniverse(size, size);
        createRandomPopulationLayout();
        populateUniverse();
    };*/
    GenButton.onclick = function(){
    for ( let i = 0; i < 23; i++ ) {
      document.getElementById("nextGenButton").click();
    }
    };

    Clear.onclick = function(){
    layout.clear();
    population.generation = 0;
    };

    nextGenButton.onclick = function() {
        createNextGeneration();
    };

    autoplayButton.onclick = function() {
        if (!autoplayIntervalObj) { // autoplay is not running
            document.getElementById('autoplayButton').value = 'Stop';
            // setting interval for autoplay
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

/**
 * Drawing the universe grid with specified width and height.
 * @param {int} universeWidth - number of cells in a row
 * @param {int} universeHeight - number of cells in a column
 */
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

/**
 * Generating random population layout.
 */
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

/**
 * Adding population to the grid according to its layout.
 */
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

/**
 * Returns random number between 0 and a positive number (0 included, max excluded).
 * @param {int} max - positive number
 */
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
    statsLabel.innerHTML = 'Living cells: ';
    let livingCellsCounterSpan = document.createElement('span');
    livingCellsCounterSpan.id = 'livingCellsCounterSpan';
    livingCellsCounterSpan.innerHTML = getLivingCellsCount();
    statsDiv.appendChild(statsLabel);
    statsDiv.appendChild(livingCellsCounterSpan);

    let timeControlDiv = document.createElement('div');
    let nextGenButton = document.createElement('input');
    nextGenButton.type = 'button';
    nextGenButton.id = 'nextGenButton';
    nextGenButton.value = 'Next Generation';
      let Clear = document.createElement('input');
    Clear.type = 'button';
    Clear.id = 'Clear';
    Clear.value = 'Reset';

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

/**
 * Decision Point, who lives and who dies:
 * - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 * - Any live cell with two or three live neighbours lives on to the next generation.
 * - Any live cell with more than three live neighbours dies, as if by overpopulation.
 * - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
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

/**
 * Checking cell surroundings by counting its living neighbours.
 */
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

/**
 * Returns the number of living cells.
 */
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
