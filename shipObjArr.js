

function createShipsArr(fl){  //creates array of ship objects, from smallest to largest in order: 1 1 1 1 2 2 2 3 3 4
    let Factory = fl.fleet();
    let arr = [];

    for (let i = 1; i < 5; i++) {
        for (let j = 0; j < 5-i; j++) {
            arr.push(Factory(i))
        }
    }
    return arr
}

function init(arr, pos){  //initializes the objects' tiles by parsing "pos" objects provided by the callback
    let positions = pos();
    for(let i = 0; i < 10; i++){
        if(!(positions[i]["horpos"])){
            arr[i].switchPos();
        }
        arr[i].updateTiles(positions[i]["x"], positions[i]["y"]);
    }
  } 


export {createShipsArr, init}

