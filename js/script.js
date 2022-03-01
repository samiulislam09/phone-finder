document.getElementById('loading').style.display = "none";
// fetch data
const phoneData = () => {
    const inputFromuser = document.getElementById('name-input').value;
    const phoneName = inputFromuser.toLowerCase();
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
        .then(res => res.json())
        .then(data => displayPhone(data))
    toggleLoading('block')
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
        toggleLoading('none')
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
            showMore.style.display = 'block'
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
}
// phone spec detail section
const specDetails = (data) => {
    console.log(data.brand);
    const featureSection = document.getElementById('feature');
    const div = document.createElement('div');
    featureSection.textContent = '';
    div.classList.add('feature')
    div.innerHTML = `
    <h3 class="text-center m-3">Details</h3>
        <div class="row">
                        <div class="col-md-12 text-center"><img src="https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg" alt=""></div>
                        <div class="col-md-12 my-3">
                            <h3>Brand name: ${data.brand}</h3>
                            <h3>model: ${data.name}</h3>
                        </div>
                    </div>
                    <!-- specification container -->
                    <div class="row features">
                        <div class="col col-md-12">
                            <h2 class="text-center m-2">Features</h2>
                            <p><span>Chipset: </span>chipset information</p>
                            <p><span>Storsge: </span>Storage</p>
                            <p><span>Display Size: </span>Display</p>
                            <p><span>Memory: </span>memory</p>
                            <p><span>Sensors: </span>sensors</p>
                            <p><span>Others: </span>others</p>
                            <p><span>Release Date: </span>release date</p>
                        </div>
                    </div>
    `
    featureSection.appendChild(div);

}