let fasterDots = new ShaderProgram("faster-dots");

fasterDots.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        gl_PointSize = 15.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 2.;
        alph = coordinates.w;
        // gl_PointSize = coordinates.z;
    }
    // endGLSL
    `;
fasterDots.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
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
        alpha = smoothstep(0.015, 0.000125, dist_squared) * 0.49;
        float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.2));
        gl_FragColor = vec4(1.0, 0.2 - dist_squared, 0.0 + alpha * 120., ((3. - dist_squared * 12.0 - (rando * 0.1)) * 0.045 + alpha) * 1.0) * 1.25;
        // gl_FragColor = vec4(1.0, 1.0 - dist_squared * 1.0, 0.0, 0.35 - dist_squared - (rando * 0.2));
        // gl_FragColor = vec4(d * 0.001, uv.x, 0.0, 0.25);
    }
    // endGLSL
`;
fasterDots.init();


let redDots = new ShaderProgram("white-flickering-dots");

redDots.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = coordinates.z;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
redDots.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
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
        alpha = smoothstep(0.015, 0.000125, dist_squared) * 0.49;
        float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.2));
        gl_FragColor = vec4(1.0, 1.0 - dist_squared, 1.0 + alpha * 120., ((3. - dist_squared * 12.0 - (rando * 0.1)) * 0.0245 + alpha) * alph) * 1.5;
        // gl_FragColor = vec4(1.0, 0.2 - dist_squared, 0.0 + alpha * 120., (0.25 - dist_squared * 3.0 - (rando * 0.1)) * 0.25 + alpha) * 1.25;
//         gl_FragColor = vec4(1.0, 1.0 - dist_squared * 1.0, 0.0, 0.35 - dist_squared - (rando * 0.2));
        // gl_FragColor = vec4(d * 0.001, uv.x, 0.0, 0.25);
        // endGLSL
    }`;
redDots.init();

let fog = new ShaderProgram("fog");
fog.vertText = `
    // beginGLSL
    // our vertex data
    attribute vec3 aPosition;
    // our texcoordinates
    attribute vec2 aTexCoord;
    // this is a variable that will be shared with the fragment shader
    // we will assign the attribute texcoords to the varying texcoords to move them from the vert shader to the frag shader
    // it can be called whatever you want but often people prefiv it with 'v' to indicate that it is a varying
    varying vec2 vTexCoord;
    void main() {
    // copy the texture coordinates
    vTexCoord = aTexCoord;
    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    // send the vertex information on to the fragment shader
    gl_Position = positionVec4;
    }
    // endGLSL
`;
fog.fragText = `
    // beginGLSL
    precision lowp float;
varying vec2 vTexCoord;
uniform float time;
const float TURBULENCE = 0.009;
//noise function from iq: https://www.shadertoy.com/view/Msf3WH
vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
}
const mat2 m2 = mat2(1.6,  1.2, -1.2,  1.6);
float fbm(vec2 p) {
    float amp = 0.5;
    float h = 0.0;
    for (int i = 0; i < 8; i++) {
        float n = noise(p);
        h += amp * n;
        amp *= 0.5;
        p = m2 * p;
    }
    return  0.5 + 0.5 * h;
}
vec3 smokeEffect(vec2 uv) {
    vec3 col = vec3(0.0, 0.0, 0.0);
    // time scale
    float v = 0.0002;
    vec3 smoke = vec3(1.0);
    //uv += mo * 10.0;
    vec2 scale = uv * 0.5;
    vec2 turbulence = TURBULENCE * vec2(noise(vec2(uv.x * 3.5, uv.y * 3.2) * 1.), noise(vec2(uv.x * 2.2, uv.y * 1.5)));
    scale += turbulence;
    float n1 = fbm(vec2(scale.x - abs(sin(time * v * 1000.0)), scale.y - 50.0 * abs(sin(time * v * 410.0))));
    col = mix(col, smoke, smoothstep(0.35, 0.9, n1));
    //float y = fragCoord.y/iResolution.y;
    //float fade = exp(-(y*y));
    //col *= fade;
//     col.r * 0.5;
    col = clamp(col, vec3(0.0), vec3(1.0)) * 2.;
    return col;
}
float circle(vec2 p, float r) {
    float c = length(p) - r;
    return smoothstep(r + 0.02, r, c);
}
float sinwave(vec2 p, float scale, float amp) {
    float wave = cos(p.x * scale + 1.5 + time * 20.) + 0.25 * cos(p.x * scale * scale + time * 20.);
    float s = smoothstep(amp + 0.07, amp, amp * wave * 0.5 - p.y * 0.5);
    return s;
}
float plot(vec2 s, float p) {
    float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
    return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  // float x = cos(time * speed) * dist * 0.012 - 0.425;
  // float y = sin(time * speed) * dist * 0.012 - 0.25;
  float t = time;
  float x = cos(t * speed * 1000.0) * dist * (sin(t)) * 0.12 - 0.425;
  float y = sin(t * speed * 1000.0) * dist * (sin(t)) * 0.12 - 0.25;
  // float x = cos(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.425;
  // float y = sin(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
     d = sin(d * cos(t * 5.) * 1.);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    vec2 p = gl_FragCoord.xy/1000.0;
    p -= 0.5;
//     p.x *= 2.0;
    p *= 2.0;
    p.y += 0.35;
//     p.x *= iResolution.x / iResolution.y;
    vec3 col = vec3(0.0);
//     vec3 smoke = smokeEffect(p);
//     vec3 tex = 0.02 * texture(iChannel0, uv * 2.5).rgb;   
    vec3 background = 0.7 * vec3(0.0, 100.0, 200.0) / 255.0;
    vec3 mountCol = mix(vec3(12.0, 153.0, 253.0) / 255.0, vec3(253.0 ,104.0 ,50.0) / 255.0, p.y + 0.5);
//     vec3 sunCol = 0.85 * mix(vec3(1.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0), p.y + 0.5);
    vec3 cloudCol = vec3(0.9);
    float t = time * 20.5;
//     vec2 sunPos = p - vec2(0.4 * cos(t * 0.1), 0.4 * sin(t * 0.1));
//     float sun = circle(sunPos, 0.03);
    float mountain1 = sinwave(p - vec2(0.5, -1.1), 2.4, 0.1);
    float mountain2 = sinwave(p + vec2(0.0, 0.2), 2.0, 0.2);
//     float mountain3 = sinwave(p + vec2(-12.0, -0.5), -2.5, 0.1);
//     float cloud = 1.5 + smoke.r;
//     col = mix(background, sunCol, sun);
    vec3 smoke2 = smokeEffect(p + vec2(-1.0, -2.0));
    float cloud2 = 1.15 + smoke2.r;
//     col = mix(mountCol * 1.2, background, mountain3);
    col = mix(mountCol * 0.79, background, mountain1);
//     col = mix(cloudCol, col, cloud);
//     col = mix(mountCol * 0.5, col, mountain2);
    col = mix(cloudCol, col, vec3(cloud2 * 0.85, cloud2 * 0.85, cloud2 * 1.75));
    float rando = rand(vec2(uv.x, uv.y) * 100.);
//     col *= 0.2 + 0.8 * pow(32.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y), 0.2);
    gl_FragColor = vec4(col - rando * 0.1, 1.0);
//     gl_FragColor.b *= 0.25;
//     gl_FragColor = gl_FragColor.brga;
//     gl_FragColor.r = gl_FragColor.r - rando * 0.1;
    // gl_FragColor = gl_FragColor.grba;
    gl_FragColor.rgb *= 1.;
        gl_FragColor = gl_FragColor.brga;
        // gl_FragColor.r *= 3.;
}
// endGLSL
`;
fog.init();



let newFlickering = new ShaderProgram("new-flickering-dots");

newFlickering.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = (9. + coordinates.z / ((6.0 + alph) * 0.25)) * 1.0;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
newFlickering.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
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
        alpha = smoothstep(0.015 / (0.9 + alph), 0.000125, dist_squared) * 0.49;
        float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.2));
        gl_FragColor = vec4(1.0, 0.2 - dist_squared, 0.0 + alpha * 120., ((3. - dist_squared * 24.0 * (0.25 + alph) - (rando * 1.1)) * 0.045 + alpha)) * 1.25;
        
        
    }
    // endGLSL
`;
newFlickering.init();

let greyFog = new ShaderProgram("grey-fog");
greyFog.vertText = `
    // beginGLSL
    // our vertex data
    attribute vec3 aPosition;
    // our texcoordinates
    attribute vec2 aTexCoord;
    // this is a variable that will be shared with the fragment shader
    // we will assign the attribute texcoords to the varying texcoords to move them from the vert shader to the frag shader
    // it can be called whatever you want but often people prefiv it with 'v' to indicate that it is a varying
    varying vec2 vTexCoord;
    void main() {
    // copy the texture coordinates
    vTexCoord = aTexCoord;
    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    // send the vertex information on to the fragment shader
    gl_Position = positionVec4;
    }
    // endGLSL
`;
greyFog.fragText = `
// beginGLSL
precision lowp float;
varying vec2 vTexCoord;
uniform float time;
const float TURBULENCE = 0.009;
//noise function from iq: https://www.shadertoy.com/view/Msf3WH
vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
}
const mat2 m2 = mat2(1.6,  1.2, -1.2,  1.6);
float fbm(vec2 p) {
    float amp = 0.5;
    float h = 0.0;
    for (int i = 0; i < 8; i++) {
        float n = noise(p);
        h += amp * n;
        amp *= 0.5;
        p = m2 * p;
    }
    return  0.5 + 0.5 * h;
}
vec3 smokeEffect(vec2 uv) {
    vec3 col = vec3(0.0, 0.0, 0.0);
    // time scale
    float v = 0.0002;
    vec3 smoke = vec3(1.0);
    //uv += mo * 10.0;
    vec2 scale = uv * 0.5;
    vec2 turbulence = TURBULENCE * vec2(noise(vec2(uv.x * 3.5, uv.y * 3.2) * 1.), noise(vec2(uv.x * 2.2, uv.y * 1.5)));
    scale += turbulence;
    float n1 = fbm(vec2(scale.x - abs(sin(time * v * 1000.0)), scale.y - 50.0 * abs(sin(time * v * 410.0))));
    col = mix(col, smoke, smoothstep(0.35, 0.9, n1));
    //float y = fragCoord.y/iResolution.y;
    //float fade = exp(-(y*y));
    //col *= fade;
//     col.r * 0.5;
    col = clamp(col, vec3(0.0), vec3(1.0)) * 2.;
    return col;
}
float circle(vec2 p, float r) {
    float c = length(p) - r;
    return smoothstep(r + 0.02, r, c);
}
float sinwave(vec2 p, float scale, float amp) {
    float wave = cos(p.x * scale + 1.5 + time * 20.) + 0.25 * cos(p.x * scale * scale + time * 20.);
    float s = smoothstep(amp + 0.07, amp, amp * wave * 0.5 - p.y * 0.5);
    return s;
}
float plot(vec2 s, float p) {
    float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
    return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  // float x = cos(time * speed) * dist * 0.012 - 0.425;
  // float y = sin(time * speed) * dist * 0.012 - 0.25;
  float t = time;
  float x = cos(t * speed * 1000.0) * dist * (sin(t)) * 0.12 - 0.425;
  float y = sin(t * speed * 1000.0) * dist * (sin(t)) * 0.12 - 0.25;
  // float x = cos(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.425;
  // float y = sin(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
     d = sin(d * cos(t * 5.) * 1.);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    vec2 p = gl_FragCoord.xy/1000.0;
    p -= 0.5;
//     p.x *= 2.0;
    p *= 2.0;
    p.y += 0.35;
//     p.x *= iResolution.x / iResolution.y;
    vec3 col = vec3(0.0);
//     vec3 smoke = smokeEffect(p);
//     vec3 tex = 0.02 * texture(iChannel0, uv * 2.5).rgb;   
    vec3 background = 0.7 * vec3(0.0, 100.0, 200.0) / 255.0;
    // vec3 mountCol = mix(vec3(12.0, 153.0, 253.0) / 255.0, vec3(253.0 ,104.0 ,50.0) / 255.0, p.y + 0.5);
//     vec3 sunCol = 0.85 * mix(vec3(1.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0), p.y + 0.5);
    vec3 mountCol = vec3(250.0);
    vec3 cloudCol = vec3(0.9);
    float t = time * 20.5;
//     vec2 sunPos = p - vec2(0.4 * cos(t * 0.1), 0.4 * sin(t * 0.1));
//     float sun = circle(sunPos, 0.03);
    float mountain1 = sinwave(p - vec2(0.5, -1.1), 2.4, 0.1);
    float mountain2 = sinwave(p + vec2(0.0, 0.2), 2.0, 0.2);
//     float mountain3 = sinwave(p + vec2(-12.0, -0.5), -2.5, 0.1);
//     float cloud = 1.5 + smoke.r;
//     col = mix(background, sunCol, sun);
    vec3 smoke2 = smokeEffect(p + vec2(-1.0, -2.0));
    float cloud2 = 2.0 + smoke2.r;
//     col = mix(mountCol * 1.2, background, mountain3);
    col = mix(mountCol * 0.79, background, mountain1);
//     col = mix(cloudCol, col, cloud);
//     col = mix(mountCol * 0.5, col, mountain2);
    col = mix(cloudCol, col, vec3(cloud2, cloud2, cloud2));
    float rando = rand(vec2(uv.x, uv.y) * 100.) * 0.075;
    float rando2 = rand(vec2(uv.x, uv.y) * 200.) * 0.1;
    float rando3 = rand(vec2(uv.x, uv.y) * 300.) * 0.1;
//     col *= 0.2 + 0.8 * pow(32.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y), 0.2);
    gl_FragColor = vec4(vec3(col.b - rando), 1.0);
//     gl_FragColor.b *= 0.25;
//     gl_FragColor = gl_FragColor.brga;
//     gl_FragColor.r = gl_FragColor.r - rando * 0.1;
    // gl_FragColor = gl_FragColor.grba;
    // gl_FragColor.rgb *= 1.;
        // gl_FragColor = gl_FragColor.brga;
        // gl_FragColor.r *= 3.;
}
// endGLSL
`;
greyFog.init();

let pulsarDots = new ShaderProgram("pulsar-dots");
pulsarDots.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        // gl_PointSize = 9. + coordinates.z / ((6.0 + alph) * 0.25);
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        gl_PointSize = max(25.0, coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5)));
    }
    // endGLSL
    `;
pulsarDots.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
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
        alpha = smoothstep(0.015 / (0.9 + alph), 0.000125, dist_squared) * 0.49;
        float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.1));
        gl_FragColor = vec4(1.0, 0.2 - dist_squared, 0.0 + alpha * 120., ((3. - dist_squared * 24.0 * (0.25 + alph) - (rando * 1.25)) * 0.045 + alpha)) * 1.25;
        // gl_FragColor = gl_FragColor.rbga;
        // gl_FragColor = gl_FragColor.gbra;
        // gl_FragColor.rgb *= 3.5;
        // gl_FragColor.b += 0.25;
        // gl_FragColor.a *= 1.5;
        
    }
    // endGLSL
`;
pulsarDots.init();


let whitePulsarDots = new ShaderProgram("white-pulsar-dots");

whitePulsarDots.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = 20. + coordinates.z / ((6.0 + alph) * 0.25);
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = max(25.0, coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5)));
    }
    // endGLSL
`;
whitePulsarDots.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
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
        alpha = smoothstep(0.015 / (0.9 + alph), 0.000125, dist_squared) * 0.49;
        float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.1));
        gl_FragColor = vec4(1.0, 0.2 - dist_squared, 0.0 + alpha * 120., ((3. - dist_squared * 24.0 * (0.25 + alph) - (rando * 1.25)) * 0.045 + alpha)) * 1.25;
        gl_FragColor = vec4(1.0, 1.0 - dist_squared, 1.0 + alpha * 120., ((3. - dist_squared * 12.0 - (rando * 1.1)) * 0.0245 + alpha) * alph) * 1.5;
        gl_FragColor.r *= 20.5 * alpha;
        // gl_FragColor.b /= alpha * 400.;
        gl_FragColor.b *= 0.5;
        // gl_FragColor.b /= alpha * 200.;
        // gl_FragColor = gl_FragColor.rbga;
        // gl_FragColor = gl_FragColor.gbra;
        // gl_FragColor.rgb *= 3.5;
        // gl_FragColor.b += 0.25;
        
    }
    // endGLSL
`;
whitePulsarDots.init();

let pulsarFog = new ShaderProgram("pulsar-fog");

pulsarFog.vertText = `
    // beginGLSL
    // our vertex data
    attribute vec3 aPosition;
    // our texcoordinates
    attribute vec2 aTexCoord;
    // this is a variable that will be shared with the fragment shader
    // we will assign the attribute texcoords to the varying texcoords to move them from the vert shader to the frag shader
    // it can be called whatever you want but often people prefiv it with 'v' to indicate that it is a varying
    varying vec2 vTexCoord;
    void main() {
    // copy the texture coordinates
    vTexCoord = aTexCoord;
    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    // send the vertex information on to the fragment shader
    gl_Position = positionVec4;
    }
    // endGLSL
`;
pulsarFog.fragText = `
// beginGLSL
precision lowp float;
varying vec2 vTexCoord;
uniform float time;
uniform float resolution;
uniform float brightness;
const float TURBULENCE = 0.009;
//noise function from iq: https://www.shadertoy.com/view/Msf3WH
vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
}
const mat2 m2 = mat2(1.6,  1.2, -1.2,  1.6);
float fbm(vec2 p) {
    float amp = 0.5;
    float h = 0.0;
    for (int i = 0; i < 8; i++) {
        float n = noise(p);
        h += amp * n;
        amp *= 0.5;
        p = m2 * p;
    }
    return  0.5 + 0.5 * h;
}
vec3 smokeEffect(vec2 uv) {
    vec3 col = vec3(0.0, 0.0, 0.0);
    // time scale
    float v = 0.0002;
    vec3 smoke = vec3(1.0);
    //uv += mo * 10.0;
    vec2 scale = uv * 0.5;
    vec2 turbulence = TURBULENCE * vec2(noise(vec2(uv.x * 3.5, uv.y * 3.2) * 1.), noise(vec2(uv.x * 2.2, uv.y * 1.5)));
    scale += turbulence;
    float n1 = fbm(vec2(scale.x - abs(sin(time * v * 1000.0)), scale.y - 50.0 * abs(sin(time * v * 410.0))));
    col = mix(col, smoke, smoothstep(0.35, 0.9, n1));
    //float y = fragCoord.y/iResolution.y;
    //float fade = exp(-(y*y));
    //col *= fade;
//     col.r * 0.5;
    col = clamp(col, vec3(0.0), vec3(1.0)) * 2.;
    return col;
}
float circle(vec2 p, float r) {
    float c = length(p) - r;
    return smoothstep(r + 0.02, r, c);
}
float sinwave(vec2 p, float scale, float amp) {
    float wave = cos(p.x * scale + 1.5 + time * 20.) + 0.25 * cos(p.x * scale * scale + time * 20.);
    float s = smoothstep(amp + 0.07, amp, amp * wave * 0.5 - p.y * 0.5);
    return s;
}
float plot(vec2 s, float p) {
    float largeur = abs(sin(time * 0.01)) * 0.1 + 0.1;
    return smoothstep(p - largeur, p, s.y) - smoothstep(p, p + largeur, s.y);
}
float circ(float speed, float size, float vx, float vy, float dist) {
  // float x = cos(time * speed) * dist * 0.012 - 0.425;
  // float y = sin(time * speed) * dist * 0.012 - 0.25;
  float t = time;
  float x = cos(t * speed * 1000.0) * dist * (sin(t)) * 0.12 - 0.425;
  float y = sin(t * speed * 1000.0) * dist * (sin(t)) * 0.12 - 0.25;
  // float x = cos(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.425;
  // float y = sin(time * speed) * dist * abs(sin(time * 0.01) * 1.0) - 0.25;
  vec2 v = vec2(vx + x, vy + y);
  float d = 1.0 / length(v * size);
     d = sin(d * cos(t * 5.) * 1.);
  return d;
}
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);
    vec2 p = gl_FragCoord.xy / 1000.0 / resolution;
    vec3 col = vec3(0.0);
//     vec3 smoke = smokeEffect(p);
//     vec3 tex = 0.02 * texture(iChannel0, uv * 2.5).rgb;   
    vec3 background = 0.7 * vec3(0.0, 100.0, 200.0) / 255.0;
    vec3 mountCol = mix(vec3(12.0, 153.0, 253.0) / 255.0, vec3(253.0 ,104.0 ,50.0) / 255.0, p.y + 0.5);
//     vec3 sunCol = 0.85 * mix(vec3(1.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0), p.y + 0.5);
    vec3 cloudCol = vec3(0.9);
    float t = time * 20.5;
//     vec2 sunPos = p - vec2(0.4 * cos(t * 0.1), 0.4 * sin(t * 0.1));
//     float sun = circle(sunPos, 0.03);
    float mountain1 = sinwave(p - vec2(0.5, -1.1), 2.4, 0.1);
    float mountain2 = sinwave(p + vec2(0.0, 0.2), 2.0, 0.2);
//     float mountain3 = sinwave(p + vec2(-12.0, -0.5), -2.5, 0.1);
//     float cloud = 1.5 + smoke.r;
//     col = mix(background, sunCol, sun);
    vec3 smoke2 = smokeEffect(p + vec2(-1.0, -2.0));
    float cloud2 = 1.15 + smoke2.r;
//     col = mix(mountCol * 1.2, background, mountain3);
    col = mix(mountCol * 0.79, background, mountain1);
//     col = mix(cloudCol, col, cloud);
//     col = mix(mountCol * 0.5, col, mountain2);
    col = mix(cloudCol, col, vec3(cloud2 * 0.85, cloud2 * 0.85, cloud2 * 1.75));
    float rando = rand(vec2(uv.x, uv.y) * 100.);
//     col *= 0.2 + 0.8 * pow(32.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y), 0.2);
    gl_FragColor = vec4(col - rando * 0.1, 1.0);
//     gl_FragColor.b *= 0.25;
//     gl_FragColor = gl_FragColor.brga;
//     gl_FragColor.r = gl_FragColor.r - rando * 0.1;
    // gl_FragColor = gl_FragColor.grba;
    gl_FragColor.rgb *= 1.;
        gl_FragColor = gl_FragColor.brga;
        gl_FragColor.r *= 0.5;
        gl_FragColor.b *= 1.25;
    gl_FragColor.rgb *= 0.75;
    gl_FragColor.rgb = gl_FragColor.bbb * brightness;
    //    gl_FragColor = vec4(0., 0., 0., 1.);
        // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}
// endGLSL
`;
pulsarFog.init();
if (pulsarFog.initialized) {
    time = gl.getUniformLocation(getProgram("pulsar-fog"), "time"); 
    resolutionBG = gl.getUniformLocation(getProgram("pulsar-fog"), "resolution");
}




let gold = new ShaderProgram("gold");

gold.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = 9. + coordinates.z / ((6.0 + alph) * 0.25);
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
gold.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
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
        alpha = smoothstep(0.015 / (0.9 + alph), 0.000125, dist_squared) * 0.49;
        float alpha2 = smoothstep(0.15 / (0.9 + alph), 0.000125, dist_squared) * 0.49;
        float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.2));
        gl_FragColor = vec4(0.3 + alpha2 * 40.0, 0.1 + alpha * 1.0, 0.25 + alpha * 0., ((3. - dist_squared * 24.0 * (0.25 + alph) - (rando * 1.1)) * 0.045 + alpha)) * 1.5;        
    }
    // endGLSL
`;
gold.init();



let textureShader = new ShaderProgram("textu");

textureShader.vertText = `
attribute vec3 a_position;
attribute vec2 a_texcoord;
varying vec2 v_texcoord;

void main() {
  // Multiply the position by the matrix.
  vec4 positionVec4 = vec4(a_position, 1.0);
  // gl_Position = a_position;
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;

  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
`;

textureShader.fragText = `
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
   gl_FragColor = texture2D(u_texture, v_texcoord);
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
   gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.025)) * 1.5;
}
`;


let processorShader = new ShaderProgram("process");

processorShader.vertText = `
attribute vec3 a_position;
attribute vec2 a_texcoord;

// uniform vec2 u_resolution;
// uniform float u_flipY;

varying vec2 v_texcoord;

void main() {
  // Multiply the position by the matrix.
  vec4 positionVec4 = vec4(a_position, 1.0);
  // gl_Position = a_position;
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;

  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
`;

processorShader.fragText = `
precision mediump float;

// our texture
uniform sampler2D u_texture;
uniform vec2 u_textureSize;
uniform float u_kernel[9];
uniform float u_kernelWeight;
uniform vec2 direction;

// the texCoords passed in from the vertex shader.
varying vec2 v_texcoord;

vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3846153846) * direction;
  vec2 off2 = vec2(3.2307692308) * direction;
  color += texture2D(image, uv) * 0.2270270270;
  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
  return color;
}

void main() {
   vec2 uv = vec2(gl_FragCoord.xy);
   // vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;
   // vec4 colorSum =
   //     texture2D(u_texture, v_texcoord + onePixel * vec2(-1, -1)) * u_kernel[0] +
   //     texture2D(u_texture, v_texcoord + onePixel * vec2( 0, -1)) * u_kernel[1] +
   //     texture2D(u_texture, v_texcoord + onePixel * vec2( 1, -1)) * u_kernel[2] +
   //     texture2D(u_texture, v_texcoord + onePixel * vec2(-1,  0)) * u_kernel[3] +
   //     texture2D(u_texture, v_texcoord + onePixel * vec2( 0,  0)) * u_kernel[4] +
   //     texture2D(u_texture, v_texcoord + onePixel * vec2( 1,  0)) * u_kernel[5] +
   //     texture2D(u_texture, v_texcoord + onePixel * vec2(-1,  1)) * u_kernel[6] +
   //     texture2D(u_texture, v_texcoord + onePixel * vec2( 0,  1)) * u_kernel[7] +
   //     texture2D(u_texture, v_texcoord + onePixel * vec2( 1,  1)) * u_kernel[8] ;

   // gl_FragColor = vec4((colorSum / u_kernelWeight).rgb, 1);

   gl_FragColor = blur9(u_texture, v_texcoord, u_textureSize, direction);
   // vec4 pass1 = blur9(u_texture, v_texcoord, u_textureSize, vec2(0.0, 1.5));
   // gl_FragColor = (pass0 + pass1) / 2.0;
   // gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
`;


let concentric = new ShaderProgram("concentric");

concentric.vertText = `
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
        float t = (time + 366.) * 2e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(2e-1 * i) * i * 5e-2;
        float y = sin(2e-1 * i) * i * 5e-2;
        i = i + 1e4 * sin(i * 1e-4);
        x += sin(cos(i * 1690. * tan(i * 0.5e-3)) * 5e3 * sin(t * 0.5e-2)) * 5000.5;
        y += sin(sin(i * 1690. * tan(i * 0.5e-3)) * 5e3 * sin(t * 0.5e-2)) * 5000.5;
//         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        x += cos(t * 2.75e2) * i * 0.015;
        y += sin(t * 2.75e2) * i * 0.015;
        // x += 1000. * cos(t * 8e1) * 2.5;
        // y += 1000. * sin(t * 8e1) * 2.5;
        x *= 2.5e-3;
        y *= 2.5e-3;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(y * 0.35e-1 * 1.42, x * 0.58 * 1e-1 * 1.5 - 0.0, 0.0, 1.0);
//         center = vec2(gl_Position.x, gl_Position.y);
//         center = 512.0 + center * 512.0;
//         myposition = vec2(gl_Position.x, gl_Position.y);
        alph = 0.25 * 0.5;
        gl_PointSize = 8.0 * resolutionScalar;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
concentric.fragText = `
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
        gl_FragColor.rgb = gl_FragColor.rrr * 1.;
        
        
    }
    // endGLSL
`;
concentric.init();



let mysteriousMap = new ShaderProgram("mysterious-map");

mysteriousMap.vertText = `
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
        float t = time * 2e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(2e-1 * i) * i * 16e-3;
        float y = sin(2e-1 * i) * i * 16e-3;
        x += sin(cos(i * 690. * tan(i * 3e-5) * sin(i)) * 1e4 * sin(t * 0.5e-2)) * 5000.5;
        y += sin(sin(i * 690. * tan(i * 3e-5) * sin(i)) * 1e4 * sin(t * 0.5e-2)) * 5000.5;
//         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        x += cos(t * 2.75e2) * i * 0.015;
        y += sin(t * 2.75e2) * i * 0.015;
        // x += 1000. * cos(t * 4e1) * 1.5;
        // y += 1000. * sin(t * 4e1) * 1.5;
        x *= 2.5e-3;
        y *= 2.5e-3;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.58 * 1e-1 * 1.1, y * 1e-1 * 1.1, 0.0, 1.0);
//         center = vec2(gl_Position.x, gl_Position.y);
//         center = 512.0 + center * 512.0;
//         myposition = vec2(gl_Position.x, gl_Position.y);
        alph = 0.25 * 0.5;
        gl_PointSize = 8.0 * resolutionScalar;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
mysteriousMap.fragText = `
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
        gl_FragColor.rgb = gl_FragColor.rrr * 0.9;
        
        
    }
    // endGLSL
`;
mysteriousMap.init();


let anneauxFlottants = new ShaderProgram("anneaux-flottants");

anneauxFlottants.vertText = `
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
        float t = time * 2e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i * 1.5e-6 * i) * i * 16e-3;
        float y = sin(i * 1.5e-6 * i) * i * 16e-3;
        x += tan(tan(i * i * cos(i * 1e2 * sin(i * 2e3)) * 1e3) + osc * 2e1 / i * 1e4) * 5000.5;
        y += tan(tan(i * i * sin(i * 1e2 * sin(i * 2e3)) * 1e3) + osc * 2e1 / i * 1e4) * 5000.5;
//         x *= 0.25 * 44.5;
        // y += cos(x * i) * x * 2e1;
        // x += sin(y * i) * y * 2.;
        x += cos(t * 0.75e2) * i * 0.0625;
        y += sin(t * 0.75e2) * i * 0.0625;
        // x += 1000. * cos(t * 1e1) * 1.;
        // y += 1000. * sin(t * 1e1) * 1.;
        x *= 1.125e-3;
        y *= 1.125e-3;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.6 * 1e-1, y * 1e-1, 0.0, 1.0);
//         center = vec2(gl_Position.x, gl_Position.y);
//         center = 512.0 + center * 512.0;
//         myposition = vec2(gl_Position.x, gl_Position.y);
        alph = 0.25 * 0.5;
        gl_PointSize = 14. * resolutionScalar;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
anneauxFlottants.fragText = `
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
                gl_FragColor.rgb = gl_FragColor.rrr * 1.;
        
    }
    // endGLSL
`;
anneauxFlottants.init();


let anneauxFlottants2 = new ShaderProgram("anneaux-flottants-2");

anneauxFlottants2.vertText = `
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
        float t = -time * 2e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i * 1.5e-6 * i) * i * 16e-3;
        float y = sin(i * 1.5e-6 * i) * i * 16e-3;
        x += tan(tan(i * i * cos(i * 1e2 * sin(i * 2e3)) * 1e4) + osc * 1e1 / i * 1e4) * 5000.5;
        y += tan(tan(i * i * sin(i * 1e2 * sin(i * 2e3)) * 1e4) + osc * 1e1 / i * 1e4) * 5000.5;
//         x *= 0.25 * 44.5;
        // y += cos(x * i) * x * 2e1;
        // x += sin(y * i) * y * 2.;
        x += cos(t * 0.75e2) * i * 0.0625;
        y += sin(t * 0.75e2) * i * 0.0625;
        // x += 1000. * cos(t * 1e1) * 1.;
        // y += 1000. * sin(t * 1e1) * 1.;
        x *= 1.5e-3;
        y *= 1.5e-3;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.6 * -1e-1, y * 1e-1, 0.0, 1.0);
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
anneauxFlottants2.fragText = `
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
        gl_FragColor.rgb = gl_FragColor.rrr * 1.;
        
    }
    // endGLSL
`;
anneauxFlottants2.init();



let anneauxFlottants3 = new ShaderProgram("anneaux-flottants-3");

anneauxFlottants3.vertText = `
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
        float t = time * 2e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i * 1.5e-6 * i) * i * 16e-3;
        float y = sin(i * 1.5e-6 * i) * i * 16e-3;
        x += tan(tan(i * i * cos(i * 1e2 * sin(i * 2e3)) * 1e5) + osc * 1e1 / i * 1e4) * 5000.5;
        y += tan(tan(i * i * sin(i * 1e2 * sin(i * 2e3)) * 1e5) + osc * 1e1 / i * 1e4) * 5000.5;
//         x *= 0.25 * 44.5;
        // y += cos(x * i) * x * 2e1;
        // x += sin(y * i) * y * 2.;
        x += cos(t * 0.75e2) * i * 0.0625;
        y += sin(t * 0.75e2) * i * 0.0625;
        // x += 1000. * cos(t * 1e1) * 1.;
        // y += 1000. * sin(t * 1e1) * 1.;
        x *= 1.5e-3;
        y *= 1.5e-3;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.6 * 1e-1, y * 1e-1, 0.0, 1.0);
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
anneauxFlottants3.fragText = `
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
        gl_FragColor.rgb = gl_FragColor.rrr * 1.;
        
    }
    // endGLSL
`;
anneauxFlottants3.init();


let rings2 = new ShaderProgram("rings-2");

rings2.vertText = `
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
        float t = (time + 780.) * 2e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(tan(i * 1.5e-7) * 1e2 * i) * i * 16e-3;
        float y = sin(tan(i * 1.5e-7) * 1e2 * i) * i * 16e-3;
        x += tan(cos(i * 1e2 * sin(i * 1e3)) * 1e17 * i) * 1000.5;
        y += tan(sin(i * 1e2 * sin(i * 1e3)) * 1e17 * i) * 1000.5;
//         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        x += cos(t * 0.75e2) * i * 0.125;
        y += sin(t * 0.75e2) * i * 0.125;
        x += 1000. * cos(t * 2e1) * 5.;
        y += 1000. * sin(t * 2e1) * 5.;
        x *= 2.25e-3;
        y *= 2.25e-3;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.6 * 1e-1, y * 1e-1, 0.0, 1.0);
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
rings2.fragText = `
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
                        gl_FragColor.rgb = gl_FragColor.rrr * 1.;
    }
    // endGLSL
`;
rings2.init();


let slinky = new ShaderProgram("slinky");

slinky.vertText = `
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
        float t = time * 2e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i * 1.5e-6 * i) * i * 32e-3;
        float y = sin(i * 1.5e-6 * i) * i * 32e-3;
        x += tan((i * i * cos(i * 1e2 * sin(i * 2e3)) * 1e3) + osc * 1e2 / i * 5e3) * 5000.5;
        y += tan((i * i * sin(i * 1e2 * sin(i * 2e3)) * 1e3) + osc * 1e2 / i * 5e3) * 5000.5;
//         x *= 0.25 * 44.5;
        // y += cos(x * i) * x * 2e1;
        // x += sin(y * i) * y * 2.;
        x += cos(t * 0.75e2) * i * 0.1625;
        y += sin(t * 0.75e2) * i * 0.1625;
        // x += 1000. * cos(t * 1e1) * 1.;
        // y += 1000. * sin(t * 1e1) * 1.;
        x *= 1e-3;
        y *= 1e-3;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.6 * 1e-1, y * 1e-1, 0.0, 1.0);
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
slinky.fragText = `
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
                gl_FragColor.rgb = gl_FragColor.rrr * 1.;
        
    }
    // endGLSL
`;
slinky.init();



let concentric2 = new ShaderProgram("concentric-2");

concentric2.vertText = `
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
        float t = (time + 366.) * 2e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(2e-1 * i) * i * 5e-2;
        float y = sin(2e-1 * i) * i * 5e-2;
        i = i + 1e4 * sin(i * 1e-4);
        x += sin(cos(i * 1690. * tan(i * 0.5e-5)) * 5e3 * sin(t * 1e-2)) * 5000.5;
        y += sin(sin(i * 1690. * tan(i * 0.5e-5)) * 5e3 * sin(t * 1e-2)) * 5000.5;
//         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        x += cos(t * 2.75e2) * i * 0.015;
        y += sin(t * 2.75e2) * i * 0.015;
        // x += 1000. * cos(t * 8e1) * 2.5;
        // y += 1000. * sin(t * 8e1) * 2.5;
        x *= 1.5e-3;
        y *= 1.5e-3;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(y * 0.35e-1 * 1.42, x * 0.58 * 1e-1 * 1.5 - 0.0, 0.0, 1.0);
//         center = vec2(gl_Position.x, gl_Position.y);
//         center = 512.0 + center * 512.0;
//         myposition = vec2(gl_Position.x, gl_Position.y);
        alph = 0.25 * 0.5;
        gl_PointSize = 8.0 * resolutionScalar;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
concentric2.fragText = `
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
        gl_FragColor.rgb = gl_FragColor.rrr * 1.;
        
        
    }
    // endGLSL
`;
concentric2.init();


let concentric3 = new ShaderProgram("concentric-3");

concentric3.vertText = `
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
        float t = (time + 366.) * 2e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(2e-1 * i) * i * 3e-2;
        float y = sin(2e-1 * i) * i * 3e-2;
        // i = i + 1e4 * sin(i * 1e-4);
        x += sin(cos(i * 1690. * tan(i * 0.5e-5)) * 5e3 * sin(t * 1e-2)) * 5000.5;
        y += sin(sin(i * 1690. * tan(i * 0.5e-5)) * 5e3 * sin(t * 1e-2)) * 5000.5;
//         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        x += cos(t * 2.75e2) * i * 0.025;
        y += sin(t * 2.75e2) * i * 0.025;
        // x += 1000. * cos(t * 8e1) * 2.5;
        // y += 1000. * sin(t * 8e1) * 2.5;
        x *= 1.5e-3;
        y *= 1.5e-3;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(y * 0.35e-1 * 1.42, x * 0.58 * 1e-1 * 1.5 - 0.0, 0.0, 1.0);
//         center = vec2(gl_Position.x, gl_Position.y);
//         center = 512.0 + center * 512.0;
//         myposition = vec2(gl_Position.x, gl_Position.y);
        alph = 0.25 * 0.5;
        gl_PointSize = 8.0 * resolutionScalar;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
concentric3.fragText = `
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
        gl_FragColor.rgb = gl_FragColor.rrr * 1.;
        
        
    }
    // endGLSL
`;
concentric3.init();


let incantation = new ShaderProgram("incantation");

incantation.vertText = `
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
        float t = time * 2e-4;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(tan(i * 1.5e-7) * 5e1 * i) * i * 16e-3;
        float y = sin(tan(i * 1.5e-7) * 5e1 * i) * i * 16e-3;
        x += tan(cos(i * 69. * tan(i * 1e3)) * 1e8 * sin(t * 1e-5)) * 1000.5;
        y += tan(sin(i * 69. * tan(i * 1e3)) * 1e8 * sin(t * 1e-5)) * 1000.5;
//         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        x += cos(t * 15.75e1) * i * 0.015;
        y += sin(t * 15.75e1) * i * 0.015;
//         x += 1000. * cos(t * 2.) * 5.;
//         y += 1000. * sin(t * 2.) * 5.;
        x *= 2.5e-3;
        y *= 2.5e-3;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.6 * 1e-1, y * 1e-1, 0.0, 1.0);
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
incantation.fragText = `
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
                gl_FragColor.rgb = gl_FragColor.rrr * 1.;
        
    }
    // endGLSL
`;
incantation.init();


let rose = new ShaderProgram("rose");

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
        float t = time * 2e-3;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i + sin(i * 1e-4 + i * 1e-4)) * i * 1e-5;
        float y = sin(i + sin(i * 1e-4 + i * 1e-4)) * i * 1e-5;
        x += sin(x * 0.25 * sin(t * 1e1) * sin(i * 5.)) * 0.75;
        y += sin(y * 0.25 * sin(t * 1e1) * sin(i * 5.)) * 0.75;
//         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        // x += cos(t * 10.75) * i * 0.000015;
        // y += sin(t * 10.75) * i * 0.000015;
        // x += 1. * cos(t * 5.);
        // y += 1. * sin(t * 5.);
        x *= 1.5;
        y *= 1.5;
        // x += cos(t * 1e18) * 1.;
        // y += sin(t * 1e18) * 1.;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.55, y, 0.0, 1.0);
//         center = vec2(gl_Position.x, gl_Position.y);
//         center = 512.0 + center * 512.0;
//         myposition = vec2(gl_Position.x, gl_Position.y);
        alph = 0.25 * 0.5;
        gl_PointSize = 9.0 * resolutionScalar;
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


let glitchyRose = new ShaderProgram("glitchy-rose");

glitchyRose.vertText = `
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
        float t = (time + 100.) * 1e-3;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i + sin(i * 1e-4 + i * 1e-4)) * i * 1e-5;
        float y = sin(i + sin(i * 1e-4 + i * 1e-4)) * i * 1e-5;
        x += sin(x * 0.25 * sin(t * 1e1) * sin(i * 3. + x * 0.5e2) * sin(x * 1e2)) * 0.75;
        y += sin(y * 0.25 * sin(t * 1e1) * sin(i * 3. + x * 0.5e2) * sin(x * 1e2)) * 0.75;
//         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        x += cos(t * 10.75) * i * 0.000005;
        y += sin(t * 10.75) * i * 0.000005;
        // x += 1. * cos(t * 5.);
        // y += 1. * sin(t * 5.);
        x *= 2.5;
        y *= 2.5;
        // float xx = x + pow(cos(x * cos(x. * y) * sin(y * 10.)), 1.);
        // x = mix(x, xx, map(sin(t * 40.), * 100 -1., 1., 0., 1.));
        // x *= map(sin(t * 40.), -1., 1., 1., 2.5);
        float xx = x + cos(y * 1. * sin((100000. + y) * 1e2)) * 2.;
                // x = mix(x, xx, map(sin(t * 1. * sin(t * 2.)), -1., 1., 0., 1.));
        float yy = y + cos(x * 10. * sin((100000. + x) * 1e1)) * 2.;
        x = mix(x, xx, 0.2);
        // y = mix(y, yy, 0.2);
        // y *= map(sin(t * 40.), -1., 1., 1., 2.5);
        vec2 v = vec2(x, y) * vec2(2.0, 1.25);
        // x += cos(t * 1e18) * 1.;
        // y += sin(t * 1e18) * 1.;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(v.x * 0.55, v.y, 0.0, 1.0);
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
glitchyRose.fragText = `
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
glitchyRose.init();


let glitchyRose2 = new ShaderProgram("glitchy-rose-2");

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
        float t = (time + 100.) * 1e-3;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i + sin(i * 1e-4 + i * 1e-4)) * i * 1e-5;
        float y = sin(i + sin(i * 1e-4 + i * 1e-4)) * i * 1e-5;
        x += sin(x * 0.25 * sin(t * 1e1) * sin(i * 3. + x * 0.5e2) * sin(x * 1e2)) * 0.75;
        y += sin(y * 0.25 * sin(t * 1e1) * sin(i * 3. + x * 0.5e2) * sin(x * 1e2)) * 0.75;
        x += tan(cos(i * 69. * tan(i * 1e3)) * 1e8 * sin(t * 1e-5)) * 1.5;
        y += tan(sin(i * 69. * tan(i * 1e3)) * 1e8 * sin(t * 1e-5)) * 1.5;
        //         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        x += cos(t * 10.75) * i * 0.000005;
        y += sin(t * 10.75) * i * 0.000005;
        // x += 1. * cos(t * 5.);
        // y += 1. * sin(t * 5.);
        x *= 1.5;
        y *= 1.5;
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
        gl_Position = vec4(v.x * 0.55, v.y, 0.0, 1.0);
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
//         gl_FragColor.g *= 0.525;
        gl_FragColor.b *= 0.5;
        // gl_FragColor.g += 0.4;
        gl_FragColor.rgb = gl_FragColor.rrr * 1.;
        
    }
    // endGLSL
`;
glitchyRose2.init();


let zoomingBlueMyths = new ShaderProgram("zooming-blue-myths");

zoomingBlueMyths.vertText = `
    // beginGLSL
    // attribute vec4 coordinates;
    attribute float vertexID;
    uniform float time;
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
        float t = time * 1e-2;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i * 0.5e1 * 0.01) * pow(i, 4.) * 8e-16;
        float y = sin(i * 0.5e1 * 0.01) * pow(i, 4.) * 8e-16;
        x += cos(x * 1e-2) + cos(i * 269. * tan(i * 4e-4)) * 3.;
        y += sin(y * 1e-2) + sin(i * 269. * tan(i * 4e-4)) * 3.;
//         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        x += cos(t * 0.25e1) * i * 0.0005;
        y += sin(t * 0.25e1) * i * 0.0005;
                x -= 1.;
        x *= 0.0625 * map(sin(t), -1., 1., 0.0625 * 0.5, 4.);
        y *= 0.0625 * map(sin(t), -1., 1., 0.0625 * 0.5, 4.);
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.58, y, 0.0, 1.0);
//         center = vec2(gl_Position.x, gl_Position.y);
//         center = 512.0 + center * 512.0;
//         myposition = vec2(gl_Position.x, gl_Position.y);
        alph = 0.25 * 0.5;
        gl_PointSize = 7.0;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
zoomingBlueMyths.fragText = `
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
        gl_FragColor = vec4(0.0, 0.6 - dist_squared, 2.0 + alpha * 120., ((3. - dist_squared * 96.0 * (0.25 + alph) - (rando * 1.1)) * 0.045 + alpha)) * 0.5;
        // gl_FragColor = gl_FragColor.brba;
//         gl_FragColor.g *= 0.525;
//         gl_FragColor.b *= 0.0125;
        gl_FragColor.rgb = gl_FragColor.bbb;
        
    }
    // endGLSL
`;
zoomingBlueMyths.init();


let glitchyRose3 = new ShaderProgram("glitchy-rose-3");

glitchyRose3.vertText = `
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
        float t = (time + 100.) * 1e-3;
        float osc = map(sin(t * 16e-1), -1., 1., 0.05, 4.005);
        float i = vertexID * 1e-1;
        float x = cos(i + sin(i * 1e-4 + i * 1e-4)) * i * 2e-5;
        float y = sin(i + sin(i * 1e-4 + i * 1e-4)) * i * 2e-5;
        // x += sin(x * 0.25 * sin(t * 1e1) * sin(i * 3. + x * 0.5e2) * sin(x * 1e2)) * 0.75;
        // y += sin(y * 0.25 * sin(t * 1e1) * sin(i * 3. + x * 0.5e2) * sin(x * 1e2)) * 0.75;
        x += tan(cos(i * 69. * tan(i * 1e3)) * 1e8 * sin(t * 1e-5)) * 1.5;
        y += tan(sin(i * 69. * tan(i * 1e3)) * 1e8 * sin(t * 1e-5)) * 1.5;
        //         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        x += cos(t * 60.75) * i * 0.000009;
        y += sin(t * 60.75) * i * 0.000009;
        // x += 1. * cos(t * 5.);
        // y += 1. * sin(t * 5.);
        x *= 0.15;
        y *= 0.15;
        // float xx = x + pow(cos(x * cos(x. * y) * sin(y * 10.)), 1.);
        // x = mix(x, xx, map(sin(t * 40.), * 100 -1., 1., 0., 1.));
        // x *= map(sin(t * 40.), -1., 1., 1., 2.5);
        float xx = x + cos(y * 1. * sin((100000. + y) * 1e2)) * 2.;
                // x = mix(x, xx, map(sin(t * 1. * sin(t * 2.)), -1., 1., 0., 1.));
        float yy = y + cos(x * 10. * sin((100000. + x) * 1e1)) * 2.;
        // x = mix(x, xx, 0.4);
        // y = mix(y, yy, 0.05);
        // y *= map(sin(t * 40.), -1., 1., 1., 2.5);
        vec2 v = vec2(x, y) * vec2(2.0, 1.25);
        // x += cos(t * 1e18) * 1.;
        // y += sin(t * 1e18) * 1.;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(v.x * 0.35, v.y, 0.0, 1.0);
//         center = vec2(gl_Position.x, gl_Position.y);
//         center = 512.0 + center * 512.0;
//         myposition = vec2(gl_Position.x, gl_Position.y);
        alph = 0.25 * 0.5;
        gl_PointSize = 10.0 * resolutionScalar;
        // gl_PointSize = 25.0 + cos((coordinates.x + coordinates.y) * 4000000.) * 5.;
        // gl_PointSize = coordinates.z / (alph * (sin(myposition.x * myposition.y * 1.) * 3. + 0.5));
    }
    // endGLSL
`;
glitchyRose3.fragText = `
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
        gl_FragColor = vec4(1.0, 0.4 - dist_squared, 0.0 + alpha * 120., ((3. - dist_squared * 24.0 * (0.25 + alph) - (rando * 1.1)) * 0.045 + alpha)) * 1.125;
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
glitchyRose3.init();


let rose2 = new ShaderProgram("rose-2");

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
        float x = cos(i + sin(i * 1e-4 + i * 1e-4)) * i * 1e-5;
        float y = sin(i + sin(i * 1e-4 + i * 1e-4)) * i * 1e-5;
        x += sin(x * 0.25 * sin(t * 2e-1) * sin(i * 5.)) * 0.75;
        y += sin(y * 0.25 * sin(t * 2e-1) * sin(i * 5.)) * 0.75;
        x += tan(cos(i * 69. * tan(i * 1e3)) * 1e8 * sin(t * 1e-5)) * 4.5;
        y += tan(sin(i * 69. * tan(i * 1e3)) * 1e8 * sin(t * 1e-5)) * 4.5;
        //         x *= 0.25 * 44.5;
//         y *= 0.25 * 44.5;
        // x += cos(t * 10.75) * i * 0.000015;
        // y += sin(t * 10.75) * i * 0.000015;
        // x += 1. * cos(t * 5.);
        // y += 1. * sin(t * 5.);
        x *= 1.;
        y *= 1.;
        // x += cos(t * 1e18) * 1.;
        // y += sin(t * 1e18) * 1.;
//         float x = cos(i) * i * 1e-5 * 2.;
//         float y = sin(i) * i * 1e-5 * 2.;
        gl_Position = vec4(x * 0.55, y, 0.0, 1.0);
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