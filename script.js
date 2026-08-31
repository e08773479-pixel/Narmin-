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
