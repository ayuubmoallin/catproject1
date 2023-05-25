
require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const catImages = [
  "cat-tile1.jpg",
  "cat-tile2.jpg",
  "cat-tile3.jpg",
  "cat-tile4.jpg",
  "cat-tile5.jpg",
  "cat-tile6.jpg",
  "cat-tile7.jpg",
  "cat-tile8.jpg",
  "cat-tile9.jpg",
  "cat-tile10.jpg",
  "cat-tile11.jpg",
  "cat-tile12.jpg",
  "cat-tile13.jpg",
  "cat-tile14.jpg",
  "cat-tile15.jpg"
]

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  CONNECTION_STRING,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = {


  seed: (req, res) => {
    sequelize
      .query(
        `
        drop table if exists cats;
        drop table if exists breeds;
        
        CREATE TABLE cats (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          age INTEGER,
          color VARCHAR(255),
          image VARCHAR(255),
          description VARCHAR(255),
          breed_id INTEGER,
          is_adopted boolean DEFAULT FALSE
        );
        
        -- Create "breeds" table
        CREATE TABLE breeds (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );
        
        
        
        INSERT INTO breeds (name)
        VALUES ('Persian');
        
        INSERT INTO breeds (name)
        VALUES ('Siamese');

        INSERT INTO breeds (name)
        VALUES ('Burmese');
        
        INSERT INTO breeds (name)
        VALUES ('Scottish');

        INSERT INTO breeds (name)
        VALUES ('ShortHair');
        
        INSERT INTO breeds (name)
        VALUES ('All');
        
        
        -- Inserting cat 1
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Fluffy', 3, 'White', 'cat-tile1.jpg', 'A playful and friendly orange tabby with a soft, fluffy coat. Loves chasing laser pointers and cuddling on your lap', 1);
        
        -- Inserting cat 2
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Whiskers', 5, 'Tabby', 'cat-tile2.jpg', 'A sleek black cat with mesmerizing green eyes. Enjoys exploring high places', 1);
        
        -- Inserting cat 3
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Smokey', 2, 'Gray', 'cat-tile3.jpg', 'An elegant Siamese cat with striking blue eyes and distinctive dark markings. Known for being intelligent, vocal, and a great companion', 2);
        
        -- Inserting cat 4
        INSERT INTO cats (name, age, color, image, description, breed_id, is_adopted)
        VALUES ('Mittens', 4, 'Calico', 'cat-tile4.jpg', 'A ginger and white cat with a mischievous personality. Always up for adventure and has a knack for getting into amusing situations', 3, true);
        
        -- Inserting cat 5
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Simba', 1, 'Orange', 'cat-tile5.jpg', 'A graceful calico cat with a gentle demeanor. Enjoys sunbathing by the window and is an expert at catching toy mice', 1);
        
        -- Inserting cat 6
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Luna', 3, 'Black', 'cat-tile6.jpg', 'A playful tuxedo cat with a charming personality. Loves interactive toys and can entertain you for hours with his anticst', 4);
        
        -- Inserting cat 7
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Oliver', 2, 'Tabby', 'cat-tile7.jpg', 'An elegant Siamese cat with striking blue eyes and distinctive dark markings. Known for being intelligent, vocal, and a great companion', 1);
        
        -- Inserting cat 8
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Bella', 4, 'Calico', 'cat-tile8.jpg', 'A ginger and white cat with a mischievous personality. Always up for adventure and has a knack for getting into amusing situations', 2);
        
        
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Ginger', 2, 'Tabby', 'cat-tile9.jpg', 'An elegant Siamese cat with striking blue eyes and distinctive dark markings. Known for being intelligent, vocal, and a great companion', 3);
        
        -- Inserting cat 8
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Prince', 4, 'Calico', 'cat-tile10.jpg', 'A ginger and white cat with a mischievous personality. Always up for adventure and has a knack for getting into amusing situations', 5);
        
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Kiddo', 2, 'Tabby', 'cat-tile11.jpg', 'An elegant Siamese cat with striking blue eyes and distinctive dark markings. Known for being intelligent, vocal, and a great companion', 1);
        
        -- Inserting cat 8
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Pinky', 4, 'Calico', 'cat-tile12.jpg', 'A ginger and white cat with a mischievous personality. Always up for adventure and has a knack for getting into amusing situations', 5);
        
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Riley', 2, 'Tabby', 'cat-tile13.jpg', 'An elegant Siamese cat with striking blue eyes and distinctive dark markings. Known for being intelligent, vocal, and a great companion', 1);
        
        -- Inserting cat 8
        INSERT INTO cats (name, age, color, image, description, breed_id)
        VALUES ('Mano', 4, 'Calico', 'cat-tile14.jpg', 'A ginger and white cat with a mischievous personality. Always up for adventure and has a knack for getting into amusing situations', 2);
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.send("Db seeded");
      })
      .catch((err) => console.log("error seeding DB", err));
  },

  fetchAllCats: (req, res) => {
    const breed_id = req.params.breedId
    if (breed_id == 6) {
      sequelize.query(`select * from cats`).then((cats) => {
        return res.status(200).send(cats[0]);
      });
      return;
    }
    sequelize.query(`select * from cats where breed_id=${breed_id} ORDER BY id`).then((cats) => {
      return res.status(200).send(cats[0]);
    });
  },

  getSingleCat: (req, res) => {
    const id = req.params.id

    sequelize.query(`SELECT cats.id, cats.name, cats.description, cats.image, cats.description, breeds.name AS breed
                      FROM cats
                      INNER JOIN breeds ON cats.breed_id = breeds.id
                     WHERE cats.id = ${id};`).then((cats) => {
      return res.status(200).send(cats[0]);
    });
  },

  addCat: (req, res) => {
    const { name, age, description, breed, color } = req.body;
    const image = pickRandomFromArray(catImages)
    sequelize.query(`INSERT INTO cats (name, age, color, image, description, breed_id) VALUES ('${name}', ${Number.parseInt(age)}, '${color}', '${image}', '${description}', ${breed});`).then((cat) => {
      return res.status(200).send(cat);
    });
  },


  adoptCat: (req, res) => {
    const cat_id = req.body.id;
    sequelize.query(`UPDATE cats set is_adopted=true where id=${cat_id}`).then(() => {
      return res.sendStatus(200);
    });
  },

  unAdoptCat: (req, res) => {
    const cat_id = req.body.id;
    sequelize.query(`UPDATE cats set is_adopted=false where id=${cat_id}`).then(() => {
      return res.sendStatus(200);
    });
  },
  deleteCat: (req, res) => {
    const cat_id = req.params.id;
    sequelize.query(`DELETE FROM cats where id=${cat_id}`).then(() => {
      return res.sendStatus(200);
    });
  },
  getBreeds: (req, res) => {
    sequelize.query(`select * from breeds ORDER BY id DESC`).then(breeds => {
      return res.status(200).send(breeds[0]);
    });
  }
}


function pickRandomFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}