let looping = false;
var envirLooping = false;
let keysActive = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "/Users/guillaumepelletier/Desktop/hl/hl-frame";
let maxFrames = 15000;
let gl;
let time;
let positive = true;
let intensity;
let drawCount = 0;
drawCount = 0;
let sceneCount = 0;
let fogCount = 0;
let drawIncrement = 1;
let vertexBuffer;
let vertices = [];
const seed = 10;
const openSimplex = openSimplexNoise(seed);
let mS = 1;
let amountOfScratches = 3;
let fluctuation = 1;
let namedPrograms = {};

// a shader variable
let texcoordShader;
let dotsVBuf, bgVBuf;

let resolutionScalar = 0.5;
let brightnessBGScalar = 1;
let resolutionBG, brightnessBG;
let resetAllDisplayMethods = false;


let texture, texture2, framebuf, framebuf2;
let vb;
let vbuffer;
vertices = [];
for (let i = 0; i < 1000000; i++) {
    vertices.push(i);
}
vertices = new Float32Array(vertices);



let montage = true;
let songPlay = true;
let repositionSong = false;
var stop = false;
let fps, fpsInterval, startTime, now, then, elapsed;
let animationStart;
let framesRendered = 0;
let framesOfASecond = 0;
let secondStart, secondFrames;
fps = 24;
var drawingGeometry = true;
let timeline, timelineCtx, timelineIndex, timelineIndexCtx;

let xSheetDuration;
// let clipping = false;
let clipType = {
    type: "none"
};
let viewType = {
    type: "timeline"
};
let viewDur = 0;
let viewMin = 0;

let currentScene, currentTexture;
currentScene = "new-flickering-dots-vert";
currentTexture = "textu";

let dotAmount = 500000;

function startAnimating() {
    fpsInterval = 1000 / fps;
    then = Date.now();
    animationStart = Date.now();
    secondStart = Date.now();
    startTime = then;
    envirLooping = true;
    animate();
}

function queryFrameRate() {
    let timeElapsed = Date.now() - animationStart;
    let seconds = timeElapsed / 1000;
    logJavaScriptConsole(framesRendered / seconds);
    // logJavaScriptConsole(timeElapsed);
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved

function animate() {

    // request another frame
    if (envirLooping) {

        requestAnimationFrame(animate);


        // calc elapsed time since last loop

        now = Date.now();
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame

        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);
            // Put your drawing code here
            draw();
            framesRendered++;
            framesOfASecond++;
            if (framesOfASecond == fps) {
                secondFrames = fps / ((Date.now() - secondStart) * 0.001);
                // logJavaScriptConsole(secondFrames);
                framesOfASecond = 0;
                secondStart = Date.now();
            }
        }
    }
}


function setup() {
    socket = io.connect('http://localhost:8080');
    // socket.on('receiveOSC', receiveOSC);
    pixelDensity(1);
    noCanvas();
    // cnvs = createCanvas(windowWidth, windowWidth * 9 / 16, WEBGL);
    // cnvs = createCanvas(1280, 1280 * 9 / 16, WEBGL);
    cnvs = document.createElement('canvas');

    cnvs.id = "defaultCanvas0";
    cnvs.width = 2560 * resolutionScalar;
    cnvs.height = 1440 * resolutionScalar;
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(cnvs);
    canvasDOM = document.getElementById('defaultCanvas0');

    // noCanvas();
    // cnvs = document.getElementById('my_Canvas');
    // gl = canvas.getContext('webgl');
    gl = cnvs.getContext('webgl');
    // canvasDOM = document.getElementById('my_Canvas');
    // canvasDOM = document.getElementById('defaultCanvas0');
    // gl = canvasDOM.getContext('webgl');
    // gl = cnvs.drawingContext;

    // gl = canvasDOM.getContext('webgl', { premultipliedAlpha: false });



    // gl.colorMask(false, false, false, true);
    // gl.colorMask(false, false, false, true);

    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(false);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.colorMask(true, true, true, true);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    // Set the view port
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    frameRate(20);
    // background(0);
    // fill(255, 50);
    noStroke();
    vertex_buffer = gl.createBuffer();
    dotsVBuf = gl.createBuffer();
    bgVBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    vbuffer = gl.createBuffer();
    if (!looping) {
        noLoop();
    }
    shadersReadyToInitiate = true;
    initializeShaders();
    createWhiteDots();
    time = gl.getUniformLocation(getProgram("pulsar-fog"), "time");
    resolutionBG = gl.getUniformLocation(getProgram("pulsar-fog"), "resolution");
    brightnessBG = gl.getUniformLocation(getProgram("pulsar-fog"), "brightness");
    texture = createTexture();
    framebuf = createFrameBuffer(texture);
    texture2 = createTexture();
    framebuf2 = createFrameBuffer(texture2);



    createInfoDiv();
    setupInfoDiv();
    // Setting the two canvases for the visual timeline.
    timeline = document.getElementById('timeline');
    timelineCtx = timeline.getContext('2d');
    timelineIndex = document.getElementById('timeline-index');
    timelineIndexCtx = timelineIndex.getContext('2d');

    var list = Object.getOwnPropertyNames(xSheet);
    var totalDuration;
    var lastScene = xSheet[list[list.length - 2]];
    xSheetDuration = getSum(xSheet, lastScene) + lastScene.d;

    timelineIndex.addEventListener('click', function(event) {
        var x = event.pageX - timelineIndex.offsetLeft;
        // logJavaScriptConsole(x);
        drawCount = Math.floor(x / 685 * xSheetDuration);
        repositionSong = true;
        if (!looping) {
            redraw();
        }
    }, false);

    window.setTimeout(function() {
        if (!keysActive) {
            cmArea.style.width = "1200px";
            jsCmArea.style.width = "1200px";
            jsConsoleArea.setAttribute("style", "display:block;");
            scdArea.style.display = "none";
            scdConsoleArea.setAttribute("style", "display:none;");
            jsCmArea.style.height = "685px";
            jsArea.style.display = "block";
            displayMode = "js";
            autoRedraw = true;
            displayTimeline();
            xSheetInit = true;
        }
    }, 1000);
    if (batchExport) {
        drawCount = batchMin;
        exporting = true;
        redraw();
        songPlay = false;
    }
    socket.on('getNextImage', function(data) {
        if (drawCount <= batchMax) {
            // redraw();
            window.setTimeout(function() {
                redraw();
            }, 3000);
        }
    });
}

draw = function() {
    runXSheet(xSheet);
    if (repositionSong && songPlay && (looping || envirLooping)) {
        if (drawCount <= player.duration * 24) {
            player.currentTime = drawCount /  24;
            if (player.paused) {
                player.play();
            }
            syncToAudio();
        } else {
            if (!player.paused) {
                player.pause();
            }
        }
        repositionSong = false;
    }
    sheetSlider.value(drawCount);
    var sceneBoundaries = getCurrentSceneBoundaries(xSheet);
    sliderInfo1.html(queryXSheet(xSheet) + ": " + drawCount + " " + sceneBoundaries);
    timelineIndexCtx.clearRect(0, 0, 1372, 100);
    if (viewType.type == "timeline") {
        timelineIndexCtx.fillRect(drawCount / xSheetDuration * 1372, 0, 1, 100);
    } else if (viewType.type == "sequence") {
        let norm = 1 / viewDur * 1372;
        timelineIndexCtx.fillRect((drawCount - viewMin) * norm, 0, 1, 100);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    // We bind the framebuffer...
    bindFrameBuffer(texture, framebuf);
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    
    // draw the scene, presumably on a framebuffer
    let currentProgram = getProgram("pulsar-fog");
    gl.useProgram(currentProgram);
    drawBG(currentProgram);
    currentProgram = currentScene.program;
    gl.useProgram(currentProgram);
    drawScene(currentProgram);
    
    // unbind the buffer and draw the resulting texture....
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    // gl.clearColor(0.5, 0.5, 0.5, 1); // clear to white
    
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    var textureShader = currentTexture.program;
    gl.useProgram(textureShader);
    
    aspect = cnvs.width / cnvs.height;
    let vertices = new Float32Array([-1, 1, 1, 1, 1, -1, // Triangle 1
        -1, 1, 1, -1, -1, -1 // Triangle 2
    ]);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    itemSize = 2;
    numItems = vertices.length / itemSize;
    textureShader.aVertexPosition = gl.getAttribLocation(textureShader, "a_position");
    gl.enableVertexAttribArray(textureShader.aVertexPosition);
    gl.vertexAttribPointer(textureShader.aVertexPosition, itemSize, gl.FLOAT, false, 0, 0);
    
    var textureLocation = gl.getUniformLocation(textureShader, "u_texture");
    gl.uniform1i(textureLocation, 0);
    var timeLocation = gl.getUniformLocation(textureShader, "time");
    gl.uniform1f(timeLocation, sceneCount);
    
    var texcoordLocation = gl.getAttribLocation(textureShader, "a_texcoord");
    gl.enableVertexAttribArray(texcoordLocation);
    
    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);
    
    gl.drawArrays(gl.TRIANGLES, 0, numItems);
    // da = canvasDOM.toDataURL();
    // console.log(da.length);
   if (exporting) {
        frameExport();
    }
    if (clipping) {
        if (drawCount > clipMax) {
            drawCount = clipMin;
            repositionSong = true;
        } else if (drawCount < clipMin) {
            drawCount = clipMin;
            repositionSong = true;
        }
    }
    
    
    drawCount += drawIncrement;
    // if (exporting && frameCount < maxFrames && drawCount > 1113) {
    // if (exporting && frameCount < maxFrames && drawCount > 1449) {
    //     frameExport();
    // }
}

function keyPressed() {
    if (keysActive) {
        if (keyCode === 32) {
            togglePlay();
        }
        // if (keyCode === 32) {
        //     if (looping) {
        //         noLoop();
        //         looping = false;
        //     } else {
        //         loop();
        //         looping = true;
        //     }
        // }
        if (key == 'r' || key == 'R') {
            window.location.reload();
        }
        if (key == 'm' || key == 'M') {
            redraw();
        }
        if (key == 'q' || key == 'Q') {
            drawCount = 0;
            repositionSong = true;
            // redraw();
        }
    }
}


document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
        // isEscape = (evt.key === "AltRight" || evt.key === "Alt");
    } else {
        // isEscape = (evt.keyCode === 27);
        // isEscape = (evt.keyCode === 18);
    }
    if (isEscape) {
        togglePlay();
    }
};

function togglePlay() {
    if (envirLooping) {
        // noLoop();
        if (montage && songPlay) {
            // logJavaScriptConsole("Does this not ?");
            player.pause();
        }
        envirLooping = false;
        framesRendered = 0;
    } else {
        // loop();
        envirLooping = true;
        if (montage && songPlay && (drawCount <= player.duration * 24)) {
            // logJavaScriptConsole("This does ?");
            player.play();
            // song.jump(drawCount / 24);
            // song.rate(24 / 24);
        }
        startAnimating();
    }
}

let clipMin = 0,
    clipMax = 100,
    clipping = false;

function clip(min, max, type) {
    clipMin = min;
    clipMax = max;
    clipping = true;
    clipType = type;
}

function unClip() {
    clipping = false;
    updateView();
    clipType = {
        type: "none"
    };
}

function logLatency() {
    let seconds = (drawCount /  24) - player.currentTime;
    let frames = Math.floor(((drawCount /  24) - player.currentTime) * 24);
    let frameWord = (frames > 1) ? "frames" : "frame";
    logJavaScriptConsole(seconds + " seconds, or " + frames + " " + frameWord + ".");
}

function syncToAudio() {
    drawCount -= Math.floor(((drawCount /  24) - player.currentTime) * 24);
}



drawScene = function(selectedProgram) {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, dotsVBuf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // Get the attribute location
    var coord = gl.getAttribLocation(selectedProgram, "vertexID");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 1, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    var time = gl.getUniformLocation(selectedProgram, "time");
    // Point an attribute to the currently bound VBO
    // gl.vertexAttribPointer(coord, 1, gl.FLOAT, false, 0, 0);
      gl.uniform1f(time, sceneCount);
    var scalar = gl.getUniformLocation(selectedProgram, "resolutionScalar");
    // Point an attribute to the currently bound VBO
    // gl.vertexAttribPointer(coord, 1, gl.FLOAT, false, 0, 0);
    gl.uniform1f(scalar, resolutionScalar);
    gl.drawArrays(gl.POINTS, 0, dotAmount);
}

function setResolutionScalar(sc) {
    resolutionScalar = sc;
    cnvs.width = 2560 * resolutionScalar;
    cnvs.height = 1440 * resolutionScalar;
    texture = createTexture();
    framebuf = createFrameBuffer(texture);
    texture2 = createTexture();
    framebuf2 = createFrameBuffer(texture2);
    drawCount--;
    redraw();
}

let player;
document.onreadystatechange = function() {
    if (document.readyState === 'interactive') {
        player = document.querySelector('#hlmp3 .audioelement');
    }
};