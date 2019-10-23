import Tower from "../../Modules/Tower/Tower.js"

describe("Tower", function(){
    let tower = new Tower();
    it("Tower Creates Correctly", function(){
        chai.assert(tower.getFloor() == 1);
        chai.assert(tower.getWave() == 1);
    })

    
    it("getNextArea", function(){
        chai.assert(tower.getWave() == 1);
        chai.assert(tower.getFloor() == 1);
        climbToTopOfTower(tower);
        
        
        
    })
    it("isAtTop", function(){
        chai.assert(tower.isAtTop(tower.getFloor(), tower.getWave()) == true);
    })
    
    // it("towerReset", function(){
        
    //     chai.assert(tower.getFloor() == 100);
    //     chai.assert(tower.getWave() == 3);
    // })
})

function climbToTopOfTower(tower) {
    for(let floor = 1; floor <= 100; floor++){
        chai.assert(tower.getFloor() == floor);
        for(let wave = 1; wave <= 3; wave ++){
            chai.assert(tower.getWave() == (wave)); 
            
            if (wave == 3 && floor == 100) {
                break;
            }
            else{
                tower.getNextArea();
            }
        }
    } 
}
