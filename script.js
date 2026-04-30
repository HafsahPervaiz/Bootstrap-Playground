/* ========== BOOTSTRAP PLAYGROUND — script.js ========== */
/* This file handles all the interactivity:
   1. Tooltips & Popovers
   2. Sidebar navigation
   3. Theme toggle (Dark/Light)
   4. XP Points & Level system (gamification)
   5. Module completion + progress bar
   6. Quiz challenges with scoring
   7. Typing animation & scroll effects
*/

document.addEventListener('DOMContentLoaded', function () {

    /* ====== 1. INITIALIZE TOOLTIPS & POPOVERS ====== */
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
        new bootstrap.Tooltip(el);
    });
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(function (el) {
        new bootstrap.Popover(el);
    });


    /* ====== 2. SIDEBAR — Close on Mobile ====== */
    var sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var sidebar = document.getElementById('sidebarOffcanvas');
            var offcanvas = bootstrap.Offcanvas.getInstance(sidebar);
            if (offcanvas) offcanvas.hide();
        });
    });


    /* ====== 3. SIDEBAR — Highlight Active Link on Scroll ====== */
    var sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.sidebar-link[href="#' + id + '"]');
            if (link && scrollPos >= top && scrollPos < top + height) {
                sidebarLinks.forEach(function (l) { l.classList.remove('active'); });
                link.classList.add('active');
            }
        });
    });


    /* ====== 4. FADE-IN SECTIONS ON SCROLL ====== */
    var fadeElements = document.querySelectorAll('.fade-in');
    function checkFadeIn() {
        fadeElements.forEach(function (el) {
            var windowBottom = window.scrollY + window.innerHeight;
            if (windowBottom > el.offsetTop + 40) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', checkFadeIn);
    checkFadeIn();
    setTimeout(checkFadeIn, 200);


    /* ====== 5. THEME TOGGLE (Dark / Light) ====== */
    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var html = document.documentElement;
            var body = document.body;
            if (html.getAttribute('data-bs-theme') === 'dark') {
                html.setAttribute('data-bs-theme', 'light');
                body.style.background = '#f5f5f5';
                body.style.color = '#333';
                themeBtn.textContent = '🌙';
            } else {
                html.setAttribute('data-bs-theme', 'dark');
                body.style.background = '#0a0a1a';
                body.style.color = '#e0e0e0';
                themeBtn.textContent = '☀️';
            }
        });
    }


    /* ====================================================
       6. GAMIFICATION — XP POINTS & LEVEL SYSTEM
       Every action earns XP. Levels unlock as XP grows.
       This makes learning feel like a game!
    ==================================================== */
    var totalXP = 0;
    var streak = 0;
    var xpDisplay = document.getElementById('xpDisplay');
    var xpDisplayHero = document.getElementById('xpDisplayHero');
    var levelDisplay = document.getElementById('levelDisplay');
    var levelDisplayHero = document.getElementById('levelDisplayHero');
    var streakDisplay = document.getElementById('streakDisplay');
    var streakDisplayHero = document.getElementById('streakDisplayHero');
    // Footer stats
    var footerXP = document.getElementById('footerXP');
    var footerLevel = document.getElementById('footerLevel');
    var footerStreak = document.getElementById('footerStreak');
    var footerDone = document.getElementById('footerDone');

    // XP values for different actions
    var XP_MODULE_COMPLETE = 50;
    var XP_CHALLENGE_CORRECT = 100;
    var XP_INTERACTIVE = 10;

    // Level thresholds
    var levels = [
        { name: '🌱 Beginner', min: 0 },
        { name: '📗 Learner', min: 100 },
        { name: '⚡ Explorer', min: 300 },
        { name: '🔥 Builder', min: 600 },
        { name: '🏆 Master', min: 1000 },
        { name: '👑 Bootstrap King', min: 1500 }
    ];

    function addXP(amount, source) {
        totalXP = totalXP + amount;

        // Update XP display (navbar + hero bar)
        if (xpDisplay) xpDisplay.textContent = totalXP + ' XP';
        if (xpDisplayHero) xpDisplayHero.textContent = totalXP;
        if (footerXP) footerXP.textContent = totalXP;

        // Check for level up
        var currentLevel = levels[0].name;
        for (var i = 0; i < levels.length; i++) {
            if (totalXP >= levels[i].min) {
                currentLevel = levels[i].name;
            }
        }
        if (levelDisplay) levelDisplay.textContent = currentLevel;
        if (levelDisplayHero) levelDisplayHero.textContent = currentLevel;
        if (footerLevel) footerLevel.textContent = currentLevel;

        // Show floating XP notification
        showXPPopup('+' + amount + ' XP', source);
    }

    // Floating "+50 XP" popup animation
    function showXPPopup(text, element) {
        var popup = document.createElement('div');
        popup.textContent = text;
        popup.style.cssText = 'position:fixed;font-size:1.2rem;font-weight:bold;color:#00ff88;z-index:9999;pointer-events:none;transition:all 1s ease-out;text-shadow:0 0 10px #00ff88;';

        if (element) {
            var box = element.getBoundingClientRect();
            popup.style.left = box.left + 'px';
            popup.style.top = box.top + 'px';
        } else {
            popup.style.right = '20px';
            popup.style.top = '80px';
        }

        document.body.appendChild(popup);
        setTimeout(function () {
            popup.style.top = (parseInt(popup.style.top) - 60) + 'px';
            popup.style.opacity = '0';
        }, 50);
        setTimeout(function () { popup.remove(); }, 1100);
    }


    /* ====== 7. AUTO-ADD COMPLETE BUTTONS TO ALL MODULES ====== */
    var allModules = document.querySelectorAll('.module-section');
    allModules.forEach(function (section) {
        if (section.querySelector('.complete-btn')) return;
        var headerDiv = section.querySelector('.mb-4');
        if (!headerDiv) return;
        var heading = headerDiv.querySelector('h2');
        var small = headerDiv.querySelector('small');
        if (!heading || !small) return;

        var flexWrapper = document.createElement('div');
        flexWrapper.className = 'd-flex justify-content-between align-items-center';
        var textDiv = document.createElement('div');
        textDiv.appendChild(small);
        textDiv.appendChild(heading);

        var btn = document.createElement('button');
        btn.className = 'btn btn-sm btn-outline-info complete-btn';
        btn.innerHTML = '<i class="bi bi-check-circle"></i> Complete';

        flexWrapper.appendChild(textDiv);
        flexWrapper.appendChild(btn);

        var description = headerDiv.querySelector('p');
        headerDiv.innerHTML = '';
        headerDiv.appendChild(flexWrapper);
        if (description) headerDiv.appendChild(description);
    });


    /* ====== 8. PROGRESS TRACKER + MODULE COMPLETION ====== */
    var completedModules = 0;
    var totalModules = document.querySelectorAll('.complete-btn').length;

    document.querySelectorAll('.complete-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (btn.disabled) return;

            completedModules++;
            streak++;

            // Change button to "Done"
            btn.innerHTML = '✅ Done!';
            btn.disabled = true;
            btn.classList.remove('btn-outline-info');
            btn.classList.add('btn-success');

            // Bounce animation
            btn.classList.add('bounce');
            setTimeout(function () { btn.classList.remove('bounce'); }, 500);

            // Update progress bar
            updateProgress();

            // Award XP (bonus for streaks!)
            var xpEarned = XP_MODULE_COMPLETE;
            if (streak >= 3) xpEarned = xpEarned + 25; // Streak bonus!
            addXP(xpEarned, btn);

            // Update streak display (navbar + hero)
            if (streakDisplay) {
                streakDisplay.textContent = '🔥 ' + streak;
                streakDisplay.classList.add('bounce');
                setTimeout(function () { streakDisplay.classList.remove('bounce'); }, 500);
            }
            if (streakDisplayHero) streakDisplayHero.textContent = streak;
            if (footerStreak) footerStreak.textContent = streak;

            // Floating emoji
            showReaction(btn, '🎉');

            // Check if ALL modules are done
            if (completedModules >= totalModules) {
                setTimeout(function () { showVictory(); }, 600);
            }
        });
    });

    function updateProgress() {
        var pct = Math.round((completedModules / totalModules) * 100);
        var bar = document.getElementById('globalProgress');
        var label = document.getElementById('globalPct');
        var heroLabel = document.getElementById('globalPctHero');
        if (bar) bar.style.width = pct + '%';
        if (label) label.textContent = pct + '%';
        if (heroLabel) heroLabel.textContent = pct + '%';
        if (footerDone) footerDone.textContent = pct + '%';
    }


    /* ====== 9. FLOATING EMOJI REACTION ====== */
    function showReaction(element, emoji) {
        var span = document.createElement('span');
        span.textContent = emoji;
        span.style.cssText = 'position:fixed;font-size:2rem;z-index:9999;pointer-events:none;transition:all 1s ease-out;';

        var box = element.getBoundingClientRect();
        span.style.left = box.left + 'px';
        span.style.top = box.top + 'px';
        document.body.appendChild(span);

        setTimeout(function () {
            span.style.top = (box.top - 80) + 'px';
            span.style.opacity = '0';
        }, 50);
        setTimeout(function () { span.remove(); }, 1100);
    }


    /* ====== 10. VICTORY CELEBRATION ====== */
    function showVictory() {
        // Create a fun victory overlay
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;';

        overlay.innerHTML = '<div style="text-align:center;animation:bounce 0.5s;">' +
            '<div style="font-size:5rem;">🏆</div>' +
            '<h1 style="color:#ffd700;font-size:2.5rem;margin:20px 0;">You Did It!</h1>' +
            '<p style="color:#fff;font-size:1.2rem;">All modules completed! Total XP: <strong style="color:#00ff88;">' + totalXP + '</strong></p>' +
            '<p style="color:#888;">Click anywhere to close</p>' +
            '</div>';

        overlay.addEventListener('click', function () {
            overlay.remove();
        });

        document.body.appendChild(overlay);

        // Burst of emojis
        var emojis = ['🎉', '⭐', '🏆', '🔥', '💯', '👑', '✨', '🎊'];
        for (var i = 0; i < 12; i++) {
            (function (index) {
                setTimeout(function () {
                    var em = document.createElement('span');
                    em.textContent = emojis[index % emojis.length];
                    em.style.cssText = 'position:fixed;font-size:2rem;z-index:999999;pointer-events:none;transition:all 2s ease-out;';
                    em.style.left = (Math.random() * 80 + 10) + '%';
                    em.style.top = '90%';
                    document.body.appendChild(em);
                    setTimeout(function () {
                        em.style.top = (Math.random() * 30 + 5) + '%';
                        em.style.opacity = '0';
                    }, 50);
                    setTimeout(function () { em.remove(); }, 2100);
                }, index * 100);
            })(i);
        }
    }


    /* ====== 11. QUIZ CHALLENGE ANSWERS ====== */
    document.querySelectorAll('.challenge-option').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var isCorrect = btn.getAttribute('data-correct') === 'true';

            if (isCorrect) {
                btn.classList.remove('btn-outline-light');
                btn.classList.add('btn-success');
                showReaction(btn, '🎉');
                addXP(XP_CHALLENGE_CORRECT, btn);

                // Disable all options in this challenge
                var card = btn.parentElement.parentElement;
                card.querySelectorAll('.challenge-option').forEach(function (b) { b.disabled = true; });
            } else {
                btn.classList.remove('btn-outline-light');
                btn.classList.add('btn-danger');
                showReaction(btn, '❌');
                streak = 0; // Reset streak on wrong answer
                if (streakDisplay) streakDisplay.textContent = '🔥 0';
                if (streakDisplayHero) streakDisplayHero.textContent = '0';
                if (footerStreak) footerStreak.textContent = '0';

                btn.classList.add('bounce');
                setTimeout(function () {
                    btn.classList.remove('bounce', 'btn-danger');
                    btn.classList.add('btn-outline-light');
                    btn.disabled = false;
                }, 800);
            }
        });
    });


    /* ====== 12. XP FOR INTERACTIVE DEMOS ====== */
    // Award small XP when users click interactive playground buttons
    var playgroundButtons = document.querySelectorAll('.btn-outline-info, .btn-outline-warning');
    var interactedDemos = {};
    playgroundButtons.forEach(function (btn) {
        // Only track buttons inside playground-card or example-preview
        if (btn.closest && (btn.closest('.playground-card') || btn.closest('.example-preview'))) {
            btn.addEventListener('click', function () {
                // Get section ID to track unique interactions
                var section = btn.closest('section');
                if (section && !interactedDemos[section.id]) {
                    interactedDemos[section.id] = true;
                    addXP(XP_INTERACTIVE, btn);
                }
            });
        }
    });


    /* ====== 13. UNIVERSAL LIVE HTML EDITORS ====== */
    // Turns every static example into a live code playground
    var previewBoxes = document.querySelectorAll('.example-preview');
    previewBoxes.forEach(function (box, index) {
        // Prevent editing elements that are purely controlled by other Playgrounds
        if (box.closest('#build-target')) return; 

        var originalHTML = box.innerHTML;
        box.innerHTML = '';
        box.style.position = 'relative';

        // Wrapper for the visual output
        var outputDiv = document.createElement('div');
        outputDiv.className = 'live-output-area';
        outputDiv.innerHTML = originalHTML;

        // The textarea editor
        var editorArea = document.createElement('textarea');
        editorArea.className = 'form-control bg-dark text-info border-secondary d-none mt-3 shadow-none';
        editorArea.style.fontFamily = 'monospace';
        editorArea.style.fontSize = '0.85rem';
        editorArea.style.resize = 'vertical';
        editorArea.rows = 6;
        
        // Clean up indentation for the editor
        var cleanHTML = originalHTML.replace(/^[ \t]+/gm, '  ').trim();
        editorArea.value = cleanHTML;

        // The edit toggle button
        var editBtn = document.createElement('button');
        editBtn.className = 'btn btn-sm btn-outline-light mb-3';
        editBtn.innerHTML = '<i class="bi bi-code-square"></i> Live Edit HTML';

        // Toggle logic
        var isEditing = false;
        editBtn.addEventListener('click', function () {
            isEditing = !isEditing;
            if (isEditing) {
                editorArea.classList.remove('d-none');
                editBtn.innerHTML = '<i class="bi bi-check2"></i> Close Editor';
                editBtn.classList.replace('btn-outline-light', 'btn-success');
            } else {
                editorArea.classList.add('d-none');
                editBtn.innerHTML = '<i class="bi bi-code-square"></i> Live Edit HTML';
                editBtn.classList.replace('btn-success', 'btn-outline-light');
            }
        });

        // Syncing textarea to output
        editorArea.addEventListener('input', function () {
            outputDiv.innerHTML = editorArea.value;
            // Optionally reward XP for actually live-editing code!
            addXP(2, editBtn); 
        });

        box.appendChild(editBtn);
        box.appendChild(outputDiv);
        box.appendChild(editorArea);
    });

    /* ====== 14. TYPING EFFECT ON HERO ====== */
    var heroEl = document.getElementById('heroTyping');
    if (heroEl) {
        var text = heroEl.textContent;
        heroEl.textContent = '';
        heroEl.style.borderRight = '3px solid #00d4ff';
        var i = 0;
        var typeInterval = setInterval(function () {
            heroEl.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(function () { heroEl.style.borderRight = 'none'; }, 1000);
            }
        }, 60);
    }

});
