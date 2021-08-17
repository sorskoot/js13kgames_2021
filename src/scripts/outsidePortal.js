let OutsidePortal;
const scriptName = 'outsidePortal';

export default () => {
    if (OutsidePortal) return OutsidePortal;

    OutsidePortal = pc.createScript('outsidePortal');
    OutsidePortal.scriptName = scriptName;
    OutsidePortal.prototype.initialize = function () {
        const meshInstances = this.entity.model.meshInstances;
        let mat, i;
        const stencil = new pc.StencilParameters({
            func: pc.FUNC_EQUAL,
            ref: 0
        });
        for (i = 0; i < meshInstances.length; i++) {
            meshInstances[i].layer--;
            mat = meshInstances[i].material;
            mat.stencilBack = mat.stencilFront = stencil;
        }

        const prt = this.entity.particlesystem;
        if (prt) {
            prt.emitter.meshInstance.meshes[i].layer--;
            mat = prt.emitter.material;
            mat.stencilBack = mat.stencilFront = stencil;
        }
    };
    return OutsidePortal;
}