const express = require('express');
const app = express();
const path = require('path');
const { fetchAllCats, adoptCat, unAdoptCat, getBreeds, getSingleCat, deleteCat, addCat, seed } = require('./controllers/controllers');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/seed', seed);

app.get('/breeds', getBreeds);

app.get('/allCats', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/allCats', 'allCats.html'));
});

app.get('/manage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/manage', 'manage.html'));
});

app.get('/manage/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/createCat', 'createCat.html'));
});

app.get('/getSingleCat/:id', getSingleCat);

// post
app.post('/addCat/', addCat);

app.get('/fetchAllCats/:breedId', fetchAllCats);

app.put('/adoptCat', adoptCat);
app.put('/unAdoptCat', unAdoptCat);

// del
app.delete('/deleteCat/:id', deleteCat);





app.listen(4040, () => {
  console.log('Server is running on port 4040');
});