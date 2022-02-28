const phoneData = () => {
    const inputFromuser = document.getElementById('name-input').value;
    const phoneName = inputFromuser.toLowerCase();
    toggleLoading('block')
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
        .then(res => res.json())
        .then(data => displayPhone(data))
    toggleNotFound('none');
}

const toggleNotFound = (input) => {
    const notFound = document.getElementById('not-found');
    notFound.style.display = input;
    
}

const toggleLoading = (input) => {
    const loading = document.getElementById('loading');
    loading.style.display = input;
}

const displayPhone = (data) => {
    const cards = document.getElementById('cards');
    cards.textContent = '';
    toggleNotFound('none')
    
    if (data.status == false) {
        toggleNotFound('block');
        toggleLoading('none');
    } else {
        for (let item of data.data) {
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
                        </div>
                    </div>
        `
            cards.appendChild(div)
        }
        toggleLoading('none')
    }
    


}