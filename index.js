import { Makefleet } from "./ship.js";
import { createShipsArr, init } from "./shipObjArr.js";
import { createBattleground } from "./battleground.js";
import { updateTiles } from "./tilesManipulation.js";
import { addShips, addlisteners } from "./gui.js";

const main = (function(){
    const makefleet = Makefleet();
    let shipsArr1 = createShipsArr(makefleet);
    init(shipsArr1);
    let P1Battleground = createBattleground();
    updateTiles(shipsArr1, P1Battleground);
    addShips(shipsArr1);
    addlisteners(shipsArr1, P1Battleground);
})()