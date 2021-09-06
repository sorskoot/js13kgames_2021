precision highp float;
attribute vec3 aPosition;
attribute vec2 vertex_texCoord0;
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
uniform vec2 repeat;
varying vec2 v_texcoord;
void main(){
    gl_Position=matrix_viewProjection*matrix_model*vec4(aPosition,1.);    
    vec2 uv = vertex_texCoord0.xy;
    v_texcoord = vec2(uv.x*repeat.x,uv.y*repeat.y);
}