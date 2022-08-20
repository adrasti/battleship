function updateTiles(arr, tiles) {
    let t, x, y;
    for(let i = 0; i < 10; i++){
        for(let k = 0; k < arr[i].size; k++){
            t = arr[i].tiles[k];
            x = Math.floor(t / 10);
            y = t % 10;
            tiles.battleground[x][y].id = i;
        }
    }
  }
  
  function attack(arr, tiles, x, y){
      let id = tiles.battleground[x][y].id;
      tiles.battleground[x][y].hit = true;
      if(id == -1){
          return 10;
      } else {
          arr[id].hit(x*10 + y);
          if(arr[id].isSunk()){
                  tiles.count--;
                  return id;
          } else return 11;
      }
  }

  export {updateTiles, attack}