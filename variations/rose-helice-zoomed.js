rose.vertText = `
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
        float t = (time + 0.) * 2e-3;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i + sin(i * 1e-4 * 2.)) * i * 1e-5;
        float y = sin(i + sin(i * 1e-4 * 2.)) * i * 1e-5;
        x += sin(sin(x * 0.25 * sin(i * 7.)) * i * 3e5) * 0.5;
        // y += sin(sin(y * 0.25 * sin(i * 3. + t * 2e1)) * i * 3e5) * 0.95;
        // y += sin(sin(y * 0.25 * sin(i * 3. + t * 2e1)) * i * 3e5) * 200.95;
        x += cos(cos(cos(i * 0.1 * tan(i * 1e-2))) + t * 10.) * 0.002;
        y += sin(cos(sin(i * 0.1 * tan(i * 1e-2))) + t * 10.) * 0.002;
        // x += tan(pow(x + x, 1e-2 / i * t * 1e3) * i + t * 2e-5 * i) * 2e-6;
        // y += tan(pow(y + x, 1e-2 / i * t * 1e3) * i + t * 2e-5 * i) * 2e-6;
        // x += cos(x * sin(t * 2e1)) * 0.1;
        // y += sin(y * sin(t * 2e1)) * 0.1;
//         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        // x += cos(t * 10.75 * i * 1e-5) * 0.5;
        // y += sin(t * 10.75 * i * 1e-5) * 0.5;
        x += cos(t * 10.75) * i * 0.0000015;
        y += sin(t * 10.75) * i * 0.0000015;
        // x += 1. * cos(t * 5.);
        // y += 1. * sin(t * 5.);
        x *= 5.95;
        y *= 5.95;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.55, y, 0.0, 1.0);
//         center = vec2(gl_Position.x, gl_Position.y);
//         center = 512.0 + center * 512.0;
//         myposition = vec2(gl_Position.x, gl_Position.y);
        alph = 0.25 * 0.5;
        gl_PointSize = 14.0 * resolutionScalar;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
rose.fragText = `
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
rose.init();