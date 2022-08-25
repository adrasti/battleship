import { attack } from "./tilesManipulation.js";

function newComputer(){
    const arr = new Array(100);
    for(let i = 0; i < 100; i++){
        arr[i] = i;
    }
    let timeout = 350;
    return {
      reset: function(){this.directions = [-10, 10, -1, 1]},
      directions: [-10, 10, -1, 1],
      last: -1,
      lastR: -1,
      setLast: function(n){
        this.last = n;
        this.lastR = n;
      },
      a: arr,
      tout: timeout,
      makeComputerMove: async function(arr, tiles){
        if(this.last == -1){
          let timeout = this.tout;
          let pos = Math.floor(getRandom() * this.a.length);
          let val = this.a[pos];
          if(this.a.includes(val)){
            console.log(val);
            this.a.splice(this.a.indexOf(val), 1);
          }
          let x = Math.floor(val / 10);
          let y = val % 10;
          const v = attack(arr, tiles, x, y);
          if(v==10){
            return new Promise(function(resolve){
              timeoutTurn(x, y, v, false,timeout, resolve);
            });
          } else if(v==11){
            for(let i of [-11, 11, -9, 9]){
              if(((val + i) >= 0) && ((val + i) < 100) && (Math.abs((val % 10) - ((val + i) % 10)) < 2)){
                if(this.a.includes(val+i)){
                  console.log(val + i);
                  this.a.splice(this.a.indexOf(val+i), 1);
                }
              }
            }
            this.setLast(val);
            return new Promise(function(resolve){
              timeoutTurn(x, y, v, true,timeout, resolve);
            });
          } else {
            for(let i of [-11, 11, -9, 9, -10, 10, -1, 1]){
              if(((val + i) >= 0) && ((val + i) < 100) && (Math.abs((val % 10) - ((val + i) % 10)) < 2)){ 
                if(this.a.includes(val+i)){
                  console.log(val+i);
                  this.a.splice(this.a.indexOf(val+i), 1);
                }
              }
            }
            return new Promise(function(resolve){
              timeoutTurn(x, y, v, true,timeout, resolve);
            });
          }
        } else {
          let timeout = this.tout;
          let val;
          let directions1 = [];
          for(let i = 0; i < this.directions.length; i++){
            directions1.push(this.directions[i]);
          }
          const last1 = this.last;
          const last2 = this.lastR;
          console.log(this.directions);
          let b = Math.floor(getRandom() * directions1.length);
          while(((last1 + directions1[b]) < 0) || ((last1 + directions1[b]) > 99) || !(this.a.includes(last1 + directions1[b])) || !(Math.abs((last1 % 10) - ((last1 + directions1[b]) % 10)) < 2)){
            directions1.splice(b, 1);
            b = Math.floor(getRandom() * directions1.length);
            console.log("last1");
            console.log(directions1);
            if(directions1.length == 0) break;
          }
          if(directions1.length == 0){
            b = Math.floor(getRandom() * this.directions.length);
            while((((last2 + this.directions[b])) < 0) || ((last2 + this.directions[b]) > 99) || !(this.a.includes(last2 + this.directions[b])) || !(Math.abs((last2 % 10) - ((last2 + this.directions[b]) % 10)) < 2)){
              if(((last2 + this.directions[b])) < 0){
                console.log('a');
              }
              if(((last2 + this.directions[b]) > 99)){
                console.log('b');
              }
              if(!(this.a.includes(last2 + this.directions[b]))){
                console.log('c');
              }
              if(!(Math.abs((last2 % 10) - ((last2 + this.directions[b]) % 10)) < 2)){
                console.log('d');
              }
  
              this.directions.splice(b, 1);
              b = Math.floor(getRandom() * this.directions.length);
              console.log("last2");
              console.log(this.directions);
              if(this.directions.length ==0) break;
            }
            val = last2 + this.directions[b];
          } else {
            val = last1 + directions1[b];
          }
          if(this.a.includes(val)){
            console.log(val);
            this.a.splice(this.a.indexOf(val), 1);
          }
          let x = Math.floor(val / 10);
          let y = val % 10;
          const v = attack(arr, tiles, x, y);
          if(v == 10){
            this.directions.splice(b, 1);
            return new Promise(function(resolve){
              timeoutTurn(x, y, v, false,timeout, resolve);
            });
          } else if(v == 11){
            for(let i of [-11, 11, -9, 9]){
              if(((val + i) >= 0) && ((val + i) < 100) && (Math.abs((val % 10) - ((val + i) % 10)) < 2)){
                if(this.a.includes(val+i)){
                  console.log(val + i);
                  this.a.splice(this.a.indexOf(val+i), 1);
                }
              }
            }
            if(((val - this.lastR) % 10) == 0){
              if(this.directions.includes(1)){
                this.directions.splice(this.directions.indexOf(1), 1);
              }
              if(this.directions.includes(-1)){
                this.directions.splice(this.directions.indexOf(-1), 1);
              }
            } else {
              if(this.directions.includes(10)){
                this.directions.splice(this.directions.indexOf(10), 1);
              }
              if(this.directions.includes(-10)){
                this.directions.splice(this.directions.indexOf(-10), 1);
              }
            }
            this.last = val;
            return new Promise(function(resolve){
              timeoutTurn(x, y, v, true,timeout, resolve);
            });
           
          } else {
            let size = arr[v].size;
            let ro = arr[v].root;
            if(arr[v].horizontalPos){
              for(let j = 0; j < size; j++){
                for(let i of [-11, 11, -9, 9, -10, 10, -1, 1]){
                  if(((ro + j+i) >= 0) && ((ro +j+ i) < 100) && (Math.abs(((ro + j) % 10) - ((ro+j+i) % 10)) < 2)){
                    if(this.a.includes(ro+j+i)){
                      console.log(ro+ i + j)
                      this.a.splice(this.a.indexOf(ro+i+j), 1);
                    }
                  }
                }
              } 
            } else {
              for(let j = 0; j < size; j++){
                for(let i of [-11, 11, -9, 9, -10, 10, -1, 1]){
                  if(((ro + j * 10 +i) >= 0) && ((ro +j * 10 + i) < 100) && (Math.abs(((ro + j*10) % 10) - ((ro+j*10+i) % 10)) < 2)){
                    if(this.a.includes(ro+j*10+i)){
                      console.log(ro + j*10 + i)
                      this.a.splice(this.a.indexOf(ro+i+j*10), 1);
                    }
                  }
                }
              }
            }
            this.reset();
            this.setLast(-1);
            return new Promise(function(resolve){
              timeoutTurn(x, y, v, true,timeout, resolve);
            });
          }
  
        }
      }
    }
  }

  function timeoutTurn(x, y, v, hit, time, resolve){
    setTimeout(function () {
      const el = document.querySelector(`.player [data-x="${x}"][data-y="${y}"]`).parentElement;
      if(hit){
        el.classList.add("hit");
      } else el.classList.add("missed");
      resolve(v);
    }, time);
}

function getRandom() {
    return Math.random();
  }

export {newComputer}