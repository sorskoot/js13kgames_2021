/// <reference path="../../typings/playcanvas.d.ts" />

export class LevelController {
    constructor(app) {
        this.app = app;
        // create a grid of cubes
        const SIZE = 16;
        for (let x = 0; x < SIZE; x++) {
            for (let y = 0; y < SIZE; y++) {
                this.createCube(2 * x - SIZE, -1.5, 2 * y - SIZE);
            }
        }
    }

   createCube(x, y, z) {
        const cube = new pc.Entity();
        cube.addComponent("render", {
            type: "box"
        });
        cube.setLocalScale(1, 1, 1);
        cube.translate(x, y, z);
        this.app.root.addChild(cube);
    };
};