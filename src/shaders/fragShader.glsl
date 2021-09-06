precision highp float;
uniform sampler2D DiffuseTexture;
uniform float index;
uniform vec2 spriteDimensions;
uniform vec4 tint;
varying vec2 v_texcoord;

void main(void) {
  float u = clamp(floor(mod(v_texcoord.x, 1.) * 16.) / 16., 0., 1.) / spriteDimensions.x + (index * 1. / spriteDimensions.x);//+1.0/128.0;
  float v = clamp(floor(mod(v_texcoord.y, 1.) * 16.) / 16., 0., 1.) / spriteDimensions.y;
  vec2 UV = vec2(u, v);
  vec4 texturedColor = texture2D(DiffuseTexture, vec2(UV.x + 0.0015, UV.y));  
  if(texturedColor.a == 0.0) {
    discard;
  }
  if(tint.a > 0.0) {
    gl_FragColor = texturedColor * tint;
  } else {
    gl_FragColor = texturedColor;
  }
}
