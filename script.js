function showData(data) {
    const phoneContainer = document.getElementById('phone-container');
    const errorContainer = document.getElementById('error-container');
    phoneContainer.innerHTML = ''
    errorContainer.innerHTML = ''

    if (data.length < 1) {
        const div = document.createElement('div');
        div.innerHTML = `
        
        <h1 class="font-bold text-center">No device Found</h1>
        
        `
        errorContainer.appendChild(div)
    } else {
        for (const phone of data) {
            const div = document.createElement('div');
            div.innerHTML = `
                    <div class="card bg-base-100 shadow-xl h-full w-full">
                    <figure class="px-10 pt-10">
                    <img src='${phone.image}'/>
                    </figure>
                    <div class="card-body items-center text-center">
                    <h1 class="card-title">Device Name: ${phone.phone_name}</h1>
                    <h2>Brand Name: ${phone.brand}</h2>
                    <div class="card-actions">
                    <a class="btn btn-primary font-bold text-white" class="btn" onclick = "buyPhoneModal('${phone.slug}')">Buy Now</a>
                    <a class="btn btn-primary font-bold text-white" onclick="showPhoneDetails('${phone.slug}')" class="btn">Show Details</a>
                    </div>
                    </div>
                    </div>`

                ;
            phoneContainer.appendChild(div);
        }
    }
}


const loadData = async () => {
    const searchTextField = document.getElementById('search-text');
    const searchText = searchTextField.value;
    searchTextField.value = ''
    if (searchText === '') {
        document.getElementById('searched-text').classList.add('hidden');
        try {
            const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
            const jsonData = await response.json()
            const data = showData(jsonData.data)
        } catch (err) { console.log(err) }
    } else {
        document.getElementById('searched-text').classList.remove('hidden');
        document.getElementById('searched-text-value').innerText = searchText;

        try {
            const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            const jsonData = await response.json()
            const data = showData(jsonData.data)
        } catch (err) { console.log(err) }
    }
}

const button = document.getElementById('search-btn');
button.addEventListener('click', loadData);
loadData()


const showPhoneDetails = async id => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await response.json();
    const phone = data?.data;

    phone_details_modal.showModal();

    const phoneImg = document.getElementById('detail-phone-img');
    phoneImg.src = `${data.data.image}`;

    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = ''

    const div = document.createElement('div');
    div.innerHTML = `
                    <h3 class="font-medium mt-3 text-base">${phone?.name ? 'Model: ' + phone.name : ''}</h3>
                    <h3 class="font-medium mt-3 text-base">${phone?.brand ? 'Brand: ' + phone.brand : ''}</h3>
                    <h3 class="font-medium mt-3 text-base">${phone?.releaseDate ? 'Release Date: ' + phone.releaseDate : ''}</h3>
                    <h3 class="font-medium mt-3 text-base">${phone?.mainFeatures?.displaySize ? 'Display Size: ' + phone.mainFeatures.displaySize : ''}</h3>
                    <h3 class="font-medium mt-3 text-base">${phone?.mainFeatures?.memory ? 'Memory: ' + phone.mainFeatures.memory : ''}</h3>
                    <h3 class="font-medium mt-3 text-base">${phone?.mainFeatures?.storage ? 'Storage: ' + phone.mainFeatures.storage : ''}</h3>
                    <h3 class="font-medium mt-3 text-base">${phone?.others?.WLAN ? 'WLAN: ' + phone.others.WLAN : ''}</h3>
                    <h3 class="font-medium mt-3 text-base">${phone?.others?.GPS ? 'GPS: ' + phone.others.GPS : ''}</h3>
                    <h3 class="font-medium mt-3 text-base">${phone?.others?.Bluetooth ? 'Bluetooth: ' + phone.others.Bluetooth : ''}</h3>
                    <h3 class="font-medium mt-3 text-base">${phone?.others?.NFC ? 'NFC: ' + phone.others.NFC : ''}</h3>
    `
    detailsContainer.appendChild(div)
}
const buyPhoneModal = async id => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await response.json();
    const phone = data?.data;

    buy_phone_modal.showModal();

    const phoneImg = document.getElementById('buy-details-phone-img');
    phoneImg.src = `${data.data.image}`;

    document.getElementById('buy-details-phone-name').innerText = phone?.name ? phone.name : '';
    document.getElementById('buy-details-brand').innerText = phone?.brand ? phone.brand : '';

}
