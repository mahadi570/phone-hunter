function loadData(data) {
    console.log(data);
    for (const phone of data) {
        const div = document.createElement('div');
        div.innerHTML = `
        <img src='${phone.image}'>
        <h2>Brand Name: ${phone.brand}</h2>
    <h1>Device Name: ${phone.phone_name}</h1>
    `;
        document.getElementById('phone-container').appendChild(div);
    }
}

const button = document.getElementById('search-btn'); 

button.addEventListener('click', function () {
    fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
        .then(res => res.json())
        .then(data => loadData(data.data));
});

fetch('https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089')
.then(res => res.json())
.then(data => console.log(data))