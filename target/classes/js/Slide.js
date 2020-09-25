var jd = {
    st: function (d) {
        var c = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-~".split("")
            , b = c.length
            , e = +d
            , a = [];
        do {
            var mod = e % b;
            e = (e - mod) / b;
            a.unshift(c[mod]);
        } while (e);
        return a.join("")
    },
    pi: function (a, b) {
        return (Array(b).join("0") + a).slice(-b)
    },
    pm: function (d, c, b) {
        var f = this;
        var e = f.st(Math.abs(d));
        var a = "";
        if (!b) {
            a += (d > 0 ? "1" : "0")
        }
        a += f.pi(e, c);
        return a
    },
    encrypt: function (c) {
        var g = this;
        var b = [];
        for (var e = 0; e < c.length; e++) {
            if (e === 0) {
                b.push(g.pm(c[e][0] < 262143 ? c[e][0] : 262143, 3, true));
                b.push(g.pm(c[e][1] < 16777215 ? c[e][1] : 16777215, 4, true));
                b.push(g.pm(c[e][2] < 4398046511103 ? c[e][2] : 4398046511103, 7, true));
                // console.log("%s %s %s %s", b.length / 3, b[b.length - 3], b[b.length - 2], b[b.length - 1])
            } else {
                var a = c[e][0] - c[e - 1][0];
                var f = c[e][1] - c[e - 1][1];
                var d = c[e][2] - c[e - 1][2];
                b.push(g.pm(a < 4095 ? a : 4095, 2, false));
                b.push(g.pm(f < 4095 ? f : 4095, 2, false));
                b.push(g.pm(d < 16777215 ? d : 16777215, 4, true));
                // console.log("%s %s %s %s", b.length / 3, b[b.length - 3], b[b.length - 2], b[b.length - 1])
            }
        }
        return b.join("")
    }
}

function RandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min + 1
}

function RandomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function getTrace(distance) {
    distance = Math.floor(distance);
    var trace = [];
    var sy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, -1, -2];
    var st = [7, 8, 9, 10];

    var baseX = 672,
        baseY = 341,
        baseT = new Date().getTime() - 2000,
        zy = 0,
        zt = 0;
    trace.push(["672", "341", baseT]);

    var x1 = 0, x2 = 0, mid = distance * 3 / 5;
    var t0 = 1, t1 = 1, v0 = 0, v1 = 0, current = 0;
    while (true) {
        if (current < mid) {
            var a = 2;
            x1 = v0 * t0 + 0.5 * a * t0 * t0;
            v1 = v0 + a * t0;
            t0 += 1;
        }
        else {
            var a = -3;
            x2 = v1 * t1 + 0.5 * a * t1 * t1;
            t1 += 1;
        }
        current = Math.floor(x1 + x2);
        // console.log(current);

        zy += RandomChoice(sy);
        zt += RandomChoice(st);
        trace.push(["" + (baseX + current), "" + (baseY + zy), baseT + zt]);
        if (current > distance) {
            break;
        }
    }
    var value = Math.floor(x1 + x2 - distance);
    for (var i = 0; i < value; i++) {
        // var t = RandomChoice(st);

        if (value === i + 1) {
            zt = RandomNum(42, 56);
        }
        if (value === i + 2) {
            zt = RandomNum(32, 38);
        }
        else {
            zt = RandomNum(30, 36);
        }

        x2 += -1;
        trace.push(["" + (baseX + Math.floor(x1 + x2)), "" + (baseY + zy), baseT + zt]);
    }

    zt += RandomNum(100, 200);
    trace.push(["" + (baseX + Math.floor(x1 + x2)), "" + (baseY + zy), baseT + zt]);
    return jd.encrypt(trace);
}


// console.log(getTrace(160));
