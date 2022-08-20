function createShipsArr(fl){
    let Factory = fl.fleet();
    let arr = [];

    for (let i = 1; i < 5; i++) {
        for (let j = 0; j < 5-i; j++) {
            arr.push(Factory(i))
        }
    }
    return arr
}

function init(arr){
  arr[0].updateTiles(0, 5);
  arr[1].updateTiles(5, 3);
  arr[2].updateTiles(3, 8);
  arr[3].updateTiles(7, 8);
  arr[4].updateTiles(0, 0);
  arr[5].updateTiles(0, 8);
  arr[6].updateTiles(5, 6);
  arr[7].updateTiles(3, 4);
  arr[8].updateTiles(9, 0);
  arr[9].switchPos();
  arr[9].updateTiles(3, 1);
}

export {createShipsArr, init}