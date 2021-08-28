(function () {
    pc.util = {};
    
    var _transformedForward = new pc.Vec3();
    pc.util.getYaw = function (quat) {
        var transformedForward = _transformedForward;
        quat.transformVector(pc.Vec3.FORWARD, transformedForward);

        return Math.atan2(-transformedForward.x, -transformedForward.z) * pc.math.RAD_TO_DEG;
    };

    pc.util.lerp = (a, b, n) => (1 - n) * a + n * b;

})();