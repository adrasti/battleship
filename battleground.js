
function createBattleground (){
    let arr = new Array(10);
    for (let i = 0; i < 10; i++) {
    arr[i] = new Array(10);
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            arr[i][j] = {
                id: -1,
                hit: false
            }
        }
    }

return {
    battleground: arr,
    count: 10
}
}

export {createBattleground}