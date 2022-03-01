document.getElementById('loading').style.display = "none";
// fetch data
const phoneData = () => {
    const inputFromuser = document.getElementById('name-input').value;
    const phoneName = inputFromuser.toLowerCase();
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
        .then(res => res.json())
        .then(data => displayPhone(data))
    toggleLoading('block');
    document.getElementById('not-found').style.display = "none";
}
// not found handler
const toggleNotFound = (input) => {
    const notFound = document.getElementById('not-found');
    notFound.style.display = input;
    
}
// loading handler
const toggleLoading = (input) => {
    const loading = document.getElementById('loading');
    loading.style.display = input;
}
// displaying data
const displayPhone = (data) => {
    if (data.status == false) {
        cards.textContent = "";
        document.getElementById('not-found').style.display = 'block';
        toggleLoading('none');
        const feature = document.getElementById('feature');
        feature.style.display = 'none'
    } else {
        const cards = document.getElementById('cards');
        cards.textContent = "";
        const allData = data.data;
        const firstData = data.data.slice(0, 20);
        for (let item of firstData) {
            const div = document.createElement('div');
            div.classList.add('col-12');
            div.classList.add('col-md-4');
            div.classList.add('d-flex');
            div.classList.add('justify-content-center');
            div.classList.add('text-center');
            div.innerHTML = `
                <div class="card g-2" style="width: 95%;">
                    <img src="${item.image}" class="card-img-top" alt="${item.brand} mobile image">
                    <div class="card-body">
                        <h5 class="card-title">${item.brand}</h5>
                        <p class="card-text">${item.phone_name}</p>
                        <button class="btn btn-primary" onclick="loadDetail('${item.slug}')">Specification</button>
                    </div>
                </div>
    `
            cards.appendChild(div)
        }
        if (allData.length > 20) {
            const showMore = document.getElementById('show-more');
            
            showMore.style.display = 'block';
            div = document.createElement('div');
            div.classList.add('col-12');
            div.innerHTML = `<button class="btn btn-primary" onclick="showRemainingData()">Show more</button>`;
            showMore.appendChild(div);
        }
        
        toggleNotFound('none');
        toggleLoading('none');
    }
    
}

const loadDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => specDetails(data.data))
};
// phone spec detail section
const specDetails = (data) => {
    console.log(data.brand);
    const featureSection = document.getElementById('feature');
    featureSection.style.display = 'block'
    const div = document.createElement('div');
    featureSection.textContent = '';
    div.classList.add('feature')
    div.innerHTML = `
    <h3 class="text-center m-3">Details</h3>
        <div class="row">
                        <div class="col-md-12 text-center"><img src="${data.image}" alt=""></div>
                        <div class="col-md-12 my-3">
                            <h3>Brand name: ${data.brand}</h3>
                            <h3>model: ${data.name}</h3>
                        </div>
                    </div>
                    <!-- specification container -->
                    <div class="row features">
                        <div class="col col-md-12">
                            <h2 class="text-center m-2">Features</h2>
                            <p><span>Chipset: </span>${data.mainFeatures.chipSet}</p>
                            <p><span>Storsge: </span>${data.mainFeatures.storage}</p>
                            <p><span>Display Size: </span>${data.mainFeatures.displaySize}</p>
                            <p><span>Memory: </span>${data.mainFeatures.memory}</p>
                            <p><span>Sensors: </span>${data.mainFeatures.sensors}</p>
                            <p><span>Others</span></p>
                            <p><span>WLAN: </span>${data.others.WLAN}</p>
                            <p><span>Bluetooth: </span>${data.others.Bluetooth}</p>
                            <p><span>GPS: </span>${data.others.GPS}</p>
                            <p><span>NFC: </span>${data.others.NFC}</p>
                            <p><span>Radio: </span>${data.others.Radio}</p>
                            <p><span>USB: </span>${data.others.USB}</p>
                            <p><span>Release Date: </span>${data.releaseDate}</p>
                        </div>
                    </div>
    `
    featureSection.appendChild(div);

}