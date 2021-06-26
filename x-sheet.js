let xSheetInit = false;

xSheet = {
    // ------------------------------------------------------------------------- //
    // Introduction
    // ------------------------------------------------------------------------- //   
    anneaux3: {
        d: 523,
        f: sum => {
            sceneCount = drawCount - getSum(xSheet, xSheet.anneaux);
            fogCount = 602 + drawCount * 0.00025;
            currentScene = anneauxFlottants3;
            currentTexture = textureShader;
            dotAmount = 500000;
            brightnessBGScalar = 0.25;
            // let max = 600000;
            // dotAmount = Math.min(map(drawCount + 80 * 0, 0, 523, 0, max), max);
        }
    },
    anneaux2: {
        d: 523,
        f: sum => {
            sceneCount = drawCount - getSum(xSheet, xSheet.anneaux);
            fogCount = 602 + drawCount * 0.00025;
            currentScene = anneauxFlottants2;
            currentTexture = textureShader;
            // currentTexture = "undulating-glitch";
            dotAmount = 500000;
            brightnessBGScalar = 0.25;
        }
    },
    anneaux: {
        d: 262,
        f: sum => {
            sceneCount = drawCount - getSum(xSheet, xSheet.anneaux);
            fogCount = 602 + drawCount * 0.00025;
            currentScene = anneauxFlottants;
            currentTexture = textureShader;
            brightnessBGScalar = 0.25;
                        dotAmount = 500000;
            // dotAmount = Math.min(map(drawCount + 80 * 0, 0, 523, 0, 500000), 500000);
        }
    },
    slinky: {
        d: 262,
        f: sum => {
            sceneCount = drawCount - getSum(xSheet, xSheet.slinky);
            fogCount = 602 + drawCount * 0.00025;
            currentScene = slinky;
            currentTexture = textureShader;
            brightnessBGScalar = 0.25;
            dotAmount = 500000;
        }
    },
    concentric: {
        d: 523,
        f: sum => {
            sceneCount = drawCount - getSum(xSheet, xSheet.concentric);
            fogCount = 602 + sceneCount * 0.00025;
            currentScene = concentric;
            currentTexture = textureShader;
            dotAmount = 500000;
            brightnessBGScalar = 0.75;
                        // currentTexture = testGlitch;
        }
    },
    concentric2: {
        d: Math.floor(523 * 0.5),
        f: sum => {
            sceneCount = drawCount - getSum(xSheet, xSheet.concentric2);
            fogCount = (602 + sceneCount + 1e2) * 0.00025;
            currentScene = concentric2;
            currentTexture = textureShader;
            dotAmount = 500000;
            brightnessBGScalar = 0.75;
                        // currentTexture = testGlitch;
        }
    },
    // concentric3: {
    //     d: 523,
    //     f: sum => {
    //         sceneCount = drawCount - getSum(xSheet, xSheet.concentric3);
    //         currentScene = concentric3;
    //         currentTexture = textureShader;
    //         dotAmount = 500000;
    //         brightnessBGScalar = 0.75;
    //                     // currentTexture = testGlitch;
    //     }
    // },
    rings2: {
        d: 785,
        f: sum => {
            sceneCount = drawCount - getSum(xSheet, xSheet.rings2);
            fogCount = (602 + sceneCount + 1e1) * 0.00025;
            currentScene = rings2;
            currentTexture = textureShader;
            dotAmount = 500000;
            brightnessBGScalar = 1;
            // currentTexture = testGlitch;
            // currentTexture = "undulating-glitch-4";
        }
    },
    mysteriousmap: {
        d: 523,
        f: sum => {
            sceneCount = drawCount - getSum(xSheet, xSheet.mysteriousmap);
                        fogCount = (602 + sceneCount + 0.5e1) * 0.00025;
            currentScene = mysteriousMap;
            // currentTexture = "textu";
            dotAmount = 500000;
            // currentTexture = highGli2;
            currentTexture = textureShader;
            brightnessBGScalar = 1;
            // if (sceneCount < 300) {currentTexture = testGlitch};
            dotAmount = Math.min(map(Math.max(sceneCount, 100), 100, 300, 500000, 1000000), 1000000);
        }
    },
    incantation: {
        d: 523,
        f: sum => {
            sceneCount = drawCount + 60 - getSum(xSheet, xSheet.incantation);
            fogCount = (602 + sceneCount + 0.25e1) * 0.00025;
            currentScene = incantation;
            // currentTexture = "textu";
            dotAmount = 500000;
            brightnessBGScalar = 1;
            // currentTexture = highGli2;
            currentTexture = textureShader;
            // currentTexture = testGlitch2;
        }
    },
    glitchyRose: {
        d: 523,
        f: sum => {
            sceneCount = drawCount + 60 - getSum(xSheet, xSheet.glitchyRose);
                        fogCount = 602 + sceneCount * 0.00025;
            currentScene = glitchyRose;
            // currentTexture = "textu";
            dotAmount = 500000;
            brightnessBGScalar = 1;
            // currentTexture = highGli2;
            currentTexture = textureShader;
            // currentTexture = testGlitch2;
        }
    },
    glitchyRose2: {
        d: 523,
        f: sum => {
            sceneCount = drawCount + 60 - getSum(xSheet, xSheet.glitchyRose2);
                                    fogCount = 102 + sceneCount * 0.00025;
            currentScene = glitchyRose2;
            // currentTexture = "textu";
            dotAmount = 500000;
            brightnessBGScalar = 1;
            // currentTexture = highGli2;
            currentTexture = textureShader;
            // currentTexture = testGlitch2;
        }
    },
        glitchyRose3: {
        d: 523 + 7,
        f: sum => {
            sceneCount = drawCount + 60 - getSum(xSheet, xSheet.glitchyRose3);
                        fogCount = (602 + sceneCount + 0.25e1) * 0.00025;
            currentScene = glitchyRose3;
            // currentTexture = "textu";
            dotAmount = 500000;
            brightnessBGScalar = 1;
            // currentTexture = highGli2;
            currentTexture = textureShader;
        }
    },
    // zoomingBlueMyths: {
    //     d: 523,
    //     f: sum => {
    //         sceneCount = drawCount + 60 - getSum(xSheet, xSheet.zoomingBlueMyths);
    //         currentScene = zoomingBlueMyths;
    //         // currentTexture = "textu";
    //         dotAmount = 500000;
    //         // currentTexture = highGli2;
    //         currentTexture = textureShader;
    //     }
    // },
        rose: {
        d: 523,
        f: sum => {
            sceneCount = drawCount + 60 - getSum(xSheet, xSheet.rose);
                        fogCount = (602 + sceneCount + 0.125e1) * 0.00025;
            currentScene = rose;
            // currentTexture = "textu";
            dotAmount = 400000;
            brightnessBGScalar = 1;
            // currentTexture = highGli2;
            currentTexture = textureShader;
            // currentTexture = testGlitch2;
                        // dotAmount = Math.max(map(sceneCount, 0, 1523, 400000, 400000), 0);
        }
    },
    rose2: {
        d: 623,
        f: sum => {
            sceneCount = drawCount + 136 - getSum(xSheet, xSheet.rose2);
                        fogCount = (602 + sceneCount + 0.1e1) * 0.00025;
            currentScene = rose2;
            // currentTexture = "textu";
            dotAmount = 400000;
            brightnessBGScalar = 1;
            // currentTexture = highGli2;
            currentTexture = textureShader;
            // currentTexture = testGlitch2;
                        // dotAmount = Math.max(map(sceneCount, 0, 1523, 400000, 400000), 0);
        }
    },
    key: function(n) {
        return this[Object.keys(this)[n]];
    }
};
if (xSheetInit) {
    xSheetDuration = sumXSheet(xSheet);
    if (clipping && clipType.type == "scene") {
        clipScene(clipType.ind, clipType.startOffset, clipType.endOffset);
    } else if (clipping && clipType.type == "sequence") {
        clipSequence(clipType.firstInd, clipType.lastInd, clipType.startOffset, clipType.endOffset);
    }
    updateView();
}

Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function cosineFade(sum, dur) {
    var fade = map(drawCount, sum, sum + dur, 1, 0);
    var fadeCons = constrain(fade, 0, 1);
    var fadeSmooth = fadeCons * PI;
    var coFade = map(Math.cos(fadeSmooth), 1, -1, 0, 1);
    return coFade;
}

function runXSheet(sheet) {
    var tL = Object.size(sheet);

    if (drawCount < sheet.key(0).d) {
        sheet.key(0).f();
    } else {
        for (var i = 1; i < tL; i++) {
            var sum = 0;
            for (var ii = 0; ii < i; ii++) {
                sum += sheet.key(ii).d;
            }

            if (drawCount >= sum && drawCount < sum + sheet.key(i).d) {
                sheet.key(i).f(sum);
            }
        }
    }
}

function getSum(sheet, prop) {
    var tL = Object.size(sheet);
    var propLocation = 0;
    var sum = 0;
    for (var i = 0; i <  tL; i++) {
        if (sheet.key(i) === prop) {
            propLocation = i;
        }
    }
    for (var ii = 0; ii < propLocation; ii++) {
        sum += sheet.key(ii).d;
    }
    return sum;
}

function queryXSheet(sheet) {
    var tL = Object.size(sheet);

    for (var i = 0; i < tL; i++) {
        var sum = 0;
        for (var ii = 0; ii < i; ii++) {
            sum += sheet.key(ii).d;
        }
        if (drawCount >= sum && drawCount < sum + sheet.key(i).d) {
            var name = Object.getOwnPropertyNames(sheet);
            return ("Scene #" + i + ", " + name[i]);
        }
    }
}

function sumXSheet(sheet) {
    var tL = Object.size(sheet);
    var sum = 0;
    for (var i = 0; i < tL - 1; i++) {
        sum += sheet.key(i).d;
    }
    return sum;
}

function getCurrentXSheetScene(sheet) {
    var tL = Object.size(sheet);
    for (var i = 0; i < tL; i++) {
        var sum = 0;
        for (var ii = 0; ii < i; ii++) {
            sum += sheet.key(ii).d;
        }
        if (drawCount >= sum && drawCount < sum + sheet.key(i).d) {
            var name = Object.getOwnPropertyNames(sheet);
            return (name[i]);
        }
    }
}

function getCurrentSceneBoundaries(sheet) {
    var scene = xSheet[getCurrentXSheetScene(xSheet)];
    var sumOfPreviousScenes = getSum(xSheet, scene);
    var elapsed = drawCount - sumOfPreviousScenes;
    var remaining = scene.d - elapsed;
    return "| " + elapsed + " ... " + remaining + " | (" + scene.d + ")";
}

function jumpToScene(scene, startOffset = 0) {
    if (typeof scene == "string") {
        drawCount = getSum(xSheet, xSheet[scene]) + startOffset;
    } else if (typeof scene == "number") {
        let list = Object.getOwnPropertyNames(xSheet);
        drawCount = getSum(xSheet, xSheet[list[scene]]) + startOffset;
    }
    repositionSong = true;
    if (!looping) {
        drawCount--;
        redraw();
    }
}

function jump(frame) {
    drawCount = frame;
    repositionSong = true;
    if (!looping) {
        drawCount--;
        redraw();
    }
}

function jumpRelative(delta) {
    drawCount += delta;
    repositionSong = true;
    if (!looping) {
        drawCount--;
        redraw();
    }
}

function clipScene(scene, startOffset = 0, endOffset = 0) {
    let start, end, ind;
    let list = Object.getOwnPropertyNames(xSheet);
    if (typeof scene == "string") {
        start = getSum(xSheet, xSheet[scene]);
        end = start + xSheet[scene].d;
        for (let i = 0; i < list.length; i++) {
            if (list[i] == scene) {
                ind = i;
            }
        }
    } else if (typeof scene == "number") {
        start = getSum(xSheet, xSheet[list[scene]]);
        end = start + xSheet[list[scene]].d;
        ind = scene;
    }
    clip(start + startOffset, end + endOffset, {
        type: "scene",
        ind: ind,
        startOffset: startOffset,
        endOffset: endOffset
    });
    updateView();
}

function clipSequence(start, end, startOffset = 0, endOffset = 0) {
    let list = Object.getOwnPropertyNames(xSheet);
    let frameStart = getSum(xSheet, xSheet[list[start]]);
    let frameEnd = getSum(xSheet, xSheet[list[end]]) + xSheet[list[end]].d;
    clip(frameStart + startOffset, frameEnd + endOffset, {
        type: "sequence",
        firstInd: start,
        lastInd: end,
        startOffset: startOffset,
        endOffset: endOffset
    });
    updateView();
}

function displayTimeline() {
    var list = Object.getOwnPropertyNames(xSheet);
    var totalDuration;
    var lastScene = xSheet[list[list.length - 2]];
    totalDuration = getSum(xSheet, lastScene) + lastScene.d;
    var norm = 1 / totalDuration * 1372;
    var durSoFar = 0;
    timelineCtx.fillStyle = 'rgba(255, 255, 255, 1.0)';
    timelineCtx.fillRect(0, 0, 1372, 100);
    for (let i = 0; i <  list.length - 1; i++) {
        var dur = xSheet[list[i]].d;
        if (i % 2 == 0) {
            timelineCtx.fillStyle = 'rgb(255, 255, 255)';
        } else {
            timelineCtx.fillStyle = 'rgb(235, 235, 235)';
        }
        timelineCtx.fillRect(durSoFar * norm, 0, dur * norm, 100);
        durSoFar += dur;
    }
    if (clipping) {
        timelineCtx.strokeStyle = 'rgb(0, 0, 0)';
        timelineCtx.strokeRect(clipMin * norm, 40, (clipMax - clipMin) * norm, 45);
    }
    sheetSlider.elt.min = 0;
    sheetSlider.elt.max = xSheetDuration;
}

function displaySequence(start, end) {
    var listOfScenes = Object.getOwnPropertyNames(xSheet);
    var list = [];
    var totalDuration = 0;
    for (let i = start; i <= end; i++) {
        list.push(i);
        totalDuration += xSheet[listOfScenes[i]].d;
    }
    viewDur = totalDuration;
    var norm = 1 / totalDuration * 1372;
    var durSoFar = 0;
    timelineCtx.fillStyle = 'rgb(255, 255, 255)';
    timelineCtx.fillRect(0, 0, 1372, 100);
    for (let i = 0; i < list.length; i++) {
        var dur = xSheet[listOfScenes[list[i]]].d;
        if (i % 2 == 0) {
            timelineCtx.fillStyle = 'rgb(255, 255, 255)';
        } else {
            timelineCtx.fillStyle = 'rgb(235, 235, 235)';
        }
        timelineCtx.fillRect(durSoFar * norm, 0, dur * norm, 100);
        durSoFar += dur;
    }
    var minVal = getSum(xSheet, xSheet[listOfScenes[start]]);
    viewMin = minVal;
    var maxVal = getSum(xSheet, xSheet[listOfScenes[start]]) + totalDuration;
    if (clipping) {
        timelineCtx.strokeStyle = 'rgb(0, 0, 0)';
        timelineCtx.strokeRect((clipMin - minVal) * norm, 40, (clipMax - clipMin) * norm, 45);
    }
    sheetSlider.elt.min = minVal;
    sheetSlider.elt.max = maxVal;
}

function showSequence(start, end) {
    viewType = {
        type: "sequence",
        start: start,
        end: end
    };
    displaySequence(start, end);
}

function showTimeline() {
    viewType = {
        type: "timeline"
    };
    displayTimeline();
}

function updateView() {
    if (viewType.type == "sequence") {
        displaySequence(viewType.start, viewType.end);
    } else {
        displayTimeline();
    }
}