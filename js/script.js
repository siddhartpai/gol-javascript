(function() {
    
    var A  = [
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ]
    gameOfLife = (size) =>{
        return {
            golArr:[],
            initialize: ()=>{
                for(var i=0; i<size; ++i){
                    for(var j=0; j<size; ++j){
                        this.golArr[i][j] = 0;
                    }
                }
            },
            readFromScreen: ()=>{
                
            },
            writeToScreen: ()=>{
                        this.golArr.map(row=>{
                            var rowDiv = document.createElement('div');
                            rowDiv.className = 'gol-row';
                            row.map( column =>{
                                var columnDiv = document.createElement('div');
                                var className = column? 'alive' : '';
                                className+= ' gol-col';
                                columnDiv.className = className;
                                rowDiv.appendChild(columnDiv)
                            });
                            document.getElementById('game-of-life').appendChild(rowDiv);
                        });
            },
    
        }
    }
    var gol = gameOfLife(5);
    gol.initialize();
    gol.writeToScreen();
 
 })();