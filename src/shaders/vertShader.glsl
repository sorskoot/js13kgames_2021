precision highp float;
attribute vec3 aPosition;
attribute vec2 vertex_texCoord0;
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
uniform vec2 repeat;
varying vec2 v_texcoord;
varying float fogDepth;

void main(){
    gl_Position=matrix_viewProjection*matrix_model*vec4(aPosition,1.);    
    vec2 uv = vertex_texCoord0.xy;
    v_texcoord = vec2(uv.x*repeat.x,uv.y*repeat.y);
     
     //vec4 cs_position = matrix_viewProjection*matrix_model * vec4(aPosition,1.);
    fogDepth = gl_Position.w;
    //fogDepth=length(gl_Position.xyz)/8.;
    //fogDepth=-(matrix_viewProjection*vec4(aPosition,1.)).z;
}