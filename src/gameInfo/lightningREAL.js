
// const SimplexNoise = require('./simplexNoise.js')
/**
 * requestAnimationFrame
 */
// const SimplexNoise = require('../gameInfo/simplexNoise.js');
console.log("Simplexin");
console.log(window);
 window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) { window.setTimeout(callback, 1000 / 60); };
})();


/**
 * Lightning
 */
var Lightning = (function(window) {

    /**
     * LightningAbstract
     */
    var LightningAbstract = {
        points:      null,
        children:    null,
        _simplexNoise: window.SimplexNoise.prototype,

        render: function(ctx, controls) {
            this._update(controls);
            this._draw(ctx);
        },

        _update: function(controls) {
            throw new Error('Not override');
        },

        _draw: function(ctx) {
            var points  = this.points,
                isRoot  = false, opts,
                p, p1, dx, dy, dist,
                lineWidth,
                i, len;

            isRoot = !this.parent;
            opts   = isRoot ? this : this.parent;

            if (isRoot) { // is root
                var radius, gradient,
                    children = this.children, c;

                ctx.save();
                for (i = 0, len = points.length; i < len; i += len - 1) {
                    p = points[i];
                    radius = Math.random() * (8 - 3) + 3;
                    gradient = ctx.createRadialGradient(p.x, p.y, radius / 3, p.x, p.y, radius);
                    gradient.addColorStop(0, this._colorToString(1));
                    gradient.addColorStop(1, this._colorToString(0));
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
                    ctx.fill();
                }
                ctx.restore();

                for (i = 0, len = children.length; i < len; i += len - 1) {
                    children[i].render(ctx);
                }
            }

            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.lineCap = 'round';
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.shadowBlur = opts.blur;
            ctx.shadowColor = this._colorToString(1);
            ctx.beginPath();
            for (i = 0, len = points.length; i < len; i++) {
                p = points[i];
                if (len > 1) {
                    p1 = points[i === len - 1 ? i - 1 : i + 1];
                    dx = p.x - p1.x;
                    dy = p.y - p1.y;
                    dist = Math.sqrt(dx * dx + dy * dy);
                } else {
                    dist = 0;
                }
                if (dist > 30) dist = 30;
                ctx.moveTo(p.x + dist, p.y);
                ctx.arc(p.x, p.y, dist, 0, Math.PI * 2, false);
            }
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = this._colorToString(Math.random() * (opts.maxAlpha - opts.minAlpha) + opts.minAlpha);
            lineWidth = Math.random() * (opts.maxLineWidth - opts.minLineWidth) + opts.minLineWidth;
            ctx.lineWidth = isRoot ? lineWidth : lineWidth * 0.5;
            for (i = 0; i < len; i++) {
                p = points[i];
                ctx[i === 0 ? 'moveTo' : 'lineTo'](p.x, p.y);
            }
            ctx.stroke();
            ctx.restore();
        },

        _noise2d: function(x, y) {
            var octaves = 3,
                fallout = 0.5,
                amp = 1, f = 1, sum = 0,
                i;

            for (i = 0; i < octaves; ++i) {
                amp *= fallout;
                sum += amp * (this._simplexNoise.noise2D(x * f, y * f) + 1) * 0.5;
                f *= 2;
            }

            return sum;
        },

        _filterApply: function(points, lineLength, segmentsNum, base, amp, offset) {
            var pointsOld = this.points,
                // spline
                spline = [],
                catmullRom = this._catmullRom,
                p0, p1, p2, p3, t, per,
                // noise
                p, next, angle, sin, cos, nx, av, ax, ay, bv, bx, by, m, px, py,
                // shortest
                shortest, dx, dy, distSq, minDist,
                i, len, j, k;


            // Spline

            // スプライン補完用に配列の前後にラインの始点, 終点の参照をそれぞれ複製する
            points.unshift(points[0]);
            points.push(points[points.length - 1]);

            per = 1 / segmentsNum;

            // スプライン曲線のポイントを取得
            for (i = 0, len = points.length - 3; i < len; i++) {
                p0 = points[i];
                p1 = points[i + 1];
                p2 = points[i + 2];
                p3 = points[i + 3];

                for (j = 0; j < segmentsNum; j++) {
                    t = (j + 1) * per;

                    spline.push({
                        x: catmullRom(p0.x, p1.x, p2.x, p3.x, t),
                        y: catmullRom(p0.y, p1.y, p2.y, p3.y, t)
                    });
                }
            }

            // 補完用に追加した参照を削除
            points.pop();
            // 削除のついでに描画の始点として追加
            spline.unshift(points.shift());


            // Noise

            points = [];
            len    = spline.length;
            per    = 1 / (len - 1);
            base   = 1 / base;

            for (i = 0, len = spline.length; i < len; i++) {
                p = spline[i];
                next = i === len - 1 ? p : spline[i + 1];

                angle = Math.atan2(next.y - p.y, next.x - p.x);
                sin = Math.sin(angle);
                cos = Math.cos(angle);

                nx = i * base;

                av = lineLength * this._noise2d(nx - offset, offset) * 0.5 * amp;
                ax = av * sin;
                ay = av * cos;

                bv = lineLength * this._noise2d(nx + offset, offset) * 0.5 * amp;
                bx = bv * sin;
                by = bv * cos;

                m = Math.sin(Math.PI * (i * per));

                px = p.x + (ax - bx) * m;
                py = p.y - (ay - by) * m;

                if (pointsOld.length) {
                    p = pointsOld.shift();
                    p.x = px;
                    p.y = py;
                } else {
                    p = { x: px, y: py };
                }

                points.push(p);
            }


            // Shortest

            shortest = [points[0]];

            for (i = 0, len = points.length; i < len; i++) {
                p = points[i];

                minDist = Infinity;
                k = -1;
                for (j = i; j < len; j++) {
                    p2 = points[j];

                    dx = p.x - p2.x;
                    dy = p.y - p2.y;
                    distSq = dx * dx + dy * dy;

                    if (p !== p2 && distSq < minDist * minDist) {
                        minDist = Math.sqrt(distSq);
                        k = j;
                    }
                }
                if (k < 0) break;

                shortest.push(points[k]);
                i = k - 1;
            }

            return shortest;
        },

        _catmullRom: function(p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5,
                v1 = (p3 - p1) * 0.5;
            return (2 * p1 - 2 * p2 + v0 + v1) * t * t * t +
                (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t * t + v0 * t + p1;
        },

        _colorToString: function(alpha) {
            var c = this.color;
            return this.colorType === 'rgb' ?
                'rgba(' + c.join(',') + ',' + alpha + ')' :
                'hsla(' + c[0] + ',' + c[1] + '%,' + c[2] + '%,' + alpha + ')';
        }
    };


    /**
     * @constructor
     */
    function Lightning(segmentsNum) {
        this.points   = [];
        this.children = [];

        this._params  = [];
        this._offsets = [];
    }

    Lightning.prototype = extend(LightningAbstract, {
        color:        [255, 255, 255],
        colorType:    'rgb',
        blur:         50,
        maxAlpha:     1,
        minAlpha:     0.75,
        maxLineWidth: 5,
        minLineWidth: 0.5,
        _params:      null,
        _offsets:     null,

        addParam: function(segmentsNum, base, amplitude, speed) {
            this._params.push({
                segmentsNum: segmentsNum,
                base:        base,
                amplitude:   amplitude,
                speed:       speed
            });
            this._offsets[this._params.length - 1] = 0;
        },

        createChild: function(base, amplitude, speed) {
            var child = new LChild(this, {
                base:        base      || this._params.base,
                amplitude:   amplitude || this._params.amplitude,
                speed:       speed     || this._params.speed
            });
            this.children.push(child);
            return child;
        },

        _update: function(points) {
            var params = this._params, param,
                offsets = this._offsets,
                lineLength,
                p0, p1, dx, dy,
                i, ilen, j, jlen;

            for (i = 0, ilen = params.length; i < ilen; i++) {
                param = params[i];

                lineLength = 0;
                for (j = 0, jlen = points.length; j < jlen; j++) {
                    if (j !== jlen - 1) {
                        p0 = points[j];
                        p1 = points[j + 1];
                        dx = p0.x - p1.x;
                        dy = p0.y - p1.y;
                        lineLength += dx * dx + dy * dy;
                    }
                }
                lineLength = Math.sqrt(lineLength);

                offsets[i] += Math.random() * param.speed;

                points = this._filterApply(points, lineLength, param.segmentsNum, param.base, param.amplitude, offsets[i]);
            }

            this.points = points;
        }
    });


    /**
     * LChild
     */
    function LChild(parent, param) {
        this.parent = parent;

        this.points   = [];
        this._param = param;
    }

    LChild.prototype = extend(LightningAbstract, {
        parent:     null,
        _startStep: 0,
        _endStep:   0,
        _separate:  2,
        _param:     null,
        _offset:    0,
        _lastChangeTime: 0,

        _update: function() {
            var parent = this.parent,
                plen   = this.parent.points.length,
                param  = this._param,
                points = [],
                currentTime,
                range, rangeLen, sep, seg,
                c0, c1, dx, dy, lineLength,
                i, j;

            // 一定時間ごと, あるいは親のポイントの数が子の終了ステップ位置を下回った場合に始点と終点の親からの取得位置を更新する
            currentTime = new Date().getTime();
            if (
                currentTime - this._lastChangeTime > 10000 * Math.random() ||
                plen < this._endStep
            ) {
                var stepMin   = plen * 0.1 | 0,
                    startStep = this._startStep = (Math.random() * (plen / 3 * 2 | 0) | 0);
                this._endStep = startStep + stepMin + ((Math.random() * (plen - startStep - stepMin) + 1) | 0);
                this._lastChangeTime = currentTime;
            }

            // 親のポイント配列から取得範囲を切り出す
            range    = parent.points.slice(this._startStep, this._endStep);
            rangeLen = range.length;

            // 範囲からスプライン曲線の制御点を取得する
            seg = (rangeLen - 1) / this._separate;
            for (i = 0; i <= this._separate; i++) {
                j = seg * i | 0;
                points.push(range[j]);
            }

            // ノイズの実際の振り幅
            c0 = points[0];
            c1 = points[points.length - 1];
            dx = c0.x - c1.x;
            dy = c0.y - c1.y;
            lineLength = Math.sqrt(dx * dx + dy * dy);

            this._offset += Math.random() * param.speed;

            this.points = this._filterApply(points, lineLength, rangeLen * 0.5 | 0, param.base, param.amplitude, this._offset);
        },

        _colorToString: function(alpha) {
            var c = this.parent.color;
            return this.parent.colorType === 'rgb' ?
                'rgba(' + c.join(',') + ',' + alpha + ')' :
                'hsla(' + c[0] + ',' + c[1] + '%,' + c[2] + '%,' + alpha + ')';
        }
    });


    // Helpers

    function extend() {
        var t = {}, o, p, i, len;
        for (i = 0, len = arguments.length; i < len; i++) {
            o = arguments[i];
            for (p in o) t[p] = o[p];
        }
        return t;
    }

    return Lightning;

})(window);


/**
 * Point
 */
function Point(x, y, color, colorType) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.colorType = colorType;
    this.vx = Math.random() * (3 + 3) - 3;
    this.vy = Math.random() * (3 + 3) - 3;
    this._latest = { x: this.x, y: this.y };
}

Point._field = null;

Point.setField = function(x, y, width, height) {
    Point._field = {
        x:      x,
        y:      y,
        width:  width,
        height: height,
        right:  x + width,
        bottom: y + height
    };
};

Point.prototype = {
    color:          null,
    colorType:      'rgb',
    radius:         50,
    alpha:          0.2,
    dragging:       false,
    dying:          false,
    dead:           false,
    _mouse:         null,
    _latest:        null,
    _mouseDist:     null,
    _currentAlpha:  0,
    _currentRadius: 0,

    lengthSq: function() {
        return this.x * this.x + this.y * this.y;
    },

    hitTest: function(mouse) {
        var dx = mouse.x - this.x,
            dy = mouse.y - this.y;
        return dx * dx + dy * dy < this.radius * this.radius;
    },

    dragStart: function(mouse) {
        if (this.hitTest(mouse)) {
            this._mouse = mouse;
            this._mouseDist = {
                x: this.x - mouse.x,
                y: this.y - mouse.y
            };
            this.dragging = true;
        }
        return this.dragging;
    },

    dragEnd: function() {
        this.dragging = false;
        this._mouse = this._mouseDist = null;
    },

    kill: function() {
        this.dying = true;
        this.radius = 0;
    },

    update: function(mouse) {
        var field = Point._field,
            radius = this.radius,
            vlen, d;

        if (this._mouse) {
            this._latest.x = this.x;
            this._latest.y = this.y;
            this.x = this._mouse.x + this._mouseDist.x;
            this.y = this._mouse.y + this._mouseDist.y;
            this.vx = this.x - this._latest.x;
            this.vy = this.y - this._latest.y;
        } else {
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.98;
            this.vy *= 0.98;
        }

        vlen = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (vlen && vlen > 20) {
            this.vx /= vlen / 20;
            this.vy /= vlen / 20;
        }

        if (this.x < field.x + radius) {
            this.x = field.x + radius;
            if (this.vx < 0) this.vx *= -1;
        } else if (this.x > field.right - radius) {
            this.x = field.right - radius;
            if (this.vx > 0) this.vx *= -1;
        }

        if (this.y < field.y + radius) {
            this.y = field.y + radius;
            if (this.vy < 0) this.vy *= -1;
        } else if (this.y > field.bottom - radius) {
            this.y = field.bottom - radius;
            if (this.vy > 0) this.vy *= -1;
        }

        // Alpha
        d = this.alpha - this._currentAlpha;
        if ((d < 0 ? -d : d) > 0.001) this._currentAlpha += d * 0.1;
        // Radius
        d = radius - this._currentRadius;
        if ((d < 0 ? -d : d) > 0.01) {
            this._currentRadius += d * 0.35;
        } else if (this.dying) {
            this.dead = true;
        }
        this._currentRadius *= Math.random() * (1 - 0.85) + 0.85;
    },

    draw: function(ctx) {
        var radius = this._currentRadius;
        var gradient = ctx.createRadialGradient(this.x, this.y, radius / 3, this.x, this.y, radius);
        gradient.addColorStop(0, this._colorToString(this._currentAlpha));
        gradient.addColorStop(1, this._colorToString(0));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(this.x + radius, this.y);
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
        ctx.fill();
    },

    _colorToString: function(alpha) {
        var c = this.color;
        return this.colorType === 'rgb' ?
            'rgba(' + c.join(',') + ',' + alpha + ')' :
            'hsla(' + c[0] + ',' + c[1] + '%,' + c[2] + '%,' + alpha + ')';
    }
};




(function() {

    // Configs

    var DRAG_POINT_NUM = 4,
        DRAG_POINT_MAX_NUM = 8,
        CHILD_NUM = 2,
        LIHTNING_COLOR = [195, 100, 50]; // HSL
        const BACKGROUND_COLOR = 'rgba(0, 15, 20, 0.8)';


    // Vars
    let canvas;
    let context;
    var canvasMinSize, centerX, centerY,
        points = [],
        mouse = { x: 0, y: 0 },
        lightning,
        grad,
        i;


    // Event Listeners

    function resize(e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context = canvas.getContext('2d');
        context.lineCap = 'round';

        canvasMinSize = Math.min(canvas.width, canvas.height);
        centerX       = canvas.width * 0.5;
        centerY       = canvas.height * 0.5;

        grad = context.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, 'hsla(195, 100%, 50%, 0.08)');
        grad.addColorStop(0.5, 'hsla(195, 100%, 50%, 0)');
        grad.addColorStop(1, 'hsla(195, 100%, 50%, 0.08)');

        Point.setField(0, 0, canvas.width, canvas.height);
    }

    function mouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        var hit = false, i, len;
        for (i = 0, len = points.length; i < len; i++) {
            if (points[i].hitTest(mouse)) {
                hit = true;
                break;
            }
        }
        document.body.style.cursor = hit ? 'pointer' : 'default';
    }

    function mouseDown(e) {
        var i, len;

        for (i = 0, len = points.length; i < len; i++) {
            if (points[i].dragStart(mouse)) return;
        }

        for (i = 0; i < len; i++) {
            if (points[i].hitTest(mouse)) {
                if (len > 1) points.splice(i, 1);
                return;
            }
        }

        if (len < DRAG_POINT_MAX_NUM) {
            points.push(createPoint(e.clientX, e.clientY));
        } else {
            for (i = 0; i < len - 2; i++) {
                points[i].kill();
            }
        }
    }

    function mouseUp(e) {
        for (var i = 0, len = points.length; i < len; i++) {
            points[i].dragEnd(mouse);
        }
    }

    function doubleClick(e) {
        var i, len = points.length;
        if (len < 3) return;
        for (i = 0; i < len; i++) {
            if (points[i].hitTest(mouse)) {
                points[i].kill();
                return;
            }
        }
    }


    // Functions

    function createPoint(x, y) {
        return new Point(x, y, LIHTNING_COLOR.slice(), 'hsl');
    }

    // Array sort callback
    function sortPoints(p1, p2) {
        return p1.lengthSq() - p2.lengthSq();
    }


    // Init

    document.body.style.backgroundColor = BACKGROUND_COLOR;
    canvas = document.getElementById('c');

    window.addEventListener('resize', resize, false);
    resize(null);

    for (i = 0; i < DRAG_POINT_NUM; i++) {
        points.push(createPoint(Math.random() * canvasMinSize + centerX - canvasMinSize * 0.5, Math.random() * canvasMinSize + centerY - canvasMinSize * 0.5));
    }

    lightning = new Lightning();
    lightning.addParam(8,  10, 0.7, 0.01); // segumentsNum, noiseBase, amplitude, speed
    lightning.addParam(16, 60, 0.5, 0.03);
    lightning.colorType = 'hsl';
    lightning.color = LIHTNING_COLOR.slice();
    for (i = 0; i < CHILD_NUM; i++) {
        lightning.createChild(80, 0.5, 0.06); // noiseBase, amplitude, speed
    }

    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('dblclick', doubleClick, false);


    // Start update

    var loop = function() {
        var controls = [],
            i, len, p;

        context.save();
        context.globalCompositeOperation = 'source-over';
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = grad;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();

        context.globalCompositeOperation = 'lighter';
        for (i = 0, len = points.length; i < len; i++) {
            p = points[i];
            p.update();
            p.alpha = p.hitTest(mouse) ? 0.75 : 0.2;
            p.draw(context);
            if (p.dead) {
                points.splice(i, 1);
                i--;
                len--;
                continue;
            }
            if (!p.dying) controls.push(p);
        }

        // 原点からの距離でソート
        controls.sort(sortPoints);

        lightning.render(context, controls);
        lightning.color[2] = Math.random() * (100 - 35) + 35;

        requestAnimationFrame(loop);
    };
    loop();
})();
