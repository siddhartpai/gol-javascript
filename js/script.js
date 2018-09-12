(function() {
    
    var A  = [
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ]

function GameOfLife(size){
    this.size = size;
    this.golArr = [];
}

GameOfLife.prototype.initialize = function(){
    for(var i=0; i<this.size; ++i){
        var row = []
        for(var j=0; j<this.size; ++j){
            row.push(((Math.random()*100)>5 ? 1 : 0));
        }
        this.golArr.push(row);
    }
    console.log(this.golArr);
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
        var row = rows[i];
        for (var j=0 ; j< row.length ; ++j){
            var column = row[j];
            this.golArr[i][j] = column.className.substring('alive') === -1? 0 : 1;
        }
    }
    console.log('read Array :  ',this.golArr)
}

    
var gol = new GameOfLife (5);
// console.log(gol.size);
gol.initialize();
gol.writeToScreen();
gol.readFromScreen();
// gol.writeToScreen()

 })();