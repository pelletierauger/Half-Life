incantation.vertText = `
    // beginGLSL
    // attribute vec4 coordinates;
    attribute float vertexID;
    uniform float time;
    uniform float resolutionScalar;
//     varying vec2 myposition;
//     varying vec2 center;
    varying float alph;
    varying float ind;
// 
float map(float value, float min1, float max1, float min2, float max2) {
    float perc = (value - min1) / (max1 - min1);
    return perc * (max2 - min2) + min2;
}
// 
    void main(void) {
        float t = (time + 1e2) * 2e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(tan(i * 1.5e-7) * 5e1 * i) * i * 16e-3;
        float y = sin(tan(i * 1.5e-7) * 5e1 * i) * i * 16e-3;
        x += tan(tan(cos(i * 600. * tan(i * 1e3)) * 2.) + t * 30.) * 1000.5;
        y += tan(tan(sin(i * 600. * tan(i * 1e3)) * 2.) + t * 30.) * 1000.5;
        x += sin(pow(x, i * 1e-3));
        y += sin(pow(y, i * 1e-3));
        // x += cos(t * 15.75e1) * i * 2.5 * 32e-4 + cos(t * 1e2) * 1e2 * i * 1e-4;
        // y += sin(t * 15.75e1) * i * 2.5 * 32e-4 + sin(t * 1e2) * 1e2 * i * 1e-4;
        x += 1000. * cos(t * 4e1) * 1.;
        y += 1000. * sin(t * 4e1) * 1.;
        x *= 4.5e-3;
        y *= 4.5e-3;
        // x = mix(x, x * cos(i * 1e-5) * i * 1e-4, 0.1);
        // y = mix(y, y * sin(i * 1e-5) * i * 1e-4, 0.1);
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.6 * 1e-1, y * 1e-1, 0.0, 1.0);
//         center = vec2(gl_Position.x, gl_Position.y);
//         center = 512.0 + center * 512.0;
//         myposition = vec2(gl_Position.x, gl_Position.y);
        alph = 0.25 * 0.5;
        ind = vertexID;
        gl_PointSize = 14.0 * resolutionScalar;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
incantation.fragText = `
    // beginGLSL
    precision mediump float;
//     varying vec2 myposition;
//     varying vec2 center;
    varying float alph;
    varying float ind;
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
        // gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.grr, sin(uv.x)) * 1.;
        // gl_FragColor.rgb = gl_FragColor.rgg;
        // gl_FragColor.b += 0.5 * sin(ind * 1e2) * 2.;
        gl_FragColor.rgb = gl_FragColor.rrr * 1.;
    }
    // endGLSL
`;
incantation.init();