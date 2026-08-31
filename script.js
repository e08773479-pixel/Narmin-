// التاريخ والوقت المستهدف: 31 أغسطس 2026 الساعة 1:00 صباحاً
const startDate = new Date("2026-08-31T01:00:00").getTime();

function updateCounter() {
    const now = new Date().getTime();
    
    // حساب الوقت المنقضي منذ التاريخ المحدد
    const difference = now - startDate;

    if (difference >= 0) {
        // إذا حان الوقت أو مر عليه، يحسب الوقت المنقضي (زيادة تصاعدية)
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        
        document.getElementById("timer-title").innerText = "مر على لحظتنا المميزة:";
    } else {
        // إذا كان التاريخ لم يأتِ بعد (قبل 31 أغسطس 2026)، يعرض تنازلياً حتى يصل للحظة المحددة
        const absDiff = Math.abs(difference);
        const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        
        document.getElementById("timer-title").innerText = "متبقي على لحظتنا المميزة:";
    }
}

// تحديث العداد كل ثانية تلقائياً
setInterval(updateCounter, 1000);
updateCounter();

// ==========================================
// كود توليد مربعات الأيام (يبدأ فوراً من اليوم)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return; // للتأكد أن الصفحة هي صفحة رحلتنا الخالدة

    // بداية التتبع من اليوم: 31 أغسطس 2026 (شهر أغسطس = 7 في JS)
    const journeyStartDate = new Date(2026, 7, 31); 
    const today = new Date();

    journeyStartDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // حساب الأيام (يضمن إظهار مربع اليوم الأول فوراً)
    const diffTime = today.getTime() - journeyStartDate.getTime();
    const totalDaysPassed = Math.max(1, Math.floor(diffTime / (1000 * 3600 * 24)) + 1);

    // استرجاع علامات الصح المحفوظة من المتصفح
    const savedChecks = JSON.parse(localStorage.getItem('journey_auto_days')) || {};

    calendarGrid.innerHTML = '';

    // إنشاء مربعات الأيام بدءاً من مربع اليوم (اليوم 1)
    for (let i = 0; i < totalDaysPassed; i++) {
        const currentDate = new Date(journeyStartDate);
        currentDate.setDate(journeyStartDate.getDate() + i);

        const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        const formattedDisplayDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        const dayCard = document.createElement('div');
        dayCard.classList.add('day-card');

        const isChecked = savedChecks[dateKey] || false;
        if (isChecked) {
            dayCard.classList.add('checked');
        }

        dayCard.innerHTML = `
            <span class="day-date">${formattedDisplayDate}</span>
            <span class="day-count">اليوم ${i + 1}</span>
            <span class="day-status">${isChecked ? '✔️' : ''}</span>
        `;

        // عند الضغط على المربع لوضع علامة صح أو إزالتها
        dayCard.addEventListener('click', () => {
            const checked = dayCard.classList.toggle('checked');
            const statusSpan = dayCard.querySelector('.day-status');
            
            statusSpan.textContent = checked ? '✔️' : '';

            savedChecks[dateKey] = checked;
            localStorage.setItem('journey_auto_days', JSON.stringify(savedChecks));
        });

        calendarGrid.appendChild(dayCard);
    }
});
