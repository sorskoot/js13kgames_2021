let InsidePortal;
const scriptName = 'insidePortal';

export default () => {
    if (InsidePortal) return InsidePortal;

    InsidePortal = pc.createScript(scriptName);
    InsidePortal.scriptName = scriptName;

    InsidePortal.prototype.initialize = function () {
        const meshInstances = this.entity.model.meshInstances;
        let mat, i;
        const stencil = new pc.StencilParameters({
            func: pc.FUNC_NOTEQUAL,
            ref: 0
        });
        for (i = 0; i < meshInstances.length; i++) {
            meshInstances[i].layer -= 2;
            mat = meshInstances[i].material;
            mat.stencilBack = mat.stencilFront = stencil;
        }

        const prt = this.entity.particlesystem;
        if (prt) {
            prt.emitter.meshInstance.layer -= 2;
            mat = prt.emitter.material;
            mat.stencilBack = mat.stencilFront = stencil;
        }
    };
    return InsidePortal;
}