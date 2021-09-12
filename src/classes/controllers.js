var Controllers = pc.createScript('controllers');

Controllers.attributes.add('controllerTemplate', {
    type: 'entity'
});

Controllers.prototype.initialize = function () {
    this.app.xr.input.on('add', inputSource => {
        const entity = this.controllerTemplate.clone();
        entity.reparent(this.app.root);
        entity.script.controller.setInputSource(inputSource, entity);
        entity.enabled = true;
    }, this);
};