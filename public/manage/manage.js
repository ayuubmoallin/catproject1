const mainContainer = document.getElementsByClassName("container")[0];

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
              <button class="button" onClick="deleteCat(${cat.id})">Delete</button>
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
              <button class="button-adopted" onClick="unAdoptCat(${cat.id})">UnAdopt</button>
              <button class="button" onClick="deleteCat(${cat.id})">Delete</button>
            </div>
        </div>
      `;
};

const unAdoptCat = async (id) => {
    showLoading();
    axios.put('http://localhost:4040/unAdoptCat', { id }).then(() => {
        getAllCats();
    });

}

const deleteCat = async (id) => {
    showLoading();
    axios.delete(`http://localhost:4040/deleteCat/${id}`).then(() => {
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



function closeDialog() {
    const dialog = document.getElementById('dialog');
    const dialogContent = document.getElementById('dialogContent');
    dialog.style.display = "none"
}

getAllCats()