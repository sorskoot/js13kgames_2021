precision highp float;
#define sw 17.
uniform sampler2D DiffuseTexture;
uniform float index;
uniform vec2 spriteDimensions;
uniform vec4 tint;
varying vec2 v_texcoord;
varying float fogDepth;
uniform sampler2D Lookup;
uniform float lookupIndex;
uniform float lookupShift;

void main(void) {
  float u = clamp(floor(mod(v_texcoord.x, 1.) * sw) / sw, 0., 1.) / spriteDimensions.x + (index * 1. / spriteDimensions.x);//+1.0/128.0;
  float v = clamp(floor(mod(v_texcoord.y, 1.) * sw) / sw, 0., 1.) / spriteDimensions.y;
  vec2 UV = vec2(u, v);
  vec4 texturedColor = texture2D(DiffuseTexture, vec2(UV.x + 0.0005, UV.y));
  float a = texturedColor.r + texturedColor.g + texturedColor.b;
  if(a == 0.0) {
    discard;
  }

  if(lookupIndex >= 0.0 && 
    texturedColor.r == texturedColor.g &&
    texturedColor.r == texturedColor.b) {
    float ind = mod(texturedColor.r + (lookupShift / 5.), 1.);
    float y = 1. - (lookupIndex * (1. / 12.) - (1. / 36.));
    texturedColor = texture2D(Lookup, vec2(ind, y));
  }

  float fogvalue = clamp((1. - fogDepth / 8.) + .4, .4, 1.);

  vec4 fog = vec4(vec3(fogvalue), 1.);

  if(tint.a > 0.0) {
    gl_FragColor = texturedColor * tint * fog;
  } else {
    gl_FragColor = texturedColor * fog;
  }
}
