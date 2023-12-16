import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";

const monsterTable = [
    {
        name: 'Ogre',
        color: 'lightgrey',
        ascii: 'O',
        offset: { x: 2, y: 3 },
        health: 6
    },
    {
        name: 'Kobold',
        color: 'green',
        ascii: 'K',
        offset: { x: 4, y: 3 },
        health: 3
    },
    {
        name: 'Slim',
        color: 'darkgreen',
        ascii: 'S',
        offset: { x: 3, y: 2 },
        health: 2
    },
    {
        name: 'Dragon',
        color: 'red',
        ascii: 'D',
        offset: { x: 2, y: 3 },
        health: 10
    }
]
const lootTable = [
    {
        name: 'long Sward',
        color: 'darkgrey',
        ascii: '/',
        offset: { x: 6, y: 3 }
    },
    {
        name: 'Health Potion',
        color: 'red',
        ascii: '!',
        offset: { x: 6, y: 3 }
    },
    {
        name: 'Gold Coin',
        color: 'yellow',
        ascii: '$',
        offset: { x: 3, y: 3 }
    },
    {
        name: 'Light Armor',
        color: 'lightgrey',
        ascii: '#',
        offset: { x: 4, y: 3 }
    }
]

class Spwaner {
    constructor(world) {
        this.world = world;
    }
    spwan(spwanCount, createEntity) {
        for (let count = 0; count < spwanCount; count++) {
            let entity = createEntity();
            this.world.add(entity);
            this.world.moveToSpace(entity);
        }
    }

    spwanLoot(spwanCount) {
        this.spwan(spwanCount, () => {
            return new Loot(
                getRandomInt(this.world.width - 1), // Use width instead of weight
                getRandomInt(this.world.height - 1),
                this.world.tilesize,
                lootTable[getRandomInt(lootTable.length)]
            );
        });
    };


    spwanMonster(spwanCount) {
        this.spwan(spwanCount, () => {
            return new Monster(
                getRandomInt(this.world.width - 1), // Use width instead of weight
                getRandomInt(this.world.height - 1),
                this.world.tilesize,
                monsterTable[getRandomInt(monsterTable.length)]
            );
        });
    }

    spwanStairs() {
        let stairs = new Stairs(
            this.world.width - 10,
            this.world.height - 10,
            this.world.tilesize
        );
        this.world.add(stairs);
        this.world.moveToSpace(stairs);
    }


}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


export default Spwaner;