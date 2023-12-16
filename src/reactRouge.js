// ReactRouge.js
import React, { useRef, useEffect, useState } from "react";
import InputManager from "./inputManager"; // Make sure the filename is correct
// import Player from "./player";
import World from "./World";
import Spwaner from "./Spwaner";

const ReactRouge = ({ width, height, tilesize }) => {
    const canvasRef = useRef();
    const [world, setWorld] = useState(() => {
        const newWorld = new World(width, height, tilesize);
        newWorld.CreateCellularMap();
        newWorld.moveToSpace(newWorld.player);
        const spawner = new Spwaner(newWorld);
        spawner.spwanLoot(10);
        spawner.spwanMonster(6);
        return newWorld;
    });


    // eslint-disable-next-line react-hooks/exhaustive-deps
    let inputManager = new InputManager();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleInput = (action, data) => {

        console.log(`handle action:${action} :${JSON.stringify(data)}`);
        let newWorld = new World();

        Object.assign(newWorld, world);
        newWorld.movePlayer(data.x, data.y);
        setWorld(newWorld);
    }

    // useEffect(() => {
    //     console.log("create Map");
    //     let newWorld = new World();

    //     Object.assign(newWorld, world);
    //     newWorld.CreateCellularMap();
    //     newWorld.moveToSpace(world.player);
    //     let spwaner = new Spwaner(newWorld);
    //     spwaner.spwanLoot(10);
    //     spwaner.spwanMonster(4);

    //     setWorld(newWorld);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    useEffect(() => {
        console.log("binding my input manager");
        inputManager.bindKeys();
        inputManager.subscribe(handleInput);

        return () => {
            inputManager.unbindKeys();
            inputManager.unsubscribe(handleInput);
        }
    }, [inputManager, handleInput]); // Empty dependency array

    useEffect(() => {
        console.log("Draw canvas");

        // Check if canvasRef.current is defined before accessing its properties
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            // Clear the canvas
            ctx.clearRect(0, 0, width * tilesize, height * tilesize);

            world.draw(ctx);
        }
    }, [width, height, tilesize, world]);

    return (
        <>
            <canvas
                ref={canvasRef}
                width={width * tilesize}
                height={height * tilesize}
                style={{ border: '1px solid black', background: 'DimGray' }}></canvas>
            <ul>
                {world.player.inventory.map((item, index) => (<li key={index}> {item.attributes.name} </li>))}
            </ul>
            <ul>
                {world.history.map((item, index) => (
                    <li key={index}>
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ReactRouge;
