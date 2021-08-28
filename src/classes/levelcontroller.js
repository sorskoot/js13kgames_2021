/// <reference path="../../typings/playcanvas.d.ts" />

const LevelData = [{
    width: 7,
    height: 7,
    layer: [{
        data: [
            [1, 12, 10, 12, 10, 12, 1],
            [10, 'S', 0, 0, 0, 1, 0],
            [12, 0, 1, 0, 0, 0, 12],
            [10, 0, 'B', 0, 0, 'T', 10],
            [12, 0, 1, 0, 0, 0, 8],
            [10, 0, 0, 0, 0, 1, 0],
            [1, 12, 10, 12, 10, 12, 1]
        ]
    },
    {
        data: [
            [0, 3, 3, 3, 3, 3, 0],
            [11, 0, 0, 0, 0, 0, 11],
            [11, 0, 1, 0, 0, 0, 11],
            [11, 0, 0, 0, 0, 0, 11],
            [11, 0, 1, 0, 0, 0, 9],
            [11, 0, 0, 0, 0, 0, 11],
            [0, 11, 11, 11, 11, 11, 0]
        ]
    }],
}];

export class LevelController {

    constructor(app, tilesTexture, shader) {
        this.app = app;
        this.tilesTexture = tilesTexture;
        this.shader = shader;
        this.currentLevel = 0;
        this.boxMaterial = new pc.Material();
    }

    /**
     * 
     * @type {pc.vec3} Camera position
     */
    init() {
        this.material = [];
        this.shapes = [];
        this.tilesTexture.resource.magFilter =
            this.tilesTexture.resource.minFilter = pc.FILTER_NEAREST
        for (let i = 0; i < 16; i++) {
            let mat = new pc.Material();
            mat.setShader(this.shader);
            mat.setParameter('index', i);
            mat.setParameter('DiffuseTexture', this.tilesTexture.resource);
            mat.setParameter('spriteDimensions', [16.0, 1.0]);
            mat.setParameter('repeat', [1, 1]);
            mat.setParameter('tint', [0, 0, 0, 0]);
            mat.update();
            this.material.push(mat);
        }
        let cameraposition = new pc.Vec3(0, 0, 0);

        // create a grid of cubes
        for (let layer = 0; layer < LevelData[this.currentLevel].layer.length; layer++) {
            for (let row = 0; row < LevelData[this.currentLevel].layer[layer].data.length; row++) {
                for (let col = 0; col < LevelData[this.currentLevel].layer[layer].data[row].length; col++) {
                    let tile = LevelData[this.currentLevel].layer[layer].data[row][col];
                    if (layer == 0) {
                        if (tile == 'S' || tile == 'B' || tile == 0) {
                            let shape = new pc.Entity();
                            shape.addComponent("script");
                            shape.script.create('shape');
                            shape.tags.add("floor");
                            shape.name = 'floory';
                            shape.setLocalPosition(row - LevelData[this.currentLevel].width / 2, -1.5, col - LevelData[this.currentLevel].height / 2);
                            shape.setLocalScale(1, .01, 1);

                            this.app.root.addChild(shape);
                            this.shapes.push(shape);
                        }
                    }
                    if (tile === 0) {
                        continue;
                    }
                    switch (tile) {
                        case 'S':
                            cameraposition = new pc.Vec3(
                                col - LevelData[this.currentLevel].width / 2,
                                -1.5,
                                row - LevelData[this.currentLevel].height / 2);

                            break;
                        case 'B':
                            this.createBox(row - LevelData[this.currentLevel].width / 2, col - LevelData[this.currentLevel].height / 2, layer - 1);
                            break;
                        case 'T':
                            this.createTarget(row - LevelData[this.currentLevel].width / 2, col - LevelData[this.currentLevel].height / 2, layer - 1);
                            break;
                        default:
                            this.createCube(row - LevelData[this.currentLevel].width / 2, layer - 1, col - LevelData[this.currentLevel].height / 2, tile);
                            break;
                    }
                }
            }
        }
        this.createFloor(LevelData[this.currentLevel].width, LevelData[this.currentLevel].height, -1);
        this.createCeiling(LevelData[this.currentLevel].width, LevelData[this.currentLevel].height, LevelData[this.currentLevel].layer.length - 1);

        return cameraposition;
    }

    createFloor(width, height, floor) {
        const floorMaterial = new pc.Material();
        this.tilesTexture.resource.magFilter =
            this.tilesTexture.resource.minFilter = pc.FILTER_NEAREST

        floorMaterial.setShader(this.shader);
        floorMaterial.setParameter('index', 3);
        floorMaterial.setParameter('DiffuseTexture', this.tilesTexture.resource);
        floorMaterial.setParameter('spriteDimensions', [16.0, 1.0]);
        floorMaterial.setParameter('repeat', [width, height]);
        floorMaterial.setParameter('', [0, 0, 0, 0]);
        floorMaterial.update();

        const floorEntity = new pc.Entity();
        floorEntity.addComponent("model", {
            type: "plane"
        });
        floorEntity.model.material = floorMaterial;
        floorEntity.setLocalScale(width, 1, height);
        floorEntity.translate(-.5, floor - .5, -.5);

        this.app.root.addChild(floorEntity);
    }

    createCeiling(width, height, ceiling) {
        const ceilingMaterial = new pc.Material();
        this.tilesTexture.resource.magFilter =
            this.tilesTexture.resource.minFilter = pc.FILTER_NEAREST

        ceilingMaterial.setShader(this.shader);
        ceilingMaterial.setParameter('index', 4);
        ceilingMaterial.setParameter('DiffuseTexture', this.tilesTexture.resource);
        ceilingMaterial.setParameter('spriteDimensions', [16.0, 1.0]);
        ceilingMaterial.setParameter('repeat', [width, height]);
        ceilingMaterial.setParameter('tint', [0, 0, 0, 0]);
        ceilingMaterial.update();

        const ceilingEntity = new pc.Entity();
        ceilingEntity.addComponent("model", {
            type: "plane"
        });
        ceilingEntity.model.material = ceilingMaterial;
        ceilingEntity.setLocalScale(width, -1, height);
        ceilingEntity.translate(-.5, ceiling - .5, -.5);
        this.app.root.addChild(ceilingEntity);
    }
    createTarget(x, y, floor) {
        const targetMaterial = new pc.Material();
        this.tilesTexture.resource.magFilter =
            this.tilesTexture.resource.minFilter = pc.FILTER_NEAREST

        targetMaterial.setShader(this.shader);
        targetMaterial.setParameter('index', 6);
        targetMaterial.setParameter('DiffuseTexture', this.tilesTexture.resource);
        targetMaterial.setParameter('spriteDimensions', [16.0, 1.0]);
        targetMaterial.setParameter('repeat', [1, 1]);
        targetMaterial.setParameter('tint', [0, 0, 0, 0]);
        targetMaterial.update();

        const targetEntity = new pc.Entity();
        targetEntity.addComponent("model", {
            type: "plane"
        });
        targetEntity.model.material = targetMaterial;
        targetEntity.translate(x, floor - .499, y);
        this.app.root.addChild(targetEntity);
    }



    createBox(x, y, floor) {

        this.tilesTexture.resource.magFilter =
            this.tilesTexture.resource.minFilter = pc.FILTER_NEAREST

        this.boxMaterial.setShader(this.shader);
        this.boxMaterial.setParameter('index', 5);
        this.boxMaterial.setParameter('DiffuseTexture', this.tilesTexture.resource);
        this.boxMaterial.setParameter('spriteDimensions', [16.0, 1.0]);
        this.boxMaterial.setParameter('repeat', [0.9, 0.9]);
        this.boxMaterial.setParameter('tint', [0, 0, 0, 0]);
        this.boxMaterial.update();

        const boxEntity = new pc.Entity();
        boxEntity.addComponent("model", {
            type: "box"
        });
        boxEntity.model.material = this.boxMaterial;
        boxEntity.translate(x, floor - 0.05, y);
        boxEntity.setLocalScale(.9, .9, .9);
        boxEntity.addComponent("script");
        boxEntity.script.create('shape', {
            attributes: {
                keepUpdating: true
            }
        });
        boxEntity.script.create('boxController');
        boxEntity.addComponent("rigidbody", {
            type: pc.BODYTYPE_DYNAMIC,
            mass: 10
        });

        boxEntity.tags.add('box');
        boxEntity.name = 'boxy';
        this.app.root.addChild(boxEntity);
    }

    createCube(x, y, z, tileIndex) {


        // const group = new pc.Entity();
        // const box = new pc.Entity();
        // box.addComponent('model', {
        //     type: 'box'
        // });
        // box.model.material = borderMat;
        // box.translate(0, 0, -5);
        // group.addChild(box);

        const cube = new pc.Entity();
        cube.addComponent("render", {
            type: "box"
        });
        cube.setLocalScale(1, 1, 1);
        cube.translate(x, y, z);
        cube.render.material = this.material[tileIndex - 1];

        this.app.root.addChild(cube);
    };

    /**
     * 
     * @param {pc.Vec3} position current position of the box
     * @param {pc.Vec3} direction direction of movement
     * @param {pc.Vec3} targetPosition set to the position of the target
     * @returns true if the box can move to the destination
     */
    tryMoveBox(position, direction, targetPosition) {
        const pos = new pc.Vec2(position.x + LevelData[this.currentLevel].width / 2, position.z + LevelData[this.currentLevel].height / 2);
        const dir = new pc.Vec2(direction.x, direction.z);
        const target = pos.add(dir);
        const targetTile = LevelData[this.currentLevel].layer[0].data[target.x][target.y];
        if (targetTile === 0) {
            targetPosition.set(
                target.x - LevelData[this.currentLevel].width / 2, 
                position.y, 
                target.y - LevelData[this.currentLevel].height / 2);
        }
        return targetTile === 0;
    }
};