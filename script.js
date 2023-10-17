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
                    <a class="btn btn-primary font-bold text-white" class="btn">Buy Now</a>
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
    console.log(data.data);
    phone_details_modal.showModal();



}
