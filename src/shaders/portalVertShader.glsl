//#version 100
precision highp float;

attribute vec3 aPosition;

uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;

varying vec2 v_texcoord;

vec2 screenspace(mat4 projectionmatrix, mat4 modelviewmatrix, vec3 position){

  vec4 temp = projectionmatrix * modelviewmatrix * vec4(position, 1.0);
  temp.xyz /= temp.w;
  temp.xy = (0.5)+(temp.xy)*0.5;
  return temp.xy;
}
void main(){   
    gl_Position=matrix_viewProjection*matrix_model*vec4(aPosition,1.);    
    v_texcoord =  screenspace(matrix_viewProjection, matrix_model, aPosition);
}