let Rotator;
const scriptName = 'rotator';
export default () => {
    if (Rotator) return Rotator;

    Rotator = pc.createScript(scriptName);
    let t = 0;
    Rotator.prototype.update = function (dt) {
        t += dt;
        this.entity.setEulerAngles(0, Math.sin(t) * 20, 0);
    };
    Rotator.scriptName = scriptName;
    return Rotator;
}