import Entity from "./Entity";
import Spwaner from "./Spwaner";
class Stairs extends Entity {
    attributes = {
        name: 'Stairs',
        color: 'orange',
        ascii: '>',
        offset: { x: 2, y: 2 }
    };


    action(verb, world) {
        if (verb === 'bump') {
            world.addToHistory('You move down the stairs');
            world.CreateCellularMap();
            world.player.x = 0;
            world.player.y = 0;
            world.moveToSpace(world.player);
            world.entities = world.entities.filter(e => e === world.player);
            let spwaner = new Spwaner(world);
            spwaner.spwanLoot(10);
            spwaner.spwanMonster(6);
            spwaner.spwanStairs();
        }
    }
}

export default Stairs;