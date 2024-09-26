document.addEventListener("DOMContentLoaded", function() {
  const users = {
    "anaysu11": { name: "يوسف", image: "https://cdn.discordapp.com/avatars/509912219421507584/d77aac5d0ed3923bf3260da024a71385.webp?size=1024&animated=true&width=0&height=256" },
    "aamaz66": { name: "مازن", image: "https://cdn.discordapp.com/avatars/1136627897034100827/a0369b1cb110e9efa28a10b6bdfa8a85.webp?size=1024&animated=true&width=0&height=256" },
    "aasido11a": { name: "SIDO", image: "https://cdn.discordapp.com/avatars/1136627897034100827/a0369b1cb110e9efa28a10b6bdfa8a85.webp?size=1024&animated=true&width=0&height=256" },
  };

  document.querySelector('.arrow-button').addEventListener('click', function() {
    const authCode = document.getElementById('authCode').value;
    const user = users[authCode];

    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // تخزين معلومات المستخدم
      window.location.href = 'index.html'; // الانتقال إلى صفحة معلومات البطاقة
    } else {
      alert('كود غير صحيح');
    }
  });
});
