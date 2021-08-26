let Portal;
const scriptName = 'portal';
export default () => {
    if (Portal) return Portal;
    Portal = pc.createScript(scriptName);
    Portal.attributes.add('sceneCamera', { type: "entity"});
    Portal.scriptName = scriptName;
    
    Portal.prototype.update = function () {
        let position = this.sceneCamera.getPosition();
       // let rotation = this.sceneCamera.getRotation();
        // get projection matrix from camera
        let projection = this.sceneCamera.camera.projectionMatrix;
        //inverse projection matrix
        let invProjection = projection.invert();        
        
        // get position from inverse projection matrix
        let pos = invProjection.transformPoint(position);
        let rotation = invProjection.getEulerAngles();
        //  /** @type {pc.Vec3} */
        // let cameraPosition = this.entity.getPosition();
        this.entity.setPosition(pos);
        this.entity.setRotation(rotation.x,rotation.y,rotation.z,rotation.w);
        // translate the camera to the portal
//        this.entity.setPosition(this.sceneCamera.getPosition());

    };
    return Portal;
}