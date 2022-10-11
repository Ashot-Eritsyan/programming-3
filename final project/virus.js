let LivingCreature = require('./LivingCreature')

module.exports = class Virus extends LivingCreature{
    constructor(x, y, index) {
        super(x,y)
        this.index = index;
        this.multiply = 0;
     
    }

    chooseCell(character) {
        return super.chooseCell(character)
     }
     


     mul () {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
 
        
        if(newCell && this.multiply >= 30){
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
 
            var newVirus = new Virus(newX, newY, 1);
            virus.push(newVirus);
            this.multiply = 0;
        }
    }
 
     
}
