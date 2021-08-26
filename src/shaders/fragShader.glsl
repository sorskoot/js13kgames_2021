//#version 100
precision highp float;

uniform sampler2D DiffuseTexture;
uniform float index;
// uniform sampler2D Lookup;
// uniform float lookupIndex;
// uniform float lookupShift;
uniform vec2 spriteDimensions;
// uniform vec3 tint;
// uniform float tintAmount;
// uniform float alphatest;
varying vec2 v_texcoord;

void main(void)
{
    float u=clamp(floor(mod(v_texcoord.x,1.)*16.)/16.,0.,1.)/spriteDimensions.x+(index*1./spriteDimensions.x);//+1.0/128.0;
    float v=clamp(floor(mod(v_texcoord.y,1.)*16.)/16.,0.,1.)/spriteDimensions.y;
    vec2 UV=vec2(u,v);
    
    
    vec4 texturedColor=texture2D(DiffuseTexture,vec2(UV.x+0.0015,UV.y));  
  
    // if( lookupIndex >= 0.0 && texturedColor.a > 0.0 && 
    //                         texturedColor.r == texturedColor.g && 
    //                         texturedColor.r == texturedColor.b){
    //     float ind = mod(texturedColor.r+(lookupShift/5.),1.);        
    //     float y = 1.-(lookupIndex*(1./12.)-(1./24.));        
	// 	texturedColor = texture2D(Lookup,vec2(ind, y));  
	// }
  //  if(texturedColor.a<alphatest)discard;      
    gl_FragColor=texturedColor;
    //gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    
}

