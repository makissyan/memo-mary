const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const clouds = [];

function createCloud() {
    const parts = [];
    const circles = 3 + Math.floor(Math.random() * 3); // 3–5 частинок
    const baseY = Math.random() * canvas.height;
    const scale = 2 + Math.random() * 1.5;
    const opacity = 0; // Починаємо з 0 для fade-in

    for (let i = 0; i < circles; i++) {
        parts.push({
            x: i * 25 + Math.random() * 15,
            y: Math.random() * 15,
            r: (20 + Math.random() * 15) * scale
        });
    }

    return {
        x: Math.random() * canvas.width,
        y: baseY,
        speed: 0.5 + Math.random() * 0.5,
        parts: parts,
        opacity: opacity,       // прозорість для fade-in
        maxOpacity: 0.6 + Math.random() * 0.3,
        fadeSpeed: 0.005 + Math.random() * 0.005
    };
}

// Створюємо 10 хмар
for (let i = 0; i < 10; i++) {
    clouds.push(createCloud());
}

function drawCloud(cloud) {
    ctx.save();
    ctx.translate(cloud.x, cloud.y);

    // обмежуємо максимальну прозорість
    if (cloud.opacity < cloud.maxOpacity) {
        cloud.opacity += cloud.fadeSpeed;
    }

    for (let part of cloud.parts) {
        const grad = ctx.createRadialGradient(
            part.x, part.y, part.r * 0.2,
            part.x, part.y, part.r
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${cloud.opacity * 1.2})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.shadowColor = `rgba(0, 0, 0, ${cloud.opacity * 0.3})`;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(part.x, part.y, part.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
    }

    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let cloud of clouds) {
        drawCloud(cloud);
        cloud.x += cloud.speed;

        if (cloud.x > canvas.width + 150) {
            Object.assign(cloud, createCloud());
            cloud.x = -150;
        }
    }

    requestAnimationFrame(animate);
}

animate();