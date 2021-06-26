// // pulsar
// let sceneRun = false;
drawCount = 0;
drawPulsar = function(selectedProgram) {
    // if (!sceneRun) {
    //     drawCount = 1;
    //     sceneRun = true;
    // }
    vertices = [];
    let T = (((drawCount - 100) * 0.00125));
    let xOffset = (noise(T * 1e2 * 0.0025) - 0.5) * 0.9;
    let yOffset = (noise((T * 1e2 + 100) * 0.0025) - 0.5) * 0.9;
    let t = T * 0.0000025 * 0.5 + 0;
    let fx = 1;
    let fy = 1;
    let x = 0;
    let y = 0;
    let num = 10000;
    function ro(a, l, x, y, h) {
        return {
            x: x + Math.cos(h + a) * l,
            y: y + Math.sin(h + a) * l,
            h: h + a
        };
    }
    let amountRays = 120;
    let sj = (10 - t) * 1000000;
    let rayInc = Math.PI * 2 / amountRays;
    let numV = 0;
    let metaV = [];
    let indMetaV = 0;
    let t1 = drawCount * 1e-3 * 0.125 * 0.5;
    let t2 = t1 * 1e1;
    let xO = openSimplex.noise2D(t2, t2 + 1000) * 1;
    let yO = openSimplex.noise2D(t2 - 1000, t2 + 500) * 1;
    t2 = (t2 + 5000) * 100;
    let xO2 = openSimplex.noise2D(t2, t2 + 1000) * 0.05 + xO;
    let yO2 = openSimplex.noise2D(t2 - 1000, t2 + 500) * 0.05 + yO;
    let t3 = t * 1e8 * 0.5;
    let al = map(openSimplex.noise2D(t3, t3 + 1000), -1, 1, 0.3, 1.5);
    for (let j = sj; j < (Math.PI * 2 + sj) - rayInc; j += rayInc) {
        let p = { x: 0, y: 0, h: j };
        let jj = j - sj;
        metaV[indMetaV] = [];
        var sc = 0.01 * (1 / cos(t * 4e5));
        sc = 0.25;
        sc = map(drawCount, 0, 1500, 0.25, 0.0125);
        let sc2 = map(drawCount, 0, 1500, 0.25, 0.25);
        let scOsc = map(drawCount, 0, 1100, 0.5, 2.5)
        let ssc = map(drawCount, 0, 1200 - 300, 1e7, 1e6);
        for (let i = 0; i < (num / amountRays); i += 1) {
            let a = T * -2.5 + Math.sin(p.h + i * 10 + jj * 10);
            let l = 0.95;
            let ph = Math.cos(p.x) * 0.5 * Math.sin(p.y);
            p = ro(a, l, p.x, p.y, p.h + ph * 2.75);
            //             p.x += xOffset * 2.95;
            //             p.y += yOffset * 2.95;
            p.x += Math.cos(t * 1e7) * 0.95;
            p.y += Math.sin(t * 1e7) * 0.95;
            //             let xo = openSimplex.noise2D(i, t * 1e4) * 4e-4;
            //             let yo = openSimplex.noise2D(i, t * 1e4 + 1000) * 4e-4;
            let xo = 0;
            let yo = 0;
            let zo = (openSimplex.noise2D(i, (t * 1e4 + i) * 1e2 + 100)) * 5;
            metaV[indMetaV].push((p.y + xO2 + xo) * 0.35 * 1.5 * sc, (p.x + yO2 + yo) * 0.9 * sc * -1, 15 + zo * vb * 20, al);
            numV += 1;
        }
        indMetaV++;
    }
    let flatV = [];
    for (let j = 0; j < metaV[0].length; j += 4) {
        for (let i = 0; i < metaV.length; i++) {
            flatV.push(metaV[i][j], metaV[i][j + 1], metaV[i][j + 2], metaV[i][j + 3]);
        }
    }
    vertices = flatV;
    // Create an empty buffer object to store the vertex buffer
    // var vertex_buffer = gl.createBuffer();
    //Bind appropriate array buffer to it
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // Pass the vertex data to the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, dotsVBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Get the attribute location
    var coord = gl.getAttribLocation(selectedProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 4, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, num);
}