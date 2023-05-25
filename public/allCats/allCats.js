const mainContainer = document.getElementsByClassName("container")[0];
const breeds = document.getElementById("breeds");

function getAllCats(breed_id = 6) {
  showLoading()
  axios.get(`http://localhost:4040/fetchAllCats/${breed_id}`)
    .then(res => {
      removeLoading();
      res.data.forEach(c => {
        const cat = c.is_adopted ? makeCatTileAdopted(c) : makeCatTile(c);
        mainContainer.innerHTML += cat;
      })
    })
}

const makeCatTile = (cat) => {
  return `
          <div class="cat-tile">
            <img src="../images/${cat.image}"/>
            <h2 class="title">${cat.name}</h2> 
            <p class="price">$100</p>
            <div class="buttons">
              <button class="button" onClick="adoptCat(${cat.id})">Adopt</button>
              <button class="button" onClick="showCatDetails(${cat.id})">View Details</button>
            </div>
        </div>
      `;
};

const makeCatTileAdopted = (cat) => {
  return `
          <div class="cat-tile">
            <img src="../images/${cat.image}"/>
            <h2 class="title">${cat.name}</h2> 
            <p class="price">$100</p>
            <div class="buttons">
              <button class="button-adopted" >Adopted</button>
              <button class="button" onClick="showCatDetails(${cat.id})">View Details</button>
            </div>
        </div>
      `;
};

const adoptCat = async (id) => {
  showLoading();
  axios.put('http://localhost:4040/adoptCat', { id }).then(() => {
    getAllCats();
  });

}

const showLoading = () => {
  const loadingButton = `<div id="loading-spinner" class="spinner"></div>`
  mainContainer.innerHTML = loadingButton;
}
const removeLoading = () => {
  const loadingButton = document.getElementById("loading-button");
  mainContainer.innerHTML = null;
}

function getBreeds() {
  showLoading()
  axios.get('http://localhost:4040/breeds')
    .then(res => {
      res.data.forEach(breed => {
        const option = document.createElement('option')
        option.setAttribute('value', breed['id'])
        option.textContent = breed.name
        breeds.appendChild(option)
      })
    }).then(() => getAllCats());
}

function filterCats() {
  const value = breeds.value;
  return getAllCats(value);
}

function showCatDetails(id) {
  axios.get(`/getSingleCat/${id}`)
    .then(res => {
      // Populate the dialog content with the fetched data
      const dialogContent = document.getElementById('dialogContent');
      const cat = res.data[0];
      dialogContent.innerHTML = `
      <div class="cat-tile">
        <img src="../images/${cat.image}"/>
        <h2 class="breed">${cat.breed}</h2>
        <h2 class="title">${cat.name}</h2>
        <p class="description">${cat.description}</p>
        <div class="buttons">
          <button class="button" onClick="closeDialog()">Back</button>
        </div>
        <button class="close-button" onclick="closeDialog()">X</button>
  </div>
      `;

      // Show the dialog
      const dialog = document.getElementById('dialog');
      dialog.style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function closeDialog() {
  const dialog = document.getElementById('dialog');
  const dialogContent = document.getElementById('dialogContent');
  dialog.style.display = "none"
}

function manage() {

  window.location.href = '/manage';

}


getBreeds()