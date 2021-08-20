let Portal;
const scriptName = 'portal';
export default () => {
    if (Portal) return Portal;
    Portal = pc.createScript(scriptName);
    Portal.attributes.add('portalCameras', { type: "entity",array:true });
    Portal.scriptName = scriptName;
    
    Portal.prototype.update = function () {
        let position = this.entity.getPosition();
        /** @type {pc.Vec3} */
        let cameraPosition = this.portalCameras[0].getPosition();
        this.portalCameras[0].setPosition(position.x*-1, cameraPosition.y, position.z);
    };
    return Portal;
}