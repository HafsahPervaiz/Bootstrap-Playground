/* ========== BOOTSTRAP PLAYGROUND — script.js ========== */

document.addEventListener('DOMContentLoaded', () => {
    initEditors();
    initSidebarNav();
    initCompleteButtons();
    initResetButtons();
    initChallenges();
    loadProgress();
});

/* ====== STORAGE KEYS ====== */
const STORAGE_KEY = 'bp_progress';

function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
}
function saveProgress(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ====== DEFAULT CODE STORE (for reset) ====== */
const defaults = {};

/* ====== LIVE EDITORS ====== */
function initEditors() {
    document.querySelectorAll('.code-editor').forEach(editor => {
        const id = editor.id;
        if (!id) return;
        defaults[id] = editor.value; // store default

        const previewId = id.replace('editor-', 'preview-');
        const iframe = document.getElementById(previewId);
        if (!iframe) {
            // try challenge preview
            const cId = id.replace('challenge-', 'challenge-preview-');
            const cIframe = document.getElementById(cId);
            if (cIframe) {
                updatePreview(cIframe, editor.value);
                editor.addEventListener('input', () => updatePreview(cIframe, editor.value));
            }
            return;
        }
        updatePreview(iframe, editor.value);
        editor.addEventListener('input', () => updatePreview(iframe, editor.value));

        // Tab key support
        editor.addEventListener('keydown', e => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
                editor.selectionStart = editor.selectionEnd = start + 2;
                editor.dispatchEvent(new Event('input'));
            }
        });
    });
}

function updatePreview(iframe, code) {
    const html = `<!DOCTYPE html>
<html lang="en" data-bs-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
<style>
body { padding: 16px; font-family: 'Inter', system-ui, sans-serif; background: #fff; color: #212529; }
</style>
</head>
<body>${code}<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"><\/script></body>
</html>`;
    iframe.srcdoc = html;
}

/* ====== SIDEBAR NAVIGATION ====== */
function initSidebarNav() {
    const links = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.module-section, #hero');

    // Scroll spy
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                links.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.sidebar-link[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    sections.forEach(s => observer.observe(s));

    // Click to close offcanvas on mobile
    links.forEach(link => {
        link.addEventListener('click', () => {
            const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('sidebarOffcanvas'));
            if (offcanvas) offcanvas.hide();
        });
    });
}

/* ====== COMPLETE BUTTONS ====== */
function initCompleteButtons() {
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mod = btn.dataset.module;
            const progress = getProgress();
            progress[mod] = true;
            saveProgress(progress);
            markModuleComplete(mod);
            updateGlobalProgress();
            fireConfetti();
            btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Completed!';
            btn.classList.remove('btn-accent');
            btn.classList.add('btn-success');
            btn.disabled = true;
        });
    });
}

function markModuleComplete(mod) {
    const link = document.querySelector(`.sidebar-link[data-module="${mod}"]`);
    if (link) link.classList.add('completed');
}

/* ====== RESET BUTTONS ====== */
function initResetButtons() {
    document.querySelectorAll('.reset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mod = btn.dataset.module;
            const editorId = `editor-${mod}`;
            const editor = document.getElementById(editorId);
            if (editor && defaults[editorId]) {
                editor.value = defaults[editorId];
                editor.dispatchEvent(new Event('input'));
            }
        });
    });
}

/* ====== GLOBAL PROGRESS ====== */
const ALL_MODULES = ['typography','colors','grid','buttons','cards','forms','components','flex'];

function updateGlobalProgress() {
    const progress = getProgress();
    const completed = ALL_MODULES.filter(m => progress[m]).length;
    const pct = Math.round((completed / ALL_MODULES.length) * 100);
    const bar = document.getElementById('globalProgress');
    const label = document.getElementById('globalPct');
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = pct + '%';
}

/* ====== LOAD SAVED PROGRESS ====== */
function loadProgress() {
    const progress = getProgress();
    ALL_MODULES.forEach(mod => {
        if (progress[mod]) {
            markModuleComplete(mod);
            const btn = document.querySelector(`.complete-btn[data-module="${mod}"]`);
            if (btn) {
                btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Completed!';
                btn.classList.remove('btn-accent');
                btn.classList.add('btn-success');
                btn.disabled = true;
            }
        }
    });
    // Load challenge progress
    for (let i = 1; i <= 4; i++) {
        if (progress[`challenge-${i}`]) {
            markChallengeSolved(i);
        }
    }
    updateGlobalProgress();
}

/* ====== CHALLENGES ====== */
const challengeChecks = {
    1: (code) => {
        const lower = code.toLowerCase();
        return lower.includes('<h1') && lower.includes('text-center') && lower.includes('hello bootstrap');
    },
    2: (code) => {
        const lower = code.toLowerCase();
        return lower.includes('alert') && lower.includes('alert-danger') && lower.includes('something went wrong');
    },
    3: (code) => {
        const lower = code.toLowerCase();
        return lower.includes('row') && lower.includes('col-6') && lower.includes('left') && lower.includes('right');
    },
    4: (code) => {
        const lower = code.toLowerCase();
        return lower.includes('card') && lower.includes('card-body') && lower.includes('card-title') && lower.includes('my card') && lower.includes('btn') && lower.includes('btn-primary') && lower.includes('learn more');
    }
};

const challengeHints = {
    1: 'Hint: Use <code>&lt;h1 class="text-center"&gt;Hello Bootstrap&lt;/h1&gt;</code>',
    2: 'Hint: Use <code>&lt;div class="alert alert-danger"&gt;...&lt;/div&gt;</code>',
    3: 'Hint: Create a <code>.row</code> with two <code>.col-6</code> divs inside',
    4: 'Hint: Use <code>.card</code>, <code>.card-body</code>, <code>.card-title</code>, and a <code>.btn.btn-primary</code>'
};

function initChallenges() {
    document.querySelectorAll('.check-challenge').forEach(btn => {
        btn.addEventListener('click', () => {
            const cId = parseInt(btn.dataset.challenge);
            const editor = document.getElementById(`challenge-${cId}`);
            const feedback = document.getElementById(`feedback-${cId}`);
            if (!editor || !feedback) return;

            const code = editor.value.trim();
            if (!code) {
                feedback.className = 'challenge-feedback mt-2 error';
                feedback.innerHTML = '⚠️ Write some code first!';
                return;
            }

            const check = challengeChecks[cId];
            if (check && check(code)) {
                feedback.className = 'challenge-feedback mt-2 success';
                feedback.innerHTML = '🎉 Correct! Well done!';
                markChallengeSolved(cId);
                const progress = getProgress();
                progress[`challenge-${cId}`] = true;
                saveProgress(progress);
                fireConfetti();
            } else {
                feedback.className = 'challenge-feedback mt-2 error';
                feedback.innerHTML = '❌ Not quite. ' + (challengeHints[cId] || 'Try again!');
            }
        });
    });

    // Live preview for challenges
    document.querySelectorAll('.challenge-editor').forEach(editor => {
        const id = editor.id;
        const num = id.replace('challenge-', '');
        const iframe = document.getElementById(`challenge-preview-${num}`);
        if (!iframe) return;
        editor.addEventListener('input', () => updatePreview(iframe, editor.value));
    });
}

function markChallengeSolved(id) {
    const card = document.querySelector(`.challenge-card[data-challenge="${id}"]`);
    if (card) card.classList.add('solved');
    const status = document.getElementById(`challenge-status-${id}`);
    if (status) status.textContent = '✅';
}

/* ====== CONFETTI ====== */
function fireConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#00d4ff','#7c3aed','#f472b6','#22c55e','#facc15','#f97316'];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 4 + 2,
            spin: Math.random() * 0.2 - 0.1,
            angle: Math.random() * Math.PI * 2,
            drift: Math.random() * 2 - 1,
            opacity: 1
        });
    }

    let frame = 0;
    const maxFrames = 120;

    function animate() {
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.y += p.speed;
            p.x += p.drift;
            p.angle += p.spin;
            if (frame > maxFrames - 30) p.opacity -= 0.033;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });

        if (frame < maxFrames) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    animate();
}
