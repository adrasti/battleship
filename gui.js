import { attack } from "./tilesManipulation.js";

function addShips(arr){
    let t, div, size;
    for(let i = 0; i < 10; i++){
      t = arr[i].root;
      div = document.createElement("div");
      div.classList.add("ship-block");
      size = arr[i].size;
      if(arr[i].horizontalPos){
        div.style.width = `${2*size}rem`;
        div.style.height = '2rem';
        div.style.paddingRight = `${(size-1)}px`
      } else {
        div.style.height = `${2*size}rem`;
        div.style.width = '2rem';
        div.style.paddingBottom = `${(size-1)}px`
      }
      document.querySelector(`[data-x="${Math.floor(t / 10)}"][data-y="${t % 10}"]`).appendChild(div);
    }
  }


function addlisteners(arr, tiles){
    document.querySelectorAll(".opponent .cell").forEach(c => {
        c.addEventListener("click", e=>{
            makeMove(e.target, arr, tiles);
        })
    })
}









  function makeMove(e, arr, bground){
    let x = Number(e.dataset.x);
    let y = Number(e.dataset.y);
    const parent = e.parentElement;
    if(!parent.classList.contains("empty")){
        return;
    }
    parent.classList.remove("empty");
    const n = attack(arr, bground, x, y);
    let el;
    if(n == 10){
        parent.classList.add("missed");
    } else if(n == 11){
        parent.classList.add("hit");
        if(((x-1) >= 0) && ((y-1) >=0)){
            el = document.querySelector(`.opponent [data-x="${x-1}"][data-y="${y-1}"]`).parentElement;
            el.classList.add("missed");
            el.classList.remove("empty");
        }
        if(((x+1) <= 9) && ((y-1) >=0)){
            el = document.querySelector(`.opponent [data-x="${x+1}"][data-y="${y-1}"]`).parentElement;
            el.classList.add("missed");
            el.classList.remove("empty");
        }
        if(((x-1) >= 0) && ((y+1) <= 9)){
            el = document.querySelector(`.opponent [data-x="${x-1}"][data-y="${y+1}"]`).parentElement;
            el.classList.add("missed");
            el.classList.remove("empty");
        }
        if(((x+1) <= 9) && ((y+1) <= 9)){
            el = document.querySelector(`.opponent [data-x="${x+1}"][data-y="${y+1}"]`).parentElement;
            el.classList.add("missed");
            el.classList.remove("empty");
        }
    } else{
        parent.classList.add("hit");
        let r = arr[n].root;
        let s = arr[n].size;
        x = Math.floor(r / 10);
        y = r % 10;
        console.log(x, y)
        if(arr[n].horizontalPos){
            for(let i = 0; i < s; i++){
                for(let c of [-1, 1, 0]){
                    for(let k of [-1, 1, 0]){
                        if(((x + c) >= 0) && ((x + c) <= 9) && ((y + i+ k) >= 0) && ((y + i + k) <= 9) && !(c == 0 && ((i+k <= s-1) && (i+k>=0)))){
                            el = document.querySelector(`.opponent [data-x="${x+c}"][data-y="${y+i+k}"]`).parentElement;
                            el.classList.add("missed");
                            el.classList.remove("empty");   
                        }
                    }
                }
            }
        } else {
            for(let i = 0; i < s; i++){
                for(let c of [-1, 1, 0]){
                    for(let k of [-1, 1, 0]){
                        if(((x + i+c) >= 0) && ((x + i +c) <= 9) && ((y + k) >= 0) && ((y  + k) <= 9) && !(k == 0 && ((i+c <= s-1) && (i+c>=0)))){
                            el = document.querySelector(`.opponent [data-x="${x+i+c}"][data-y="${y+k}"]`).parentElement;
                            el.classList.add("missed");
                            el.classList.remove("empty");
                        }
                    }
                }
            }
        }
    }
    if(bground.count === 0){
        console.log("end");
    }
  }


  export {addShips, addlisteners}