rose2.vertText = `
    // beginGLSL
    // attribute vec4 coordinates;
    attribute float vertexID;
    uniform float time;
    uniform float resolutionScalar;
//     varying vec2 myposition;
//     varying vec2 center;
    varying float alph;
// 
float map(float value, float min1, float max1, float min2, float max2) {
    float perc = (value - min1) / (max1 - min1);
    return perc * (max2 - min2) + min2;
}
// 
    void main(void) {
        float t = (time + 1e5) * 0.5e-3;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i + sin(i * 1e-4 + i * 1e-4)) * i * 1.5e-5;
        float y = sin(i + sin(i * 1e-4 + i * 1e-4)) * i * 1.5e-5;
        x += sin(x * 0.25 * sin(t * 2e-1) * sin(i * 5.)) * 0.75;
        y += sin(y * 0.25 * sin(t * 2e-1) * sin(i * 5.)) * 0.75;
        float w = floor(sin((t + 11.) * 1e-1) * 1e3);
        x += tan(cos(i * 69. * tan(i * 1e15 * t)) * 1e8 * 14. * w) * 4.5;
        y += tan(sin(i * 69. * tan(i * 1e15 * t)) * 1e8 * 14. * w) * 4.5;
        x += cos(x * y + tan(cos(i * 690000.)) + t * 50.5) * 0.0625;
        y += sin(y * y + tan(sin(i * 690000.)) + t * 50.5) * 0.25;
        // x += cos(x + tan(cos(i * 690000.)) + t * 50.5) * 0.25;
        // y += sin(y + tan(sin(i * 690000.)) + t * 50.5) * 0.25;
        //         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        // x += cos(t * 200.75) * i * 0.0000015;
        // y += sin(t * 200.75) * i * 0.0000015;
        // x += 1. * cos(t * 5.);
        // y += 1. * sin(t * 5.);
        x *= 3.5e-1;
        y *= 3.5e-1;
        // x += cos(t * 1e18) * 1.;
        // y += sin(t * 1e18) * 1.;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.55 - 0., y - 0., 0.0, 1.0);
//         center = vec2(gl_Position.x, gl_Position.y);
//         center = 512.0 + center * 512.0;
//         myposition = vec2(gl_Position.x, gl_Position.y);
        alph = 0.25 * 0.5;
        gl_PointSize = 12.0 * resolutionScalar;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
rose2.fragText = `
    // beginGLSL
   // beginGLSL
    precision mediump float;
//     varying vec2 myposition;
//     varying vec2 center;
    varying float alph;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // vec2 uv = gl_PointCoord.xy / vec2(1600, 1600);
        // float d = length(uv - center);
        // vec2 pos = myposition;
        vec2 uv = gl_FragCoord.xy / vec2(2560, 1600);
        // uv.x = uv.x + 1.0;
        uv = uv * 2.0;
        uv = uv + 0.5;
        // uv = uv * 1.0;
        float ALPHA = 0.75;
        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
                float dist_squared = dot(pos, pos);
        float alpha;
        if (dist_squared < 0.25) {
            alpha = ALPHA;
        } else {
            alpha = 0.0;
        }
        alpha = smoothstep(0.05 / (0.9 + alph), 0.000125, dist_squared) * 0.49;
        float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.2));
        gl_FragColor = vec4(1.0, 0.4 - dist_squared, 0.0 + alpha * 120., ((3. - dist_squared * 24.0 * (0.25 + alph) - (rando * 1.1)) * 0.045 + alpha)) * 1.25;
//         gl_FragColor = gl_FragColor.gbga;
        gl_FragColor.rgb = vec3(1.0) - gl_FragColor.rgb;
        gl_FragColor = gl_FragColor.grba;
//         gl_FragColor.g *= 0.525;
        gl_FragColor.b *= 0.5;
        // gl_FragColor.g += 0.4;
        gl_FragColor.rgb = gl_FragColor.rrr * 1.;
        
    }
    // endGLSL
`;
rose2.init();





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
    if (sin(uv.y * 50. * 0.5) + sin(uv.y * 10. * 0.5) + sin(uv.y * 10. * 0.5 * tt) < -0.0) {
        // gl_FragColor = vec4(1., 1., 1., 1.);   
        vec2 vv = v_texcoord;
        vv.y = vv.x + sin(vv.y * t * 1e3);
        // gl_FragColor = texture2D(u_texture, vv + (pow(cos(uv.y * uv.x * 1e18), 0.0125) + sin(uv.x * 1e-2 + tan(uv.y * t * 1.))) * 2. * floor(sin(uv.y * 1e-3 * ((floor(sin(t * 1e-8 * sin(t * 1e-2))))))) + sin(uv.y * 1e12 + uv.y * 1e-2 * sin(20. * 1e-10) + tan(t * 1e-10)) * 0.0625 * 1e-5) * 1.;
        float dx = 40. * (1. / 2560. * 0.25);
        float dy = 25. * (1. / 1440. * 0.25);
        vec2 coord = vec2(dx * floor(uv.x / dx) * 0.65, dy * floor(uv.y / dy));
        // tc = texture2D(sceneTex, coord).rgb;
                coord.y = coord.y + sin(coord.y * t * 1e1) * 0.1;
        gl_FragColor = texture2D(u_texture, coord) - (rando * 0.125) * 1.;
        // gl_FragColor = mix(gl_FragColor, texture2D(u_texture, v_texcoord), 0.5);
    } else {
        gl_FragColor = texture2D(u_texture, v_texcoord);
    }
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
   gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.025)) * 1.5;
                gl_FragColor.rgb = gl_FragColor.rrr * 1.;
}
// endGLSL
`;
wateryGlitch.init();