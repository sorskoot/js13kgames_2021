/// <reference path="../../typings/playcanvas.d.ts" />

const LevelData = [
    // {
    //     width: 7,
    //     height: 7,
    //     layer: [{
    //         data: [
    //             [0, 0, 0, 0, 0, 0, 'T'],
    //             [0, 0, 0, 0, 0, 0, 0],
    //             [0, 0, 0, 0, 0, 0, 0],
    //             [0, 0, 0, 'S', 0, 0, 0],
    //             [0, 0, 0, 0, 0, 0, 0],
    //             [0, 0, 0, 0, 0, 0, 0],
    //             [0, 0, 0, 0, 0, 0, 0]
    //         ]
    //     },
    //     {
    //         data: [
    //             [0, 0, 0, 0, 0, 0, 0],
    //             [0, 0, 0, 0, 0, 0, 0],
    //             [0, 0, 0, 0, 0, 0, 0],
    //             [0, 0, 0, 0, 0, 0, 0],
    //             [0, 0, 0, 0, 0, 0, 0],
    //             [0, 0, 0, 0, 0, 0, 0],
    //             [0, 0, 0, 0, 0, 0, 0],
    //         ]
    //     },
    //     {
    //         data: [
    //             [0, 3, 3, 3, 3, 3, 0],
    //             [11, 0, 0, 0, 0, 0, 11],
    //             [11, 0, 0, 0, 0, 0, 11],
    //             [11, 0, 0, 0, 0, 0, 11],
    //             [11, 0, 0, 0, 0, 0, 11],
    //             [11, 0, 0, 0, 0, 0, 11],
    //             [0, 11, 11, 11, 11, 11, 0]
    //         ]
    //     }],
    // },


    {
        width: 7,
        height: 7,
        layer: [{
            data: [
                [1, 12, 10, 12, 10, 12, 1],
                [10, 0, 0, 0, 0, 0, 10],
                [12, 0, 0, 0, 0, 0, 12],
                [8, 'T', 0, 'S', 'B', 0, 8],
                [12, 0, 0, 0, 0, 0, 12],
                [10, 0, 0, 0, 0, 0, 10],
                [1, 12, 10, 12, 10, 12, 1]
            ]
        },
        {
            data: [
                [0, 3, 3, 3, 3, 3, 0],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [9, 0, 0, 0, 0, 0, 9],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [0, 11, 11, 11, 11, 11, 0]
            ]
        },
        {
            data: [
                [0, 3, 3, 3, 3, 3, 0],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [0, 11, 11, 11, 11, 11, 0]
            ]
        }],
    },
    {
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
                [11, 0, 0, 0, 0, 1, 11],
                [11, 0, 1, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 1, 0, 0, 0, 9],
                [11, 0, 0, 0, 0, 1, 11],
                [0, 11, 11, 11, 11, 11, 0]
            ]
        }]
    },
    {
        width: 7,
        height: 7,
        layer: [{
            data: [
                [1, 1, 1, 12, 10, 12, 1],
                [1, 1, 12, 'T', 0, 0, 12],
                [1, 12, 12, 0, 0, 0, 10],
                [12, 0, 0, 0, 0, 0, 12],
                [10, 0, 'B', 0, 12, 12, 12],
                [12, 'S', 0, 0, 12, 1, 1],
                [1, 12, 8, 12, 1, 1, 1]
            ]
        },
        {
            data: [
                [1, 1, 1, 11, 11, 11, 1],
                [1, 1, 11, 0, 0, 0, 11],
                [1, 11, 11, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 11, 11, 11, 1],
                [11, 0, 0, 0, 11, 1, 1],
                [1, 11, 9, 11, 1, 1, 1]
            ]
        },
        {
            data: [
                [1, 1, 1, 11, 11, 11, 1],
                [1, 1, 11, 0, 0, 0, 11],
                [1, 11, 11, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 11, 11, 11],
                [11, 0, 0, 0, 11, 1, 1],
                [1, 11, 11, 11, 1, 1, 1]
            ]
        }]
    },
    {
        "width": 7,
        "height": 11,
        "layer": [{
            "data": [
                [12, 12, 12, 12, 12, 0, 0, 0, 0, 0, 0],
                [12, "T", "T", 0, 12, 12, 12, 12, 12, 12, 0],
                [12, "T", 0, "B", 0, 0, 0, 0, 0, 12, 0],
                [12, 10, 0, 0, "B", 0, 0, 10, 0, 8, 0],
                [0, 12, 10, 10, "S", "B", 0, 10, 0, 8, 0],
                [0, 0, 0, 12, 10, 0, 0, 0, 0, 12, 0],
                [0, 0, 0, 0, 12, 12, 12, 12, 12, 12, 0]]
        }, {
            "data": [[11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0], [11, 0, 0, 0, 11, 11, 11, 11, 11, 11, 0], [11, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0], [11, 11, 0, 0, 0, 0, 0, 11, 0, 9, 0], [0, 11, 11, 11, 0, 0, 0, 11, 0, 9, 0], [0, 0, 0, 11, 11, 0, 0, 0, 0, 11, 0], [0, 0, 0, 0, 11, 11, 11, 11, 11, 11, 0]]
        }, {
            "data": [[11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0], [11, 0, 0, 0, 11, 11, 11, 11, 11, 11, 0], [11, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0], [11, 11, 0, 0, 0, 0, 0, 11, 0, 11, 0], [0, 11, 11, 11, 0, 0, 0, 11, 0, 11, 0], [0, 0, 0, 11, 11, 0, 0, 0, 0, 11, 0], [0, 0, 0, 0, 11, 11, 11, 11, 11, 11, 0]]
        }
        ]
    }


];

class LevelController {

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
        this.debugBox = new pc.Entity();
        this.debugBox.addComponent('render', {
            type: 'box'
        });
        this.debugBox.setLocalScale(0.4, 0.4, 0.4);
        this.debugBox.setPosition(0, 0, 0);
        this.debugBox.setName('debugBox');


        this.material = [];
        this.shapes = [];


        this.tilesTexture.resource.magFilter =
            this.tilesTexture.resource.minFilter = pc.FILTER_NEAREST;

        this.app.root.on("box:onTarget", this.onTarget, this);
        this.app.root.on("box:offTarget", this.offTarget, this);
        this.app.root.on("box:onNewTile", this.onNewTile, this);
        this.app.root.on("box:doneMoving", this.calculateTargets, this);
        
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
        //return this.createLevel();
    }

    createLevel() {
        this.shapes = [];
        this.levelGeometry = new pc.Entity();
        this.levelGeometry.enabled = false;
        this.app.root.addChild(this.levelGeometry);
        //this.levelGeometry.addChild(this.debugBox);
        this.currentLevelData = JSON.parse(JSON.stringify(LevelData[this.currentLevel]));
        this.targetsToComplete = 0;

        let cameraposition = new pc.Vec3(0, 0, 0);

        // create a grid of cubes
        for (let layer = 0; layer < LevelData[this.currentLevel].layer.length; layer++) {
            for (let row = 0; row < LevelData[this.currentLevel].layer[layer].data.length; row++) {
                for (let col = 0; col < LevelData[this.currentLevel].layer[layer].data[row].length; col++) {
                    let tile = LevelData[this.currentLevel].layer[layer].data[row][col];
                    if (layer == 0) {
                        if (tile == 'S' || tile == 'B' || tile == 0 || tile == 'T') {
                            let shape = new pc.Entity();
                            shape.addComponent("script");
                            shape.script.create('shape');
                            shape.tags.add("floor");
                            shape.name = 'floory';
                            shape.setLocalPosition(row - LevelData[this.currentLevel].width / 2, 0, col - LevelData[this.currentLevel].height / 2);
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
                                row - LevelData[this.currentLevel].width / 2,
                                0,
                                col - LevelData[this.currentLevel].height / 2);

                            break;
                        case 'B':
                            this.createBox(row - LevelData[this.currentLevel].width / 2, col - LevelData[this.currentLevel].height / 2, layer);
                            break;
                        case 'T':
                            this.createTarget(row - LevelData[this.currentLevel].width / 2, col - LevelData[this.currentLevel].height / 2, layer);
                            this.targetsToComplete++;
                            break;
                        default:
                            this.createCube(row - LevelData[this.currentLevel].width / 2, layer, col - LevelData[this.currentLevel].height / 2, tile);
                            break;
                    }
                }
            }
        }
        this.createFloor(LevelData[this.currentLevel].width, LevelData[this.currentLevel].height, 0);
        this.createCeiling(LevelData[this.currentLevel].width, LevelData[this.currentLevel].height, LevelData[this.currentLevel].layer.length);
        this.app.fire("teleport:to", cameraposition);
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
        floorEntity.translate(-.5, floor, -.5);

        this.levelGeometry.addChild(floorEntity);
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
        ceilingEntity.translate(-.5, ceiling, -.5);
        this.levelGeometry.addChild(ceilingEntity);
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
        const texture = this.solidColorTexture('#ffac7f');
        
        targetEntity.addComponent("particlesystem", {
            numParticles: 128,
            
            alphaGraph: new pc.Curve([0, 0.1, 2, 1]),
            lifetime: 2,
            rate:0.02,
            blend:pc.BLEND_ADDITIVE,
            colorMap: texture,
            emitterShape: pc.EMITTERSHAPE_BOX,
            emitterExtents: new pc.Vec3(.6, 0, .6),
            scaleGraph: new pc.Curve([0, .05, 1, .01]),
            velocityGraph: new pc.CurveSet([[0, 0], [0, 1,1,.1], [0, 0]]),
            velocityGraph2: new pc.CurveSet([[0, 0], [0,.5,1.1], [0, 0]])
        });


        targetEntity.model.material = targetMaterial;
        targetEntity.translate(x, floor + .01, y);
        this.levelGeometry.addChild(targetEntity);
    }



    createBox(x, y, floor) {

        this.tilesTexture.resource.magFilter =
            this.tilesTexture.resource.minFilter = pc.FILTER_NEAREST
        const boxMaterial = new pc.Material();
        boxMaterial.setShader(this.shader);
        boxMaterial.setParameter('index', 5);
        boxMaterial.setParameter('DiffuseTexture', this.tilesTexture.resource);
        boxMaterial.setParameter('spriteDimensions', [16.0, 1.0]);
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
        boxEntity.name = 'boxy';
        this.levelGeometry.addChild(boxEntity);
    }

    createCube(x, y, z, tileIndex) {
        const cube = new pc.Entity();
        cube.addComponent("render", {
            type: "box"
        });
        cube.setLocalScale(1, 1, 1);
        cube.translate(x, y + .5, z);
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
    tryMoveBox(position, direction, targetPosition) {
        const pos = new pc.Vec2(position.x + LevelData[this.currentLevel].width / 2, position.z + LevelData[this.currentLevel].height / 2);
        const dir = new pc.Vec2(direction.x, direction.z);
        const target = pos.clone().add(dir);
        const targetTile = this.currentLevelData.layer[0].data[target.x][target.y];
        if (targetTile == 0 || targetTile == 'S' || targetTile == 'T') {
            targetPosition.set(
                target.x - LevelData[this.currentLevel].width / 2,
                position.y,
                target.y - LevelData[this.currentLevel].height / 2);
        }
        return (targetTile == 0 || targetTile == 'S' || targetTile == 'T');
    }
    /**
     * Gets the tile number at the given position.
     * @param {pc.Vec3} position 
     * @param {number} layer 
     */
    getTileAt(position, layer = 0) {
        const pos = new pc.Vec2(position.x + LevelData[this.currentLevel].width / 2, position.z + LevelData[this.currentLevel].height / 2);
        return this.currentLevelData.layer[layer].data[Math.floor(pos.x)][Math.floor(pos.y)];
    }

    onNewTile(boxEntity, targetPosition, lastTile) {
        const lastPosition = boxEntity.getPosition();
        this.currentLevelData.layer[0].data[this.calcRowPos(lastPosition.x)][this.calcColPos(lastPosition.z)] = lastTile;
        this.currentLevelData.layer[0].data[this.calcRowPos(targetPosition.x)][this.calcColPos(targetPosition.z)] = 'B';
    }

    onTarget(boxEntity) {
        this.targetsToComplete--;
        if (this.targetsToComplete === 0) {
            this.app.mainCamera.script.blackness.fadeOut().then(async () => {
                this.currentLevel++;
                if (this.levelGeometry) this.levelGeometry.destroy();
                this.createLevel();
                this.calculateTargets();
                console.log('level complete');
                this.app.fire('level:next');
                this.levelGeometry.enabled = true;

                await this.app.mainCamera.script.blackness.fadeIn();

            });
        }
    }

    offTarget(boxEntity, lastTile) {
        this.targetsToComplete++;
        const position = boxEntity.getPosition();
        this.currentLevelData.layer[0].data[this.calcRowPos(position.x)][this.calcColPos(position.z)] = lastTile;
    }

    calcRowPos(row) { return row + LevelData[this.currentLevel].width / 2; }
    calcColPos(col) { return col + LevelData[this.currentLevel].height / 2; }

    async start(level) {
        console.log('start');
        let q = await this.app.mainCamera.script.blackness.fadeOut();

        this.currentLevel = level;
        if (this.levelGeometry) this.levelGeometry.destroy();
        this.createLevel();
        this.calculateTargets();
        this.levelGeometry.enabled = true;

        q = await this.app.mainCamera.script.blackness.fadeIn();
    }

    canTeleportTo(position) {
        const mapPos = new pc.Vec2(position.x + LevelData[this.currentLevel].width / 2, position.z + LevelData[this.currentLevel].height / 2);
        return !!this.possibleTargets[Math.floor(mapPos.x)][Math.floor(mapPos.y)];
    }

    calculateTargets() {
        console.log('calculate targets');
        const pos = this.app.mainCamera.getPosition();
        const mapPos = new pc.Vec2(this.calcRowPos(Math.floor(pos.x) + .5), this.calcColPos(Math.floor(pos.z) + .5));
        const screen = this.currentLevelData.layer[0].data;
        this.possibleTargets = new Array(LevelData[this.currentLevel].height);
        for (let i = 0; i < LevelData[this.currentLevel].height; i++) {
            this.possibleTargets[i] = new Array(LevelData[this.currentLevel].width);
            for (let j = 0; j < LevelData[this.currentLevel].width; j++) {
                this.possibleTargets[i][j] = 0;
            }
        }
        this.floodFillUtil(screen, this.possibleTargets, Math.floor(mapPos.x), Math.floor(mapPos.y));
    }

    floodFillUtil(sourceMap, targetMap, x, y, prevC = 0, newC = 1) {
        if (x < 0 || x >= LevelData[this.currentLevel].width || y < 0 || y >= LevelData[this.currentLevel].height) return;
        if (sourceMap[x][y] != prevC && sourceMap[x][y] != 'S' && sourceMap[x][y] != 'T') return;
        if (!!targetMap[x][y]) return;

        targetMap[x][y] = newC;

        // Recur for north, east, south and west
        this.floodFillUtil(sourceMap, targetMap, x + 1, y);
        this.floodFillUtil(sourceMap, targetMap, x - 1, y);
        this.floodFillUtil(sourceMap, targetMap, x, y + 1);
        this.floodFillUtil(sourceMap, targetMap, x, y - 1);
    }

    solidColorTexture(color) {

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

    pause() {
        this.app.mainCamera.script.blackness.fadeOut().then(async () => {
            this.levelGeometry.enabled = false;
        });
    }
    unpause(){
        this.levelGeometry.enabled = true;
        this.app.mainCamera.script.blackness.fadeIn().then(async () => {
           
        });

    }
    restart(){

    }
};