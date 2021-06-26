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
    // if (sin(uv.y * 50. * 0.5) + sin(uv.y * 10. * 0.5 * sin(t) * 1e3) + sin(uv.y * 100. * 0.5 * tt) < -0.0) {
        // gl_FragColor = vec4(1., 1., 1., 1.);   
        vec2 vv = v_texcoord;
        vv.y = vv.x + sin(vv.y * t * 1e3) * 4.;
        // gl_FragColor = texture2D(u_texture, vv + (pow(cos(uv.y * uv.x * 1e18), 0.0125) + sin(uv.x * 1e-2 + tan(uv.y * t * 1.))) * 2. * floor(sin(uv.y * 1e-3 * ((floor(sin(t * 1e-8 * sin(t * 1e-2))))))) + sin(uv.y * 1e12 + uv.y * 1e-2 * sin(20. * 1e-10) + tan(t * 1e-10)) * 0.0625 * 1e-5) * 1.;
        float dx = 40. * (1. / 2560. * 0.0625);
        float dy = 25. * (1. / 1440. * 0.0625);
        vec2 coord = vec2(dx * floor(uv.x / dx) * 0.65, dy * floor(uv.y / dy));
        // tc = texture2D(sceneTex, coord).rgb;
                // coord.y = coord.x + sin((coord.x * t * 0.0625 * 0.0625)) * 0.125;
                // coord.x = coord.y + sin((coord.y * t * 0.0625 * 0.0625)) * 0.125;
        // gl_FragColor = texture2D(u_texture, coord) - (rando * 0.125) * 1.;
        // gl_FragColor.rgb = gl_FragColor.gbr * 1.5;
        // gl_FragColor = mix(gl_FragColor, texture2D(u_texture, v_texcoord), 0.5);
    // } else {
        float err = cos(coord.x * coord.y * 2.) * 1.005;
    err = sin(pow(err, err * 2.) * 0.5);
        gl_FragColor = texture2D(u_texture, v_texcoord + err);
    // }
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
   gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.09)) * 1.5;
                // gl_FragColor.rgb = gl_FragColor.gbr * 1.5;
}
// endGLSL
`;
wateryGlitch.init();