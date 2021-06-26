 // bellement ondulant
let undulatingGlitch = new ShaderProgram("undulating-glitch");

undulatingGlitch.vertText = `
// beginGLSL
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
// endGLSL
`;

undulatingGlitch.fragText = `
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
    float t = time;
   // gl_FragColor = texture2D(u_texture, v_texcoord);
    // gl_FragColor = texture2D(u_texture, v_texcoord);
    gl_FragColor = texture2D(u_texture, v_texcoord + (pow(cos(uv.y * uv.x * 1e18), 0.0125) + sin(uv.x * 1e2 + tan(uv.y * t * 1e10))) * 2e-3 * floor(sin(uv.y * 1e2 * sin(uv.y * 1000. * (sin(uv.y * 1e2))))) * 1. + sin(uv.y * 1e-1 + uv.y * 1e6 * sin(t * 1e-10) + tan(t * 1e-10)) * 0.0625 * 4e-1);
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
   gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.025)) * 1.5;
    gl_FragColor.rgb = gl_FragColor.rrr;
}
// endGLSL
`;
textureShader.init();


 // bellement ondulant

let undulatingGlitch2 = new ShaderProgram("undulating-glitch-2");

undulatingGlitch2.vertText = undulatingGlitch.vertText;

undulatingGlitch2.fragText = `
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
    float t = time;
   // gl_FragColor = texture2D(u_texture, v_texcoord);
    gl_FragColor = texture2D(u_texture, v_texcoord + (pow(cos(uv.y * uv.x * 1e18), 0.0125) + sin(uv.x * 1e2 + tan(uv.y * t * 1e10))) * 2e-3 * floor(sin(uv.y * 1e2 * sin(uv.y * 1000. * (sin(uv.y * 1e2))))) * 1. + sin(uv.y * 1e-1 + uv.y * 1e6 * sin(t * 1e-10) + tan(t * 1e-10)) * 0.0625 * 4e-1);
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
   gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.025)) * 1.5;
        gl_FragColor.rgb = gl_FragColor.rrr * 1.;
}
// endGLSL
`;
undulatingGlitch2.init();

let undulatingGlitch3 = new ShaderProgram("undulating-glitch-3");

undulatingGlitch3.vertText = undulatingGlitch.vertText;

undulatingGlitch3.fragText = `
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
    float t = time * 1e2;
   // gl_FragColor = texture2D(u_texture, v_texcoord);
    gl_FragColor = texture2D(u_texture, v_texcoord + (pow(cos(uv.y * uv.x * 1e18), 0.0125) + sin(uv.x * 1e-2 + tan(uv.y * t * 1e10))) * 2e-1 * floor(sin(uv.y * 1e2 * sin(t * 1. * (sin(t * 1e-2))))) * 1. + sin(uv.y * 1e4 + uv.y * 1e6 * sin(t * 1e-10) + tan(t * 1e-10)) * 0.0625 * 1e-3);
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
   gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.025)) * 1.5;
            gl_FragColor.rgb = gl_FragColor.rrr * 1.;
}
// endGLSL
`;
undulatingGlitch3.init();


let undulatingGlitch4 = new ShaderProgram("undulating-glitch-4");

undulatingGlitch4.vertText = undulatingGlitch.vertText;

undulatingGlitch4.fragText = `
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
    float t = time * 1.;
   // gl_FragColor = texture2D(u_texture, v_texcoord);
    gl_FragColor = texture2D(u_texture, v_texcoord + (pow(cos(uv.y * uv.x * 1e18), 0.0125) + sin(uv.x * 1e-2 + tan(uv.y * t * 1e10))) * 2e-2 * floor(sin(uv.y * 1e2 * sin(t * 1. * (floor(sin(t * 1e4 * sin(t * 1e3))))))) * 1. + sin(uv.y * 1e4 + uv.y * 1e6 * sin(t * 1e-10) + tan(t * 1e-10)) * 0.0625 * 1e-5);
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
   gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.025)) * 1.5;
                gl_FragColor.rgb = gl_FragColor.rrr * 1.;
}
// endGLSL
`;
undulatingGlitch4.init();




let undulatingGlitch5 = new ShaderProgram("undulating-glitch-5");

undulatingGlitch5.vertText = undulatingGlitch.vertText;

undulatingGlitch5.fragText = `
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
    float t = time + 6e2 * 1.;
   // gl_FragColor = texture2D(u_texture, v_texcoord);
    gl_FragColor = texture2D(u_texture, v_texcoord + (pow(cos(uv.y * uv.x * 1e18), 0.0125) + sin(uv.x * 1e-2 + tan(uv.y * t * 1.))) * 2. * floor(sin(uv.y * 1e-3 * ((floor(sin(t * 1e4 * sin(t * 1e4))))))) + sin(uv.y * 1e12 + uv.y * 1e-2 * sin(20. * 1e-10) + tan(t * 1e-10)) * 0.0625 * 1e-5);
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
   gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.025)) * 1.5;
                gl_FragColor.rgb = gl_FragColor.rrr * 1.;
}
// endGLSL
`;
undulatingGlitch5.init();

let highGli = new ShaderProgram("high-gli");

highGli.vertText = undulatingGlitch.vertText;


highGli.fragText = `
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
    float t = (time * 1e-2) + 6e2 * 1.;
   // gl_FragColor = texture2D(u_texture, v_texcoord);
    gl_FragColor = texture2D(u_texture, v_texcoord + (pow(cos(uv.y * uv.x * 1e18), 0.0125) + sin(uv.x * 1e-2 + tan(uv.y * t * 1.))) * 2. * floor(sin(uv.y * 1e-3 * ((floor(sin(t * 1e4 * sin(t * 1e4))))))) + sin(uv.y * 1e12 + uv.y * 1e-2 * sin(20. * 1e-10) + tan(t * 1e-10)) * 0.0625 * 1e-5);
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
   gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.025)) * 1.5;
                gl_FragColor.rgb = gl_FragColor.rrr * 1.;
}
// endGLSL
`;
highGli.init();

let highGli2 = new ShaderProgram("high-gli-2");

highGli2.vertText = undulatingGlitch.vertText;


highGli2.fragText = `
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
    float t = (time * 1e-12) + 6e2 * 1.;
    if ((sin(uv.y * 1e2) + cos(uv.y * 1e10 * t) + sin(uv.y * sin(t * 1e4) * 1e4)) < sin(uv.y + t * 1e12)) {
        gl_FragColor = texture2D(u_texture, v_texcoord);   
    } else {
        gl_FragColor = texture2D(u_texture, v_texcoord + (pow(cos(uv.y * uv.x * 1e18), 0.0125) + sin(uv.x * 1e-2 + tan(uv.y * t * 1.))) * 2. * floor(sin(uv.y * 1e-3 * ((floor(sin(t * 1e4 * sin(t * 1e4))))))) + sin(uv.y * 1e12 + uv.y * 1e-2 * sin(20. * 1e-10) + tan(t * 1e-10)) * 0.0625 * 1e-5) * 1.;
    }
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
   gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.025)) * 1.5;
                gl_FragColor.rgb = gl_FragColor.rrr * 1.;
}
// endGLSL
`;
highGli2.init();

let testGlitch = new ShaderProgram("test-glitch");

testGlitch.vertText = undulatingGlitch.vertText;


testGlitch.fragText = `
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
    if (sin(uv.y * 50.) + sin(uv.y * 10.) + sin(uv.y * 10. * tt) < -0.0) {
        // gl_FragColor = vec4(1., 1., 1., 1.);   
        vec2 vv = v_texcoord;
        vv.y = vv.x + sin(vv.y * t * 1e3);
        // gl_FragColor = texture2D(u_texture, vv + (pow(cos(uv.y * uv.x * 1e18), 0.0125) + sin(uv.x * 1e-2 + tan(uv.y * t * 1.))) * 2. * floor(sin(uv.y * 1e-3 * ((floor(sin(t * 1e-8 * sin(t * 1e-2))))))) + sin(uv.y * 1e12 + uv.y * 1e-2 * sin(20. * 1e-10) + tan(t * 1e-10)) * 0.0625 * 1e-5) * 1.;
                gl_FragColor = texture2D(u_texture, vv) * 2.;
        gl_FragColor = mix(gl_FragColor, texture2D(u_texture, v_texcoord), 0.75);
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
testGlitch.init();

let testGlitch2 = new ShaderProgram("test-glitch-2");

testGlitch2.vertText = undulatingGlitch.vertText;

testGlitch2.fragText = `
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
    if (sin(uv.y * 50.) + sin(uv.y * 10.) + sin(uv.y * 10. * tt) < -0.0) {
        // gl_FragColor = vec4(1., 1., 1., 1.);   
        vec2 vv = v_texcoord;
        vv.y = vv.x + sin(vv.y * t * 1e3);
        // gl_FragColor = texture2D(u_texture, vv + (pow(cos(uv.y * uv.x * 1e18), 0.0125) + sin(uv.x * 1e-2 + tan(uv.y * t * 1.))) * 2. * floor(sin(uv.y * 1e-3 * ((floor(sin(t * 1e-8 * sin(t * 1e-2))))))) + sin(uv.y * 1e12 + uv.y * 1e-2 * sin(20. * 1e-10) + tan(t * 1e-10)) * 0.0625 * 1e-5) * 1.;
        float dx = 40. * (1. / 2560. * 0.5);
        float dy = 25. * (1. / 1440. * 0.5);
        vec2 coord = vec2(dx * floor(uv.x / dx) * 0.65, dy * floor(uv.y / dy));
        // tc = texture2D(sceneTex, coord).rgb;
                coord.y = coord.x + sin(coord.y * t * 1e-1);
        gl_FragColor = texture2D(u_texture, coord) - (rando * 0.125) * 1.;
        gl_FragColor = mix(gl_FragColor, texture2D(u_texture, v_texcoord), 0.5);
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
testGlitch2.init();

let wateryGlitch = new ShaderProgram("watery-glitch");

wateryGlitch.vertText = undulatingGlitch.vertText;

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
    // if (sin(uv.y * 50. * 0.5) + sin(uv.y * 10. * 0.5) + sin(uv.y * 10. * 0.5 * tt) < -0.0) {
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
    // } else {
        // gl_FragColor = texture2D(u_texture, v_texcoord);
    // }
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   // gl_FragColor.r = gl_FragColor.r * 0.5;
   gl_FragColor.rgb = (gl_FragColor.rgb - (rando * 0.025)) * 1.5;
                gl_FragColor.rgb = gl_FragColor.rrr * 1.;
}
// endGLSL
`;
wateryGlitch.init();