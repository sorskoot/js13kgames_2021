let Portal;
const scriptName = 'portal';
export default () => {
    if (Portal) return Portal;
    Portal = pc.createScript(scriptName);
    Portal.scriptName = scriptName;
    // initialize code called once per entity
    Portal.prototype.initialize = function () {
        // We only want to write to the stencil buffer
        const mat = this.entity.model.meshInstances[0].material;
        mat.depthWrite = false;
        mat.redWrite = mat.greenWrite = mat.blueWrite = mat.alphaWrite = false;
        mat.stencilBack = mat.stencilFront = new pc.StencilParameters({
            zpass: pc.STENCILOP_INCREMENT
        });
        mat.update();
    };
    return Portal;
}
