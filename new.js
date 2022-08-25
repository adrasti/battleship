
  function createRandomPos(){ //randomly creates a new arrangement of ships, returns an array of objects which are
    let positions = [];                           // specified by the posobj function
    let arr = new Array(100);
    for(let i = 0; i < 100; i++){
        arr[i] = i;
    }
    let val;
    let pos;
  
    let k = new Array(10);
    for (let i = 0; i < 10; i++) {
        k[i] = new Array(10);
    }
  
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            k[i][j] = false;
        }
    }
    for (let i = 4; i > 0; i--) {
        for (let j = 0; j < 5-i; j++) {
            pos = (getRandom() < 0.5);
            val = Math.floor(getRandom() * arr.length);
            while(!isLegal(arr[val], i, pos, arr, k)){
                val = Math.floor(getRandom() * arr.length);
                pos = (getRandom() < 0.5);
            }
            positions.push(posObj(Math.floor(val / 10), val % 10, pos));
        }
    }
    positions.reverse();
    return(positions);
  
  }

  function posObj(x, y, pos){
    return {
        x: x,
        y: y,
        horpos: pos
    }
  }
  
  function getRandom() {
    return Math.random();
  }

  function isLegal(root, len, horpos, arr, tiles){ //returns true if the ship positioning is legal (not out of bounds, 
    let x = Math.floor(root / 10);                           // not adjacent to any another ship), false if not
    let y = root % 10;
    let posarray = new Set()
    if(horpos){
        if((y + len - 1) > 9) {
            return false;
        } else {
            for(let i = 0; i < len; i++){
                for(let c of [-1, 1, 0]){
                    for(let k of [-1, 1, 0]){
                        if(((x + c) >= 0) && ((x + c) <= 9) && ((y + i+ k) >= 0) && ((y + i + k) <= 9)){
                            if(tiles[x+c][y+i+k] === true) {
                                return false;
                            } else posarray.add((x+c)*10+y+i+k);
                        }
                    }
                }
            }
            for(let i = 0; i < len; i++){
                posarray.add(x*10+y+i);
                tiles[x][y+i] = true;
            }
            for(let k = 0; k < posarray.length; k++){
                arr.splice(arr.indexOf(posarray[k]), 1);
            }
            return true;
        }
    } else {
        if((x + len - 1) > 9) {
            return false;
        } else {
            for(let i = 0; i < len; i++){
                for(let c of [-1, 1, 0]){
                    for(let k of [-1, 1, 0]){
                        if(((x + i+c) >= 0) && ((x + i +c) <= 9) && ((y + k) >= 0) && ((y  + k) <= 9)){
                            if(tiles[x+i+c][y+k] === true){
                                return false;
                            } posarray.add((x+i+c)*10+y+k);
                        }
                    }
                }
            }
            for(let i = 0; i < len; i++){
                posarray.add((x+i)*10 + y);
                tiles[x+i][y] = true;
            }
            for(let k = 0; k < posarray.length; k++){
                arr.splice(arr.indexOf(posarray[k]), 1);
            }
            return true;
        }
    }
  
  }

export {createRandomPos}