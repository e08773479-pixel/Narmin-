class ProfessionalLoveApp {
    constructor() {
        this.notes = [
            "أحلى صدفة في حياتي إنك معايا يا نرمين.. ربنا ما يحرمني منك أبداً! ✨",
            "كل ثانية بتعدي وأنا بكلمك بحس إن الدنيا منورة بضحكتك يا أجمل نرمين 🤍",
            "يوسف بيحبك حب كبير مالوش حدود، وهفضل دايماً جنبك ولأجلك 🥰",
            "وجودك في حياتي هو المعنى الحقيقي للسعادة والفرح 🌸"
        ];
        this.currentNoteIndex = 0;
        this.initElements();
        this.addEvents();
    }

    initElements() {
        this.authScreen = document.getElementById('auth-screen');
        this.mainScreen = document.getElementById('main-screen');
        this.passInput = document.getElementById('pass-input');
        this.loginBtn = document.getElementById('login-btn');
        this.errorMsg = document.getElementById('error-msg');
        this.loginCard = document.getElementById('loginCard');
        
        this.msgText = document.getElementById('msg-text');
        this.nextMsgBtn = document.getElementById('next-msg-btn');
    }

    addEvents() {
        this.loginBtn.addEventListener('click', () => this.checkPassword());
        this.passInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkPassword();
        });

        this.nextMsgBtn.addEventListener('click', () => this.changeMessage());
    }

    // دالة برمجة الكتابة الآلية (Typing Effect) الاحترافية
    typeWriter(text, i = 0) {
        if (i === 0) {
            this.msgText.textContent = "";
        }
        if (i < text.length) {
            this.msgText.textContent += text.charAt(i);
            setTimeout(() => this.typeWriter(text, i + 1), 40);
        }
    }

    checkPassword() {
        const val = this.passInput.value.trim();
        if (val === "بحبك") {
            this.authScreen.classList.remove('active');
            this.mainScreen.classList.add('active');
            this.startAppFeatures();
        } else {
            this.errorMsg.textContent = "اكتب كلمة (بحبك) صح عشان تفتح المفاجأة! ❤️";
            // تفعيل حركة الاهتزاز عند الخطأ كمهندس برمجيات حقيقي
            this.loginCard.classList.add('shake');
            setTimeout(() => {
                this.loginCard.classList.remove('shake');
            }, 400);
        }
    }

    changeMessage() {
        this.currentNoteIndex = (this.currentNoteIndex + 1) % this.notes.length;
        this.typeWriter(this.notes[this.currentNoteIndex]);
    }

    startAppFeatures() {
        // كتابة أول رسالة بالنوع الآلي فور فتح الشاشة
        this.typeWriter(this.notes[0]);

        // تشغيل القلوب المتحركة
        setInterval(() => {
            const h = document.createElement('div');
            h.classList.add('heart');
            h.innerHTML = '✨';
            h.style.left = Math.random() * 100 + 'vw';
            h.style.animationDuration = (Math.random() * 3 + 4) + 's';
            document.getElementById('heartsLayer').appendChild(h);
            setTimeout(() => h.remove(), 6000);
        }, 500);

        // تشغيل العداد من الساعة 1:00 صباحاً اليوم
        this.initCounter();
    }

    initCounter() {
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, 0, 0);

        setInterval(() => {
            const currentTime = new Date();
            let diff = currentTime - startDate;
            if (diff < 0) {
                startDate.setDate(startDate.getDate() - 1);
                diff = currentTime - startDate;
            }

            document.getElementById('days').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById('hours').textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
            document.getElementById('minutes').textContent = Math.floor((diff / 1000 / 60) % 60);
            document.getElementById('seconds').textContent = Math.floor((diff / 1000) % 60);
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalLoveApp();
});
