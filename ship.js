var Makefleet = function() {
  var playerId = 0;

  function changeBy() {
    playerId += 1;
  }

  return {
    increment: function() {
      changeBy();
    },
    fleet: function(id = playerId) { 
      this.increment();
      return function(n) { return {
      playerId: id,
      root: undefined,
      size: n,
      horizontalPos: true,
      tiles: [],
      updateTiles: function(x, y){
        let c = x * 10 + y;
        this.root = c;
        if(this.horizontalPos){
          for(let i = 0; i < this.size; i++){
            this.tiles.push(c + i);
          }
        } else {
          for(let i = 0; i < this.size; i++){
            this.tiles.push(c + i * 10);
          }
        }
      },
      hit: function(tile){
        this.tiles.splice(this.tiles.indexOf(tile), 1)
      },
      isSunk: function(){
        if(this.tiles.length === 0){
          return true;
        } else return false;
      },
      switchPos: function(){
          this.horizontalPos = !this.horizontalPos;
      },
      reset: function(){
        this.tiles = [];
        this.horizontalPos = true;
      }
     } 
  }
  }
}
}

export {Makefleet}