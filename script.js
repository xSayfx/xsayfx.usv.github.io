document.addEventListener("DOMContentLoaded", function() {
    // التحقق من وجود المستخدم قبل تحميل الصفحة
    const user = JSON.parse(localStorage.getItem('user')); // جلب معلومات المستخدم من localStorage
    if (!user || !localStorage.getItem('sessionExpiry')) {
        window.location.href = 'login.html'; // إذا لم يكن هناك مستخدم أو انتهت الجلسة، توجيه إلى صفحة تسجيل الدخول
    } else {
        const sessionExpiry = parseInt(localStorage.getItem('sessionExpiry'), 10);
        const currentTime = new Date().getTime();

        if (currentTime > sessionExpiry) {
            localStorage.removeItem('user');
            localStorage.removeItem('sessionExpiry');
            window.location.href = 'login.html';
        } else {
            document.getElementById('userName').textContent = user.name; // عرض اسم المستخدم
            document.getElementById('userAvatar').src = user.image; // عرض صورة المستخدم
            startTimer(); // بدء العد التنازلي
        }
    }
});

// إعداد العداد
let countdown;
const timerElement = document.getElementById('timer');
let interval;

function startTimer() {
    const sessionExpiry = parseInt(localStorage.getItem('sessionExpiry'), 10);
    const currentTime = new Date().getTime();
    countdown = Math.floor((sessionExpiry - currentTime) / 1000); // حساب الوقت المتبقي من الجلسة
    timerElement.textContent = countdown;

    interval = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;

        // تحديث شكل الدائرة
        const percent = (countdown / 120) * 100;
        document.querySelector('.circle').style.strokeDasharray = `${percent}, 100`;

        if (countdown <= 0) {
            clearInterval(interval);
            localStorage.removeItem('user');
            localStorage.removeItem('sessionExpiry');
            window.location.href = 'login.html'; // توجيه إلى صفحة تسجيل الدخول
        }
    }, 1000);
}

// وظيفة النسخ
const copyButtons = document.querySelectorAll('.copy-button');
copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const text = e.target.previousSibling.textContent.trim();
        navigator.clipboard.writeText(text).then(() => {
            e.target.textContent = 'تم النسخ!';
            setTimeout(() => {
                e.target.textContent = 'نسخ';
            }, 2000);
        }).catch(err => {
            console.error('فشل النسخ', err);
        });
    });
});

document.getElementById('activateButton').addEventListener('click', function() {
    // إرسال رسالة إلى Discord webhook
    const webhookUrl = 'https://ptb.discord.com/api/webhooks/1288802479991164928/DOAkdiZEvZkwFqtXzSvFTf1wobFCjcnmhwfIj5ge8OcsT5NDqC6jQJkr85QkXC0iJ2Jb'; // استبدلها برابط الـ Webhook الخاص بك

    const userName = document.getElementById('userName').textContent;

    const message = {
        content: `${userName} قام بتفعيل البطاقة!`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (response.ok) {
            console.log('تم إرسال الرسالة إلى Discord بنجاح!');
            alert('تم تفعيل البطاقة وإرسال الرسالة إلى Discord!');
        } else {
            console.error('فشل إرسال الرسالة إلى Discord.');
        }
    })
    .catch(error => {
        console.error('حدث خطأ أثناء إرسال الرسالة:', error);
    });
});