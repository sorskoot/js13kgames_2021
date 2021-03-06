/// <reference path="../../typings/playcanvas.d.ts" />

import { sound } from './sound';
import { LevelData } from './levelData';

const numOfSprites = 17.0;

//               1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17 
const indexes = [, , 4, , , , , , 1, , , , 5, , 3, 2,];

var LevelController = pc.createScript('levelController');

LevelController.prototype.initialize = function () {
    this.app.levelController = this;
    this.tilesTexture = this.app.assets.find("tiles", "texture").resource;
    this.colorsTexture = this.app.assets.find("colors", "texture").resource;

    this.shader = this.app.assets.find("shader", "shader").resource;

    this.cl = 0;
    this.boxMaterial = new pc.Material();

    this.material = [];
    this.shapes = [];

    this.tilesTexture.magFilter =
        this.tilesTexture.minFilter = pc.FILTER_NEAREST;

    this.colorsTexture.magFilter =
        this.colorsTexture.minFilter = pc.FILTER_NEAREST;

    this.app.root.on("box:onTarget", this.onTarget, this);
    this.app.root.on("box:offTarget", this.offTarget, this);
    this.app.root.on("box:onNewTile", this.onNewTile, this);
    this.app.root.on("box:doneMoving", this.calculateTargets, this);

    for (let i = 0; i < numOfSprites; i++) {
        let mat = new pc.Material();
        mat.setShader(this.shader);
        mat.setParameter('index', i);
        mat.setParameter('DiffuseTexture', this.tilesTexture);
        mat.setParameter('Lookup', this.colorsTexture);
        mat.setParameter('spriteDimensions', [numOfSprites, 1.0]);
        mat.setParameter('repeat', [1, 1]);
        mat.setParameter('tint', [0, 0, 0, 0]);
        mat.update();
        this.material.push(mat);
    }
}



LevelController.prototype.createLevel = function () {
    this.shapes = [];
    this.levelGeometry = new pc.Entity();
    this.levelGeometry.enabled = false;
    this.app.root.addChild(this.levelGeometry);
    this.currentLevelData = JSON.parse(JSON.stringify(LevelData[this.cl]));
    this.targetsToComplete = 0;

    let cameraposition = new pc.Vec3(0, 0, 0);

    // create a grid of cubes
    for (let layer = 0; layer < LevelData[this.cl].layer.length; layer++) {
        for (let row = 0; row < LevelData[this.cl].layer[layer].data.length; row++) {
            for (let col = 0; col < LevelData[this.cl].layer[layer].data[row].length; col++) {
                let tile = LevelData[this.cl].layer[layer].data[row][col];
                if (layer == 0) {
                    if (tile == 'S' || tile == 'B' || tile == 0 || tile == 'T') {
                        let shape = new pc.Entity();
                        shape.addComponent("script");
                        shape.script.create('shape');
                        shape.tags.add("floor");
                        shape.setLocalPosition(row - LevelData[this.cl].width / 2, 0, col - LevelData[this.cl].height / 2);
                        shape.setLocalScale(1, .01, 1);
                        this.levelGeometry.addChild(shape);
                        this.shapes.push(shape);
                    }
                }
                if (tile == 0) {
                    continue;
                }
                switch (tile) {
                    case 'S':
                        cameraposition = new pc.Vec3(
                            row - LevelData[this.cl].width / 2,
                            0,
                            col - LevelData[this.cl].height / 2);

                        break;
                    case 'B':
                        this.createBox(row - LevelData[this.cl].width / 2, col - LevelData[this.cl].height / 2, layer);
                        break;
                    case 'T':
                        this.createTarget(row - LevelData[this.cl].width / 2, col - LevelData[this.cl].height / 2, layer);
                        this.targetsToComplete++;
                        break;

                    default:
                        this.createCube(row - LevelData[this.cl].width / 2, layer, col - LevelData[this.cl].height / 2, tile);
                        break;
                }
            }
        }
    }
    this.createFloor(LevelData[this.cl].width, LevelData[this.cl].height, 0);
    this.createCeiling(LevelData[this.cl].width, LevelData[this.cl].height, LevelData[this.cl].layer.length);
    this.app.fire("teleport:to", cameraposition, LevelData[this.cl].cam);
}

LevelController.prototype.createFloor = function (width, height, floor) {
    const floorMaterial = new pc.Material();
    this.tilesTexture.magFilter =
        this.tilesTexture.minFilter = pc.FILTER_NEAREST

    floorMaterial.setShader(this.shader);
    floorMaterial.setParameter('index', 3);
    floorMaterial.setParameter('DiffuseTexture', this.tilesTexture);
    floorMaterial.setParameter('spriteDimensions', [numOfSprites, 1.0]);
    floorMaterial.setParameter('repeat', [width, height]);
    floorMaterial.setParameter('', [0, 0, 0, 0]);
    floorMaterial.update();

    const floorEntity = new pc.Entity();
    floorEntity.addComponent("model", {
        type: "plane"
    });
    floorEntity.model.material = floorMaterial;
    floorEntity.setLocalScale(width, 1, height);
    floorEntity.translate(-.5, floor, -.5);

    this.levelGeometry.addChild(floorEntity);
}

LevelController.prototype.createCeiling = function (width, height, ceiling) {
    const ceilingMaterial = new pc.Material();
    this.tilesTexture.magFilter =
        this.tilesTexture.minFilter = pc.FILTER_NEAREST

    ceilingMaterial.setShader(this.shader);
    ceilingMaterial.setParameter('index', 4);
    ceilingMaterial.setParameter('DiffuseTexture', this.tilesTexture);
    ceilingMaterial.setParameter('spriteDimensions', [numOfSprites, 1.0]);
    ceilingMaterial.setParameter('repeat', [width, height]);
    ceilingMaterial.setParameter('tint', [0, 0, 0, 0]);
    ceilingMaterial.update();

    const ceilingEntity = new pc.Entity();
    ceilingEntity.addComponent("model", {
        type: "plane"
    });
    ceilingEntity.model.material = ceilingMaterial;
    ceilingEntity.setLocalScale(width, -1, height);
    ceilingEntity.translate(-.5, ceiling, -.5);
    this.levelGeometry.addChild(ceilingEntity);
}
LevelController.prototype.createTarget = function (x, y, floor) {
    const targetMaterial = new pc.Material();
    this.tilesTexture.magFilter =
        this.tilesTexture.minFilter = pc.FILTER_NEAREST

    targetMaterial.setShader(this.shader);
    targetMaterial.setParameter('index', 6);
    targetMaterial.setParameter('DiffuseTexture', this.tilesTexture);
    targetMaterial.setParameter('spriteDimensions', [numOfSprites, 1.0]);
    targetMaterial.setParameter('repeat', [1, 1]);
    targetMaterial.setParameter('tint', [0, 0, 0, 0]);
    targetMaterial.update();

    const targetEntity = new pc.Entity();
    targetEntity.addComponent("model", {
        type: "plane"
    });
    const texture = this.solidColorTexture('#ffac7f');

    targetEntity.addComponent("particlesystem", {
        numParticles: 128,

        alphaGraph: new pc.Curve([0, 0.1, 2, 1]),
        lifetime: 2,
        rate: 0.02,
        blend: pc.BLEND_ADDITIVE,
        colorMap: texture,
        emitterShape: pc.EMITTERSHAPE_BOX,
        emitterExtents: new pc.Vec3(.6, 0, .6),
        scaleGraph: new pc.Curve([0, .05, 1, .01]),
        velocityGraph: new pc.CurveSet([[0, 0], [0, 1, 1, .1], [0, 0]]),
        velocityGraph2: new pc.CurveSet([[0, 0], [0, .5, 1.1], [0, 0]])
    });


    targetEntity.model.material = targetMaterial;
    targetEntity.translate(x, floor + .01, y);
    this.levelGeometry.addChild(targetEntity);
}



LevelController.prototype.createBox = function (x, y, floor) {

    this.tilesTexture.magFilter =
        this.tilesTexture.minFilter = pc.FILTER_NEAREST
    const boxMaterial = new pc.Material();
    boxMaterial.setShader(this.shader);
    boxMaterial.setParameter('index', 5);
    boxMaterial.setParameter('DiffuseTexture', this.tilesTexture);
    boxMaterial.setParameter('spriteDimensions', [numOfSprites, 1.0]);
    boxMaterial.setParameter('repeat', [0.9, 0.9]);
    boxMaterial.setParameter('tint', [0, 0, 0, 0]);
    boxMaterial.update();

    const boxEntity = new pc.Entity();
    boxEntity.addComponent("model", {
        type: "box"
    });
    boxEntity.model.material = boxMaterial;
    boxEntity.translate(x, floor + .45, y);

    boxEntity.addComponent("script");
    boxEntity.script.create('shape', {
        attributes: {
            keepUpdating: true
        }
    });
    boxEntity.setLocalScale(.9, .9, .9);
    boxEntity.script.create('boxController');

    boxEntity.tags.add('box');
    this.levelGeometry.addChild(boxEntity);
}

LevelController.prototype.createCube = function (x, y, z, tileIndex) {
    const cube = new pc.Entity();
    cube.addComponent("render", {
        type: "box"
    });
    cube.setLocalScale(1, 1, 1);
    cube.translate(x, y + .5, z);
    cube.addComponent("script");
    cube.script.create('shape');
    if ([3, 9, 13, 15, 16].includes(+tileIndex)) {
        cube.script.create('textureanim', {
            attributes: {
                index: indexes[tileIndex - 1]
            }
        });
    }
    cube.render.material = this.material[tileIndex - 1];

    this.levelGeometry.addChild(cube);
};

/**
 * Tries to find a tile at the given position. Returns true if possible to move.
 * The target position is set in TargetPosition.
 * @param {pc.Vec3} position current position of the box
 * @param {pc.Vec3} direction direction of movement
 * @param {pc.Vec3} targetPosition set to the position of the target
 * @returns true if the box can move to the destination
 */
LevelController.prototype.tryMoveBox = function (position, direction, targetPosition) {
    const pos = new pc.Vec2(position.x + LevelData[this.cl].width / 2, position.z + LevelData[this.cl].height / 2);
    const dir = new pc.Vec2(direction.x, direction.z);
    const target = pos.clone().add(dir);
    const targetTile = this.currentLevelData.layer[0].data[target.x][target.y];
    if (targetTile == 0 || targetTile == 'S' || targetTile == 'T') {
        targetPosition.set(
            target.x - LevelData[this.cl].width / 2,
            position.y,
            target.y - LevelData[this.cl].height / 2);
    }
    return (targetTile == 0 || targetTile == 'S' || targetTile == 'T');
}
/**
 * Gets the tile number at the given position.
 * @param {pc.Vec3} position 
 * @param {number} layer 
 */
LevelController.prototype.getTileAt = function (position, layer = 0) {
    const pos = new pc.Vec2(position.x + LevelData[this.cl].width / 2, position.z + LevelData[this.cl].height / 2);
    return this.currentLevelData.layer[layer].data[Math.floor(pos.x)][Math.floor(pos.y)];
}

LevelController.prototype.onNewTile = function (boxEntity, targetPosition, lastTile) {
    const lastPosition = boxEntity.getPosition();
    this.currentLevelData.layer[0].data[this.calcRowPos(lastPosition.x)][this.calcColPos(lastPosition.z)] = lastTile;
    this.currentLevelData.layer[0].data[this.calcRowPos(targetPosition.x)][this.calcColPos(targetPosition.z)] = 'B';
}

LevelController.prototype.onTarget = function (boxEntity) {
    this.targetsToComplete--;
    if (this.targetsToComplete === 0) {
        sound.play(1);
        setTimeout(async () => {
            await this.app.mainCamera.script.blackness.fadeOut();
            this.cl++;
            if (this.levelGeometry) this.levelGeometry.destroy();
            if (this.cl == LevelData.length) {
                this.cl = 0;
                this.app.fire('game:done');
            } else {
                this.createLevel();
                this.calculateTargets();
                console.log('level complete');
                this.app.fire('level:next');
                this.levelGeometry.enabled = true;
                await this.app.mainCamera.script.blackness.fadeIn();
            }
        }, 2000);
    }
}

LevelController.prototype.offTarget = function (boxEntity, lastTile) {
    this.targetsToComplete++;
    const position = boxEntity.getPosition();
    this.currentLevelData.layer[0].data[this.calcRowPos(position.x)][this.calcColPos(position.z)] = lastTile;
}

LevelController.prototype.calcRowPos = function (row) { return row + LevelData[this.cl].width / 2; }
LevelController.prototype.calcColPos = function (col) { return col + LevelData[this.cl].height / 2; }

LevelController.prototype.start = async function (level) {
    console.log('start');
    let q = await this.app.mainCamera.script.blackness.fadeOut();

    this.cl = level;
    if (this.levelGeometry) this.levelGeometry.destroy();
    this.createLevel();
    this.calculateTargets();
    this.levelGeometry.enabled = true;

    q = await this.app.mainCamera.script.blackness.fadeIn();
}

LevelController.prototype.canTeleportTo = function (position) {
    const mapPos = new pc.Vec2(position.x + LevelData[this.cl].width / 2, position.z + LevelData[this.cl].height / 2);
    return !!this.possibleTargets[Math.floor(mapPos.x)][Math.floor(mapPos.y)];
}

LevelController.prototype.calculateTargets = function () {
    console.log('calculate targets');
    const pos = this.app.mainCamera.getPosition();
    const mapPos = new pc.Vec2(this.calcRowPos(Math.floor(pos.x) + .5), this.calcColPos(Math.floor(pos.z) + .5));
    const screen = this.currentLevelData.layer[0].data;
    this.possibleTargets = new Array(LevelData[this.cl].height);
    for (let i = 0; i < LevelData[this.cl].height; i++) {
        this.possibleTargets[i] = new Array(LevelData[this.cl].width);
        for (let j = 0; j < LevelData[this.cl].width; j++) {
            this.possibleTargets[i][j] = 0;
        }
    }
    this.floodFillUtil(screen, this.possibleTargets, Math.floor(mapPos.x), Math.floor(mapPos.y));
}

LevelController.prototype.floodFillUtil = function (sourceMap, targetMap, x, y, prevC = 0, newC = 1) {
    if (x < 0 || x >= LevelData[this.cl].width || y < 0 || y >= LevelData[this.cl].height) return;
    if (sourceMap[x][y] != prevC && sourceMap[x][y] != 'S' && sourceMap[x][y] != 'T') return;
    if (!!targetMap[x][y]) return;

    targetMap[x][y] = newC;

    // Recur for north, east, south and west
    this.floodFillUtil(sourceMap, targetMap, x + 1, y);
    this.floodFillUtil(sourceMap, targetMap, x - 1, y);
    this.floodFillUtil(sourceMap, targetMap, x, y + 1);
    this.floodFillUtil(sourceMap, targetMap, x, y - 1);
}

LevelController.prototype.solidColorTexture = function (color) {

    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = 16;
    canvas.height = 16;

    var ctx = canvas.getContext("2d");

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = canvas.toDataURL();
    img.width = 16;
    img.height = 16;

    var texture = new pc.Texture(this.app.graphicsDevice, {
        width: 16,
        height: 16,
        format: pc.PIXELFORMAT_R8_G8_B8
    });
    texture.setSource(img);

    return texture;
}

LevelController.prototype.pause = async function () {
    await this.app.mainCamera.script.blackness.fadeOut();
    this.levelGeometry.enabled = false;

}
LevelController.prototype.unpause = async function () {
    this.levelGeometry.enabled = true;
    await this.app.mainCamera.script.blackness.fadeIn();
}

LevelController.prototype.restart = function () {

}
