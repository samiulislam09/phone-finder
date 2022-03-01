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
            div.classList.add('col-md-3');
            div.classList.add('d-flex');
            div.classList.add('justify-content-center');
            div.classList.add('text-center');
            div.innerHTML = `
                <div class="card g-2" style="width: 90%;">
                    <img src="${item.image}" class="card-img-top" alt="${item.brand} mobile image">
                    <div class="card-body">
                        <h5 class="card-title">${item.brand}</h5>
                        <p class="card-text">${item.phone_name}</p>
                        <button class="btn btn-primary">Specification</button>
                    </div>
                </div>
    `
            cards.appendChild(div)
        }
        
        
        toggleNotFound('none');
        toggleLoading('none');
    }
    
}