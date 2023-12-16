import Entity from "./Entity";

class Player extends Entity {
    inventory = [];

    attributes = {
        name: 'Player',
        ascii: '@',
        health: 10
    }

    add(item) {
        this.inventory.push(item);
    }
    move(dx, dy) {
        if (this.attributes.health <= 0) {
            return;
        }
        this.x += dx;
        this.y += dy;
    }

    copyPlayer() {
        let newPlayer = new Player();
        Object.assign(newPlayer, this);
        return newPlayer;
    }
}

export default Player;