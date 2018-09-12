(function() {
    
    function GameOfLife(){
        this.size = 5;
        this.golArr = [];
        this.tick = 0;
    }

    GameOfLife.prototype.initialize = function(size){
        this.size = size;
        this.clearScreen();
        this.clearTick();
        this.golArr = [];
        var randomness = document.querySelector('#random').checked;

        for(var i=0; i<this.size; ++i){
            var row = []
            for(var j=0; j<this.size; ++j){
                if(randomness){
                    row.push(((Math.random()*10)>5 ? 1 : 0));
                }else{
                    row.push(0);
                }
            }
            this.golArr.push(row);
        }
    }

    GameOfLife.prototype.writeToScreen = function(){
        this.clearScreen();
        this.golArr.map(row=>{
            var rowDiv = document.createElement('div');
            rowDiv.className = 'gol-row';
            row.map( column =>{
                var columnDiv = document.createElement('div');
                var className = column? 'alive' : 'dead';
                className+= ' gol-col';
                columnDiv.className = className;
                rowDiv.appendChild(columnDiv)
                columnDiv.addEventListener('click',(event)=>{
                    if(event.target.classList.contains('alive')){
                        event.target.classList.remove('alive');
                        event.target.classList.add('dead');
                    }else{
                        event.target.classList.add('alive');
                        event.target.classList.remove('dead');
                    }
                });
            });
            document.getElementById('game-of-life').appendChild(rowDiv);
        });
    }
    GameOfLife.prototype.clearScreen = function(){
        document.getElementById('game-of-life').innerHTML = "";
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
                /* Set Rules for Life */
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
    GameOfLife.prototype.updateTick = function(){
        this.tick +=1 ;
    }
    GameOfLife.prototype.clearTick = function() {
        this.tick = 0;
    }
    var gol = new GameOfLife ();

    document.getElementById('start-game-of-life').addEventListener('click',()=>{
        var interval = setInterval(()=>{
            gol.updateTick();
            gol.readFromScreen();
            gol.nextGeneration();
            gol.writeToScreen();
            document.getElementById('generation-count').innerHTML = gol.tick;
        },100);

        document.getElementById('stop-game-of-life').addEventListener('click',()=>{
            clearInterval(interval);
        });
    })
    document.getElementById('initialize-grid').addEventListener('click',()=>{
        // document.getElementById('game-of-life').innerHTML = "";
        gol.initialize(document.getElementById('size').value);
        gol.writeToScreen();
    });
 })();