const form = document.querySelector('form')
const nameInput = document.querySelector('#name')
const ageInput = document.querySelector('#age')
const colorInput = document.querySelector('#color')
const descriptionInput = document.querySelector('#description')
const breedsInput = document.querySelector('#breeds')
const submitButton = document.querySelector('#submit')




const showLoading = () => {
    submitButton.textContent = "Loading"
}
const removeLoading = () => {
    submitButton.textContent = "Submit"
}

function addCat(e) {
    e.preventDefault()
    showLoading();
    let body = {
        name: nameInput.value, 
        age: ageInput.value, 
        color: colorInput.value,
        breed: breedsInput.value,
        description: descriptionInput.value
    }

    axios.post('http://localhost:4040/addCat', body)
        .then(() => {
            window.location.href = "/allCats"
        })
}

form.addEventListener('submit', addCat)
