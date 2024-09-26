const cardList = document.getElementById('card-list');
const addCardButton = document.getElementById('addCardButton');

const cards = JSON.parse(localStorage.getItem('cards')) || [];

// عرض البطاقات الحالية
function displayCards() {
    cardList.innerHTML = '';
    cards.forEach((card, index) => {
        const cardItem = document.createElement('div');
        cardItem.className = 'card-item';
        cardItem.innerHTML = `
            <span>رقم البطاقة: ${card.number}</span><br>
            <span>اسم صاحب البطاقة: ${card.holder}</span><br>
            <span>تاريخ الانتهاء: ${card.expiry}</span><br>
            <span>رمز CVV: ${card.cvv}</span><br>
            <button onclick="deleteCard(${index})">حذف</button>
            <hr>
        `;
        cardList.appendChild(cardItem);
    });
}

// إضافة بطاقة جديدة
addCardButton.addEventListener('click', () => {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardHolder = document.getElementById('cardHolder').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    const newCard = {
        number: cardNumber,
        holder: cardHolder,
        expiry: expiryDate,
        cvv: cvv,
    };

    cards.push(newCard);
    localStorage.setItem('cards', JSON.stringify(cards));
    displayCards();
});

// حذف بطاقة
function deleteCard(index) {
    cards.splice(index, 1);
    localStorage.setItem('cards', JSON.stringify(cards));
    displayCards();
}

// عرض البطاقات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayCards);
