glitchyRose2.vertText = `
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
        float t = (time + 100.) * 5e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i * 1e2) * i * 2e-5;
        float y = sin(i * 1e2) * i * 2e-5;
        // x += sin(x * 0.125 * sin(i + x * 0.05e2) + sin(x * 1e-2)) * 0.75;
        // y += sin(y * 0.125 * sin(i + x * 0.05e2) + sin(x * 1e-2)) * 0.75;
        x += tan(cos(i * 60. * tan(i * 1e3)) * 1e1 * sin(1e-5) + t * 20. + cos(i) * 1e-4) * 200.5 / i;
        y += tan(sin(i * 60. * tan(i * 1e3)) * 1e1 * sin(1e-5) - t * 20. + sin(i) * 1e-4) * 200.5 / i;
        //         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        // x += cos(t * 100.75 + i * 5e-5) * i * 0.000005;
        // y += sin(t * 100.75 + i * 5e-5) * i * 0.000005;
        // x += 1. * cos(t * 5.);
        // y += 1. * sin(t * 5.);
        x *= 1.5 * 1.;
        y *= 1.5 * 1.;
        // float xx = x + pow(cos(x * cos(x. * y) * sin(y * 10.)), 1.);
        // x = mix(x, xx, map(sin(t * 40.), * 100 -1., 1., 0., 1.));
        // x *= map(sin(t * 40.), -1., 1., 1., 2.5);
        float xx = x + cos(y * 1. * sin((100000. + y) * 1e2)) * 2.;
                // x = mix(x, xx, map(sin(t * 1. * sin(t * 2.)), -1., 1., 0., 1.));
        float yy = y + cos(x * 10. * sin((100000. + x) * 1e1)) * 2.;
        // x = mix(x, xx, 0.2);
        // y = mix(y, yy, 0.2);
        // y *= map(sin(t * 40.), -1., 1., 1., 2.5);
        vec2 v = vec2(x, y) * vec2(2.0, 1.25);
        // x += cos(t * 1e18) * 1.;
        // y += sin(t * 1e18) * 1.;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(v.x * 0.37, v.y, 0.0, 1.0);
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
glitchyRose2.fragText = `
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
        // gl_FragColor.g += gl_FragColor.b * gl_FragColor.r * 1.;
        gl_FragColor.b *= 0.5;
        // gl_FragColor.g += 0.4;
        gl_FragColor.rgb = gl_FragColor.rrr * 1.;
        
    }
    // endGLSL
`;
glitchyRose2.init();