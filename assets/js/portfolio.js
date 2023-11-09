// Yes I know this is leaked, and no I don't care since this is IP based ratelimit
const ipgeolocation = "https://api.ipgeolocation.io/ipgeo?apiKey=7818157b7cb3451d91169e6b2c24570a";
const timeouts = [];

document.body.onkeyup = (event) => {
    if (event.keyCode == 32 && app.skippedIntro) {
        return (app.backgroundToggler = !app.backgroundToggler);
    }
};

$(".skip").click(() => {
    skipIntro();
});

$.fn.extend({
    animateCss: function (animationName) {
        const animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
        this.addClass(`animated ${animationName}`).one(animationEnd, () => {
            $(this).removeClass(`animated ${animationName}`);
        });
        return this;
    },
});

const writeLine = (text, speed, timeout, callback) => {
    timeout = typeof timeout === "number" ? timeout : [0, (callback = timeout)];
    const lineNumber = app.id !== 2 ? ++app.id : (app.id += 2);
    setTimeout(() => {
        const typed = new Typed(`#line${lineNumber}`, { strings: text, typeSpeed: speed, onComplete: callback });
    }, timeout);
};


$.getJSON(ipgeolocation)
    .done((data) => {
        writeLine(["Loading...", "Granting access to <span style='font-size: 14px; color: #06d;'>[bestsysadmin.me]</span>..."], 30, () => {
        if (app.skippedIntro) return;

        if(data.ip === 'undefined'){
            skipIntro();
        }

        clearCursor();
        const usernames = ["user", "dude"];
        const ip = data.ip ? data.ip : usernames[Math.floor(Math.random() * usernames.length)];
        const country = data.country_name ? data.country_name : "your country";
        writeLine([`Access granted! <span style='font-size: 14px; color: #0f0;'>[success]</span>`, `Welcome back, <i style='color: #0f0'>${ip}</i>! By the way, nice to see someone from ${country} here!`], 30, 500, () => {
            if (app.skippedIntro) return;
            clearCursor();
            writeLine([`<i style='color: #F62459'>user@isnow.dev:~$ </i>`], 120, 500, () => {
            timeouts.push(
                setTimeout(() => {
                if (app.skippedIntro) return;
                clearCursor();
                setTimeout(() => {
                    skipIntro();
                }, 500);
                }, 1000)
            );
            });
        });
        });
    })
    .fail((jqxhr, textStatus, error) => {
        skipIntro();
    });

const skipIntro = () => {
    if (app.skippedIntro) return;
    app.skippedIntro = true;
    timeouts.forEach((timeout) => {
        clearTimeout(timeout);
    });
    $(".top-right").remove();
    $("#start").fadeOut(100, () => {
        $("#start").remove();
        $("#marquee").marquee({ duration: 15000, gap: 420, delayBeforeStart: 1000, direction: "left", duplicated: true });
        setTimeout(() => {
            $(".brand-header").animateCss(app.effects[Math.floor(Math.random() * app.effects.length)]);
        }, 200);
        setTimeout(() => {
            const typed = new Typed("#brand", {
                strings: app.brandDescription,
                typeSpeed: 100,
                loop: true
            });
        }, 1350);
        setTimeout(() => {
            $("#hiddenBox").fadeIn();
        }, 200);
    });
};
const clearCursor = () => {
    return $("span").siblings(".typed-cursor").css("opacity", "0");
};
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var stars = [],
    FPS = 60,
    x = 100,
    mouse = { x: 0, y: 0 };
for (var i = 0; i < x; i++) {
    stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 1 + 1, vx: Math.floor(Math.random() * 50) - 25, vy: Math.floor(Math.random() * 50) - 25 });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.stroke();
    }
    ctx.beginPath();
    for (var i = 0, x = stars.length; i < x; i++) {
        var starI = stars[i];
        ctx.moveTo(starI.x, starI.y);
        if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
        for (var j = 0, x = stars.length; j < x; j++) {
            var starII = stars[j];
            if (distance(starI, starII) < 150) {
                ctx.lineTo(starII.x, starII.y);
            }
        }
    }
    ctx.lineWidth = 0.05;
    ctx.strokeStyle = "white";
    ctx.stroke();
}
function distance(point1, point2) {
    var xs = 0;
    var ys = 0;
    xs = point2.x - point1.x;
    xs = xs * xs;
    ys = point2.y - point1.y;
    ys = ys * ys;
    return Math.sqrt(xs + ys);
}
function update() {
    for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];
        s.x += s.vx / FPS;
        s.y += s.vy / FPS;
        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
    }
}
canvas.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
function tick() {
    draw();
    update();
    requestAnimationFrame(tick);
}
tick();
