wateryGlitch.fragText = `
// beginGLSL
precision mediump float;
// Passed in from the vertex shader.
uniform float time;
varying vec2 v_texcoord;
// The texture.
uniform sampler2D u_texture;
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = vec2(gl_FragCoord.xy) / vec2(1600, 1600);
    float rando = rand(vec2(uv.x, uv.y));
    float t = time + 270. - 10e2;
    float tt = floor(sin(t * 1e-2) * 10.);
    float dx = 40. * (1. / 2560. * 0.25);
    float dy = 25. * (1. / 1440. * 0.25);
        vec2 coord = vec2(dx * floor(uv.x / dx) * 0.65, dy * floor(uv.y / dy));
    // float sx = 
    float k = t * 1e-2;
    vec2 cc = mod(v_texcoord + vec2(cos(k) * 0.5, sin(k) * 0.5) * uv.x * 1. * sin(uv.x * 1e1), vec2(1., 1.));
    // cc *= coord;
    gl_FragColor = texture2D(u_texture, cc);
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
    gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.025)) * 1.5;
    gl_FragColor.rgb = gl_FragColor.rrr * 1.;
}
// endGLSL
`;
wateryGlitch.init();