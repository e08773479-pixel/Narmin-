// نظام الباسورد
const checkBtn = document.getElementById('check-btn');
const passInput = document.getElementById('password-input');
const loginBox = document.getElementById('login-box');
const surpriseBox = document.getElementById('surprise-box');
const errorText = document.getElementById('error-text');

checkBtn.addEventListener('click', () => {
    let val = passInput.value.trim();
    if (val === "بحبك") {
        loginBox.style.display = "none";
        surpriseBox.style.display = "block";
        startSurprise();
    } else {
        errorText.textContent = "اكتب كلمة (بحبك) عشان تفتح المفاجأة يا صاحبي! ❤️";
    }
});

// تفاعل المفاجأة
function startSurprise() {
    // رسائل متغيرة
    const notes = [
        "أحلى صدفة في حياتي إنك معايا يا نرمين.. ربنا ما يحرمني منك أبداً! ✨",
        "مهما الدنيا راحت وجمت، هفضل دايماً جنبك ومعاكي يا أجمل نرمين في العالم 🤍",
        "يوسف بيحبك حب كبير مالوش حدود يا سكر! 🥰"
    ];
    let idx = 0;
    const msgEl = document.getElementById('love-message');
    document.getElementById('next-msg-btn').addEventListener('click', () => {
        idx = (idx + 1) % notes.length;
        msgEl.textContent = notes[idx];
    });

    // قلوب متحركة
    setInterval(() => {
        const h = document.createElement('div');
        h.classList.add('floating-heart');
        h.innerHTML = '❤️';
        h.style.left = Math.random() * 100 + 'vw';
        h.style.animationDuration = (Math.random() * 2 + 3) + 's';
        document.getElementById('heartsContainer').appendChild(h);
        setTimeout(() => h.remove(), 5000);
    }, 400);

    // العداد من الساعة 1 بالليل النهارده
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, 0, 0);

    setInterval(() => {
        const currentTime = new Date();
        let diff = currentTime - startDate;
        if (diff < 0) diff = 0;

        document.getElementById('days-count').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours-count').textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
        document.getElementById('minutes-count').textContent = Math.floor((diff / 1000 / 60) % 60);
        document.getElementById('seconds-count').textContent = Math.floor((diff / 1000) % 60);
    }, 1000);
}
