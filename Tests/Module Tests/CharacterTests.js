import Census from "../../Modules/Characters/Census.js";
import Character from "../../Modules/Characters/CharacterClass.js";
import ItemCatalog from "../../Modules/Item/ItemCatalogClass.js";


let census = new Census;

let assert = chai.assert;


let list_Of_Playable_Characters = ["Salamander", "Siren", "Sylph", "Golom"];
let list_Of_NonPlayable_Characters = ["Rotting Zombie"];
let list_Of_Bosses = ["Fat Zombie"];

describe("Character Module", function () {

    character_Builder_And_Tester(list_Of_Playable_Characters);
    character_Builder_And_Tester(list_Of_NonPlayable_Characters);
    bossBuilder(list_Of_Bosses);
    methodTest();
    applyLevelUpPoints();
    UnalteredStats();
    equipmetTests();
})

function methodTest() {
    let char = new Character("Salamander", "Salamander");
    it("getLevelUpPointsAtLevelOne", function () {
        assert(char.get_Level_Up_Points() == 0);
    })

    it("getLevelUpPointsAtLevelTwo", function () {
        char.level_Up()
        assert(char.get_Level_Up_Points() == char.get_All_Attributes().intelligence / 2)
    })

    let char2 = new Character("Salamander", "Salamander");
    it("FIXXXX---- Testing the addLevelUpPoints", function () {
        char2.add_Level_Up_Points(20)
        assert(char2.get_Level_Up_Points() == 10);
    })
}

function applyLevelUpPoints() {
    let char = new Character("Siren", "Siren");

    it("applyLevelUpPoints", function () {
        assert(char.get_All_Attributes().vitality == 400);
        assert(char.get_All_Attributes().might == 0);
        assert(char.get_All_Attributes().projection == 35);
        assert(char.get_All_Attributes().intelligence == 30);
        assert(char.get_All_Attributes().willpower == 5);
        assert(char.get_All_Attributes().agility == 100);
        assert(char.get_All_Attributes().fortitude == 15);
        assert(char.get_All_Attributes().intimidation == 15);
        char.apply_Level_Up_Points("intimidation");
        char.apply_Level_Up_Points("vitality");
        char.apply_Level_Up_Points("might");
        char.apply_Level_Up_Points("projection");
        char.apply_Level_Up_Points("intelligence");
        char.apply_Level_Up_Points("willpower");
        char.apply_Level_Up_Points("agility");
        char.apply_Level_Up_Points("fortitude");
        assert(char.get_All_Attributes().vitality == 410);
        assert(char.get_All_Attributes().might == 10);
        assert(char.get_All_Attributes().projection == 45);
        assert(char.get_All_Attributes().intelligence == 40);
        assert(char.get_All_Attributes().willpower == 15);
        assert(char.get_All_Attributes().agility == 110);
        assert(char.get_All_Attributes().fortitude == 25);
        assert(char.get_All_Attributes().intimidation == 25);
    })
}

function bossBuilder(list_Of_Bosses) {
    for (let boss in list_Of_Bosses) {
        let name_Of_Boss = list_Of_Bosses[boss]
        let bigBoss = new Character(name_Of_Boss, name_Of_Boss);
        let comparasonBoss = census.lookUp(name_Of_Boss);

        it("Can create a " + name_Of_Boss, function () {
            assert(bigBoss.get_Name() === list_Of_Bosses[boss]);
            assert(bigBoss.attribute_Comparer(comparasonBoss) === true);
        })
    }
}

function character_Builder_And_Tester(list_Of_Characters) {
    for (let character in list_Of_Characters) {
        let name_Of_Character = list_Of_Characters[character];
        let char = new Character(name_Of_Character, name_Of_Character);
        let character_For_Comparason = census.lookUp(name_Of_Character);

        it("Can create a " + name_Of_Character, function () {
            assert(char.get_Name() === list_Of_Characters[character]);
            experience_Incrementor(char);
            assert(char.attribute_Comparer(character_For_Comparason) === true);
            assert(char.get_Level_Up_Points() == 0)
            level_Incrementer(char);
        });
    }
}

function experience_Incrementor(char) {
    let accumulator = 0;
    for (let i = 0; i < 20; i++) {
        accumulator += i * 5;
        char.add_Experience(i * 5);
        assert(char.get_Experience() === accumulator);
    }
}

function level_Incrementer(char) {

    let previous_Might = char.get_All_Attributes().might
    let previous_Projection = char.get_All_Attributes().projection
    let previous_Vitality = char.get_All_Attributes().vitality
    let previous_Fortitude = char.get_All_Attributes().fortitude
    let previous_Agility = char.get_All_Attributes().agility
    let previous_Intelligence = char.get_All_Attributes().intelligence
    let previous_Willpower = char.get_All_Attributes().willpower
    let previous_Intimidation = char.get_All_Attributes().intimidation
    let guide = census.levelUpGuide(char.get_Name());
    for (let i = 0; i < 9; i++) {

        char.level_Up();
        assert(char.get_Level() === i + 2);
        assert(char.get_All_Attributes().might == previous_Might + guide.might * (i + 1));
        assert(char.get_All_Attributes().projection == previous_Projection + guide.projection * (i + 1));
        assert(char.get_All_Attributes().vitality == previous_Vitality + guide.vitality * (i + 1));
        assert(char.get_All_Attributes().fortitude == previous_Fortitude + guide.fortitude * (i + 1));
        assert(char.get_All_Attributes().agility == previous_Agility + guide.agility * (i + 1));
        assert(char.get_All_Attributes().intelligence == previous_Intelligence + guide.intelligence * (i + 1));
        assert(char.get_All_Attributes().willpower == previous_Willpower + guide.willpower * (i + 1));
        assert(char.get_All_Attributes().intimidation == previous_Intimidation + guide.intimidation * (i + 1));
    }
}

function UnalteredStats(){
    it("Initiates unaltered stats to the correct values", function(){
        let char = new Character("Salamander", "Salamander");
        assert(char.getUnalteredVitality() == char.get_All_Attributes().vitality);
        assert(char.getUnalteredProjection() == char.get_All_Attributes().projection);
        assert(char.getUnalteredMight() == char.get_All_Attributes().might);
        assert(char.getUnalteredFortitude() == char.get_All_Attributes().fortitude);
    })

    it("levelUp changes unaltered stats to the correct values", function(){
        let char = new Character("Salamander", "Salamander");
        char.level_Up();
        assert(char.getUnalteredVitality() == char.get_All_Attributes().vitality);
        assert(char.getUnalteredProjection() == char.get_All_Attributes().projection);
        assert(char.getUnalteredMight() == char.get_All_Attributes().might);
        assert(char.getUnalteredFortitude() == char.get_All_Attributes().fortitude);
    })
}

function equipmetTests(){
    let char = new Character("Salamander", "Salamander");
    let catalog = new ItemCatalog;
    let item = catalog.getItem("Worlds End");
    it("Character can equip an item", function(){
        char.equip(item);
        assert(char.get_All_Attributes().projection == char.getUnalteredProjection() + item.getStats().projection);
    })

    it("Character can unequip an item", function(){
        char.unequip(item);
        assert(char.get_All_Attributes().projection == char.getUnalteredProjection() + 0);
    })
}
