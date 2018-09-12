(function() {
    
function GameOfLife(size){
    this.size = size;
    this.golArr = [];
}

GameOfLife.prototype.initialize = function(){
    for(var i=0; i<this.size; ++i){
        var row = []
        for(var j=0; j<this.size; ++j){
            row.push(((Math.random()*100)>5 ? 1 : 0));
            // row.push(0);
        }
        this.golArr.push(row);
    }
}

GameOfLife.prototype.writeToScreen = function(){
    document.getElementById('game-of-life').innerHTML = "";
    this.golArr.map(row=>{
        var rowDiv = document.createElement('div');
        rowDiv.className = 'gol-row';
        row.map( column =>{
            var columnDiv = document.createElement('div');
            var className = column? 'alive' : '';
            className+= ' gol-col';
            columnDiv.className = className;
            rowDiv.appendChild(columnDiv)
            columnDiv.addEventListener('click',(event)=>{
                if(event.target.classList.contains('alive')){
                    event.target.classList.remove('alive');
                }else{
                    event.target.classList.add('alive');
                }
            });
        });
        document.getElementById('game-of-life').appendChild(rowDiv);
    });
}

GameOfLife.prototype.readFromScreen = function(){
    var grid = document.getElementById('game-of-life');
    var rows = grid.children;
    for(var i=0; i<rows.length; ++i){
        var row = rows[i].children;
        for (var j=0 ; j< row.length ; ++j){
            var column = row[j];
            this.golArr[i][j] = column.classList.contains('alive') ? 1 : 0;
        }
    }
}

GameOfLife.prototype.nextGeneration = function(){
    /* Find alive neighbours */
    var tempArr = JSON.parse(JSON.stringify(this.golArr));
    for(var i=0; i<this.size; ++i){
        for(var j=0; j<this.size; ++j){
            var aliveNeighbours = 0;
            for(var k=-1; k<2; ++k){
                for(var l=-1; l<2; ++l){
                    if(!(i+k === -1|| j+l ===-1) && ((i+k)<this.size) && ((j+l)<this.size)){
                        aliveNeighbours += this.golArr[i+k][j+l];
                    }
                }
            }
            /* Subtract current element since it's also being added as a neighbour */
            aliveNeighbours -= this.golArr[i][j];
            /* Be god */
            if(aliveNeighbours<2 && this.golArr[i][j]){
                tempArr[i][j] = 0;
            }else if((aliveNeighbours===2 || aliveNeighbours ==3)&& this.golArr[i][j]){
                tempArr[i][j] = 1;
            }else if((aliveNeighbours>3) && this.golArr[i][j]){
                tempArr[i][j] = 0;
            }else if((aliveNeighbours === 3) && !this.golArr[i][j]){
                tempArr[i][j] = 1
            }
        }
    }
    this.golArr = JSON.parse(JSON.stringify(tempArr));
}

var gol = new GameOfLife (20);
gol.initialize();
gol.writeToScreen();

document.getElementById('start-game-of-life').addEventListener('click',()=>{
    var interval = setInterval(()=>{
        gol.readFromScreen();
        gol.nextGeneration();
        gol.writeToScreen();
    },100);

    document.getElementById('stop-game-of-life').addEventListener('click',()=>{
        clearInterval(interval);
    })
})
 })();