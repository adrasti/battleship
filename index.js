import { Makefleet } from "./ship.js";
import { createShipsArr, init } from "./shipObjArr.js";
import { createBattleground } from "./battleground.js";
import { updateTiles } from "./tilesManipulation.js";
import { addShips, makeMove } from "./gui.js";
import { createRandomPos } from "./new.js";
import { newComputer } from "./computer.js";

const main = function(){
    const makefleet = Makefleet();
    let playersShipArr = createShipsArr(makefleet);
    init(playersShipArr, createRandomPos);
  
    let opponentsShpArr = createShipsArr(makefleet);
    init(opponentsShpArr, createRandomPos);
  
    let PlayersBattleground = createBattleground();
    let OpponentsBattleground = createBattleground();
  
    updateTiles(playersShipArr, PlayersBattleground);
    updateTiles(opponentsShpArr, OpponentsBattleground)
    addShips(playersShipArr);
  
    let computer = newComputer();
    let makeComputerMove = computer.makeComputerMove.bind(computer);
  
    addlisteners(opponentsShpArr, OpponentsBattleground, makeComputerMove, playersShipArr, PlayersBattleground);
}

main();

function addlisteners(arr, tiles, respondingMove, arr1, tiles1){ //adds click listeners to the opponent's array, attack the tile when clicked
    document.querySelectorAll(".opponent .cell").forEach(c => {
        c.addEventListener("click", (e)=>{
            makeMove(e.target, arr, tiles, respondingMove, arr1, tiles1);
        })
    });
    let elclone;
    document.querySelector(".random").addEventListener("click", ()=> {
      document.querySelectorAll(".ship-block").forEach(e => {
        e.remove();
      })
      document.querySelectorAll(".opponent .cell").forEach(c => {
        elclone = c.cloneNode(true);
        c.parentNode.replaceChild(elclone, c);
      });
      main();
    })
    document.querySelector(".play").addEventListener("click", (e)=> {
      e.target.classList.add('none');
      document.querySelector(".opponent .battlefield-table").classList.remove("noclick");
      document.querySelector(".random").classList.add("none");
      document.querySelector(".newgame").classList.remove("none");
    });
    document.querySelector(".newgame").addEventListener("click", ()=>{
      document.querySelectorAll(".cell").forEach((e)=>{
        e.classList.remove("missed");
        e.classList.remove("hit");
        e.classList.add("empty");
      });
      document.querySelectorAll(".ship-block").forEach(e => {
        e.remove();
      })
      document.querySelectorAll(".opponent .cell").forEach(c => {
        elclone = c.cloneNode(true);
        c.parentNode.replaceChild(elclone, c);
      });
      document.querySelector(".opponent .battlefield-table").classList.remove("noclick");
      main();
    });
    document.getElementById("ok").addEventListener("click", ()=> {
      document.querySelector(".gameover").classList.add("none");
      document.querySelector(".opponent .battlefield-table").classList.add("noclick");
      document.querySelector(".random").classList.remove("none");
      document.querySelector(".newgame").classList.add("none");
      document.querySelector(".play").classList.remove("none");
      document.querySelectorAll(".cell").forEach((e)=>{
        e.classList.remove("missed");
        e.classList.remove("hit");
        e.classList.add("empty");
      });
      document.querySelectorAll(".ship-block").forEach(e => {
        e.remove();
      })
      document.querySelectorAll(".opponent .cell").forEach(c => {
        elclone = c.cloneNode(true);
        c.parentNode.replaceChild(elclone, c);
      });
      main();
    })
  }