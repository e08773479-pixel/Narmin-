document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. كود المؤقت الزمني لـ (يوسف ونرمين)
    // ==========================================
    const startDate = new Date("2026-08-31T01:00:00").getTime();

    function updateCounter() {
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");
        const titleEl = document.getElementById("timer-title");

        // إذا لم يجد عناصر المؤقت في الصفحة الحالية يتوقف هادئاً
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !titleEl) return;

        const now = new Date().getTime();
        const difference = now - startDate;
        const absDiff = Math.abs(difference);

        const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

        daysEl.innerText = days < 10 ? "0" + days : days;
        hoursEl.innerText = hours < 10 ? "0" + hours : hours;
        minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;

        if (difference >= 0) {
            titleEl.innerText = "مر على لحظتنا المميزة:";
        } else {
            titleEl.innerText = "متبقي على لحظتنا المميزة:";
        }
    }

    // تشغيل العداد فوراً وتحديثه كل ثانية
    updateCounter();
    setInterval(updateCounter, 1000);

    // ==========================================
    // 2. كود شبكة الأيام (صفحة رحلتنا الخالدة)
    // ==========================================
    const calendarGrid = document.getElementById('calendar-grid');
    if (calendarGrid) {
        const journeyStartDate = new Date(2026, 7, 31); 
        const today = new Date();

        journeyStartDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - journeyStartDate.getTime();
        const totalDaysPassed = Math.max(1, Math.floor(diffTime / (1000 * 3600 * 24)) + 1);

        const savedChecks = JSON.parse(localStorage.getItem('journey_auto_days')) || {};
        calendarGrid.innerHTML = '';

        for (let i = 0; i < totalDaysPassed; i++) {
            const currentDate = new Date(journeyStartDate);
            currentDate.setDate(journeyStartDate.getDate() + i);

            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
            const formattedDisplayDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

            const dayCard = document.createElement('div');
            dayCard.classList.add('day-card');

            const isChecked = savedChecks[dateKey] || false;
            if (isChecked) dayCard.classList.add('checked');

            dayCard.innerHTML = `
                <span class="day-date">${formattedDisplayDate}</span>
                <span class="day-count">اليوم ${i + 1}</span>
                <span class="day-status">${isChecked ? '✔️' : ''}</span>
            `;

            dayCard.addEventListener('click', () => {
                const checked = dayCard.classList.toggle('checked');
                const statusSpan = dayCard.querySelector('.day-status');
                statusSpan.textContent = checked ? '✔️' : '';
                savedChecks[dateKey] = checked;
                localStorage.setItem('journey_auto_days', JSON.stringify(savedChecks));
            });

            calendarGrid.appendChild(dayCard);
        }
    }
});
