precision highp float;
uniform sampler2D DiffuseTexture;
varying vec2 v_texcoord;
void main(void)
{
    gl_FragColor = texture2D(DiffuseTexture,v_texcoord);  
}

