/* eslint-disable no-await-in-loop */
// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
// const { faker } = require("@faker-js/faker");

// Import database client
const argon = require("argon2");
const database = require("./database/client");

const env = process.env.APP_ENV;

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    const userData = [
      {
        pseudo: "noOne",
        email: "NoBody@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "Chaton_Brutal",
        email: "chaton@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "Soleil_Levant",
        email: "Soleil@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "Ulysse_31",
        email: "Ulysse@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "Big_Julius",
        email: "julius@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 1,
      },
      {
        pseudo: "RuBeat",
        email: "rubeat@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "El_Poutros",
        email: "LaPoutre@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "KoffeeMan",
        email: "kofee@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "Yax2_94",
        email: "yaya@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "Tristan",
        email: "tristan@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "Yseult",
        email: "Yseult@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "Drifer",
        email: "Drifer@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "LeoMiaou",
        email: "LeoMiaou@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "LuLu Star",
        email: "Lulustar@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "Orel One",
        email: "orel@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "Mama Seni",
        email: "MamaInes@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "BrianShine",
        email: "PrinceBrillant@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "AlexCode",
        email: "AlexCode@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "TidusLove",
        email: "Tidus@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "SelineBoss",
        email: "Celine@glouglou.fr",
        password: "toto",
        score: 0,
        admin: 0,
      },
      {
        pseudo: "admin",
        email: "admin@glouglou.fr",
        password: "root",
        score: 0,
        admin: 1,
      },
    ];

    const hashingOptions = {
      type: argon.argon2id,
      memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
      timeCost: 2,
      parallelism: 1,
    };

    for (let i = 0; i < userData.length; i += 1) {
      const element = userData[i];
      // try {
      const hash = await argon.hash(element.password, hashingOptions);
      element.password = hash;
      console.info(element);
      queries.push(
        database.query(
          "INSERT INTO user (pseudo, email, password,  score, admin) VALUES (?, ?, ?, ?, ?)",
          [
            element.pseudo,
            element.email,
            element.password,
            element.score,
            element.admin,
          ]
        )
      );
      // } catch (error) {
      //   console.info(error);
      // }
    }
    const imageBaseUrl =
      env === "production"
        ? `https://streetarthunterz.creativebrain.fr/upload`
        : `http://localhost:3310/upload`;

    const LocationData = [
      {
        id: 1,
        name: "Paris 19",
        description:
          "Walk in the footsteps of the Ourcq Living Colors festival! Along the way, discover or rediscover the artistic interventions, murals and collaborations that give color to this neighborhood.",
        image: `${imageBaseUrl}/20231210_143137.jpg`,
        postalcode: "75019",
        lat: 48.89175015143691,
        lng: 2.3788867298701146,
      },
      {
        id: 2,
        name: "Paris 20",
        description:
          "Discover the history and culture of Parisian graffiti in the 20th arrondissement of Paris, in the working-class neighborhoods of Belleville and Ménilmontant, ideal places of expression for urban art forms.",
        image: `${imageBaseUrl}/20231203_143211.jpg`,
        postalcode: "75020",
        lat: 48.8714105286253,
        lng: 2.385479117902744,
      },
      {
        id: 3,
        name: "Paris 13",
        description:
          "Around the Place d'Italie, tall towers create a very different panorama of Paris's 13th arrondissement. It's here that the Mairie d'arrondissement, in collaboration with the Itinerrance gallery, has allowed some one hundred world-renowned artists to cover huge murals, creating a veritable open-air museum dedicated to contemporary street art and neo-muralism, a titanic project still underway along line 6 of the aerial metro",
        image: `${imageBaseUrl}/20190215_171407.jpg`,
        postalcode: "75013",
        lat: 48.83436492769952,
        lng: 2.3671333353492297,
      },
      {
        id: 4,
        name: "Aubervilliers 93",
        description:
          "In Aubervilliers, right there, at the gateway to Paris, along the Canal Saint Denis, under the bridge over the ring road, you'll find clattering blazes, extremely intricate acid graffiti, a portrait gallery created with a gentle touch... humor and, above all, a concentration of Urban Art the likes of which are rarely seen in Paris or even on the outskirts.",
        image: `${imageBaseUrl}/20231209_124929.jpg`,
        postalcode: "93300",
        lat: 48.90064201041082,
        lng: 2.3812254089234743,
      },
    ];

    for (let i = 0; i < LocationData.length; i += 1) {
      const element = LocationData[i];
      // try {
      queries.push(
        database.query(
          "INSERT INTO location (id, name, description, image, postalcode, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            element.id,
            element.name,
            element.description,
            element.image,
            element.postalcode,
            element.lat,
            element.lng,
          ]
        )
      );
      // } catch (error) {
      //   console.info(error);
      // }
    }
    const ArtistData = [
      {
        pseudo: "space invader",
      },
      {
        pseudo: "toto",
      },
      {
        pseudo: "sohan STREET",
      },
      {
        pseudo: "Peodrô!",
      },
      {
        pseudo: "Yarps",
      },
      {
        pseudo: "le Long",
      },
      {
        pseudo: "Meton Joffily",
      },
      {
        pseudo: "Jack Ardi",
      },
      {
        pseudo: "Warch RestA",
      },
      {
        pseudo: "Mister Topy",
      },
      {
        pseudo: "Lasky",
      },
      {
        pseudo: "Peak LHS",
      },
      {
        pseudo: "Nô",
      },
      {
        pseudo: "SkiQ",
      },
      {
        pseudo: "Dacruz",
      },
    ];

    for (let i = 0; i < ArtistData.length; i += 1) {
      const element = ArtistData[i];
      // try {
      queries.push(
        database.query("INSERT INTO artist(pseudo) VALUES (?)", [
          element.pseudo,
        ])
      );
      // } catch (error) {
      //   console.info(error);
      // }
    }

    const WorksData = [
      {
        latitude: 48.87261592246546,
        longitude: 2.376940626111713,
        image: `${imageBaseUrl}/20231203_141600.jpg`,
        User_id: 12,
        isValidate: 1,
        location_id: 2,
      },
      {
        latitude: 48.87230041050758,
        longitude: 2.378009470964975,
        image: `${imageBaseUrl}/20231203_142006.jpg`,
        User_id: 2,
        isValidate: 1,
        location_id: 2,
      },
      {
        latitude: 48.872165897007264,
        longitude: 2.378325264218084,
        image: `${imageBaseUrl}/20231203_142530.jpg`,
        User_id: 3,
        isValidate: 1,
        location_id: 2,
      },
      {
        latitude: 48.872165897007264,
        longitude: 2.378325264218084,
        image: `${imageBaseUrl}/20231203_142754.jpg`,
        User_id: 6,
        isValidate: 1,
        location_id: 2,
      },
      {
        latitude: 48.871791309905255,
        longitude: 2.3783732507242994,
        image: `${imageBaseUrl}/20231203_143211.jpg`,
        User_id: 2,
        isValidate: 1,
        location_id: 2,
      },
      {
        latitude: 48.87161068260341,
        longitude: 2.3833862942978747,
        image: `${imageBaseUrl}/20231203_145223.jpg`,
        User_id: 4,
        isValidate: 1,
        location_id: 2,
      },
      {
        latitude: 48.87170922438371,
        longitude: 2.3850364414532743,
        image: `${imageBaseUrl}/20231203_151236.jpg`,
        User_id: 3,
        isValidate: 1,
        location_id: 2,
      },
      {
        latitude: 48.87165035798295,
        longitude: 2.3854193494781155,
        image: `${imageBaseUrl}/20231203_151510.jpg`,
        User_id: 12,
        isValidate: 1,
        location_id: 2,
      },
      {
        latitude: 48.87163394632029,
        longitude: 2.3878806011032543,
        image: `${imageBaseUrl}/20231203_152225.jpg`,
        User_id: 4,
        isValidate: 1,
        location_id: 2,
      },
      {
        latitude: 48.869604502535275,
        longitude: 2.3886531687675516,
        image: `${imageBaseUrl}/20231203_153148.jpg`,
        User_id: 3,
        isValidate: 1,
        location_id: 2,
      },
      {
        latitude: 48.868707344411035,
        longitude: 2.389578484789551,
        image: `${imageBaseUrl}/20231203_164644.jpg`,
        User_id: 4,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.898750241615424,
        longitude: 2.3823250071999387,
        image: `${imageBaseUrl}/20231209_124017.jpg`,
        User_id: 6,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.89912438988054,
        longitude: 2.3821234804132336,
        image: `${imageBaseUrl}/20231209_124153.jpg`,
        User_id: 6,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.90064201041082,
        longitude: 2.3812254089234743,
        image: `${imageBaseUrl}/20231209_124609.jpg`,
        User_id: 12,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.90064201041082,
        longitude: 2.3812254089234743,
        image: `${imageBaseUrl}/20231209_124642.jpg`,
        User_id: 2,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.90111454447136,
        longitude: 2.3810108322153307,
        image: `${imageBaseUrl}/20231209_124929.jpg`,
        User_id: 12,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.9048060091657,
        longitude: 2.3791816927171663,
        image: `${imageBaseUrl}/20231209_130034.jpg`,
        User_id: 4,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.90483312775923,
        longitude: 2.37874001133035,
        image: `${imageBaseUrl}/20231209_130053.jpg`,
        User_id: 4,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.9047641327675,
        longitude: 2.379695019756964,
        image: `${imageBaseUrl}/20231209_130147.jpg`,
        User_id: 5,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.90475050466249,
        longitude: 2.3798816173152173,
        image: `${imageBaseUrl}/20231209_130215.jpg`,
        User_id: 2,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.90474735971466,
        longitude: 2.379942221650376,
        image: `${imageBaseUrl}/20231209_130347.jpg`,
        User_id: 2,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.90473058665615,
        longitude: 2.3801256295067783,
        image: `${imageBaseUrl}/20231209_130553.jpg`,
        User_id: 6,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.90472953833983,
        longitude: 2.3802053720530405,
        image: `${imageBaseUrl}/20231209_130652.jpg`,
        User_id: 6,
        isValidate: 1,
        location_id: 4,
      },
      {
        latitude: 48.889474940810416,
        longitude: 2.388042805483453,
        image: `${imageBaseUrl}/20231210_141824.jpg`,
        User_id: 5,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.8889782496703,
        longitude: 2.38692731018003,
        image: `${imageBaseUrl}/20231210_142701.jpg`,
        User_id: 3,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.888805298533676,
        longitude: 2.386240553206446,
        image: `${imageBaseUrl}/20231210_143012.jpg`,
        User_id: 6,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.888805298533676,
        longitude: 2.386240553206446,
        image: `${imageBaseUrl}/20231210_143031.jpg`,
        User_id: 20,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.88876165132823,
        longitude: 2.3860414093593407,
        image: `${imageBaseUrl}/20231210_143137.jpg`,
        User_id: 5,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.88989855654966,
        longitude: 2.382893386908322,
        image: `${imageBaseUrl}/20231210_144731.jpg`,
        User_id: 6,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.890223945336984,
        longitude: 2.38385455802745,
        image: `${imageBaseUrl}/20231210_144909.jpg`,
        User_id: 12,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.88761235483157,
        longitude: 2.3790936791222546,
        image: `${imageBaseUrl}/20231210_145717.jpg`,
        User_id: 6,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.887539604020944,
        longitude: 2.3790112012000617,
        image: `${imageBaseUrl}/20231210_150219.jpg`,
        User_id: 12,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.88661618726782,
        longitude: 2.377514924895603,
        image: `${imageBaseUrl}/20231210_150935.jpg`,
        User_id: 7,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.88475574233888,
        longitude: 2.374452739414084,
        image: `${imageBaseUrl}/20231210_151217.jpg`,
        User_id: 12,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.88439156928188,
        longitude: 2.3749212016067967,
        image: `${imageBaseUrl}/20231210_145852.jpg`,
        User_id: 7,
        isValidate: 1,
        location_id: 1,
      },
      {
        latitude: 48.834286216214046,
        longitude: 2.366804147149494,
        image: `${imageBaseUrl}/20190215_170341.jpg`,
        User_id: 13,
        isValidate: 1,
        location_id: 3,
      },
      {
        latitude: 48.83436492769952,
        longitude: 2.3671333353492297,
        image: `${imageBaseUrl}/20190215_170250.jpg`,
        User_id: 4,
        isValidate: 1,
        location_id: 3,
      },
      {
        latitude: 48.83320817966546,
        longitude: 2.363505639603704,
        image: `${imageBaseUrl}/20190215_171030.jpg`,
        User_id: 4,
        isValidate: 1,
        location_id: 3,
      },
      {
        latitude: 48.832630794005944,
        longitude: 2.362112737230416,
        image: `${imageBaseUrl}/20190215_171407.jpg`,
        User_id: 3,
        isValidate: 1,
        location_id: 3,
      },
      {
        latitude: 48.832742026249676,
        longitude: 2.3625499372732586,
        image: `${imageBaseUrl}/20190215_171800.jpg`,
        User_id: 4,
        isValidate: 1,
        location_id: 3,
      },
      {
        latitude: 48.88687427677575,
        longitude: 2.3713696689292867,
        image: `${imageBaseUrl}/20180627_194907.jpg`,
        User_id: 13,
        isValidate: 0,
        location_id: 1,
      },
      {
        latitude: 48.84833516812926,
        longitude: 2.342719026186191,
        image: `${imageBaseUrl}/20180627_193655.jpg`,
        User_id: 8,
        isValidate: 1,
        location_id: 3,
      },
      {
        latitude: 48.859282626640265,
        longitude: 2.351661470964935,
        image: `${imageBaseUrl}/20180627_164855.jpg`,
        User_id: 13,
        isValidate: 1,
      },
      {
        latitude: 48.85125990140719,
        longitude: 2.3399041299192618,
        image: `${imageBaseUrl}/20210915_163631.jpg`,
        User_id: 5,
        isValidate: 1,
      },
      {
        latitude: 48.876689537895835,
        longitude: 2.35607815312111,
        image: `${imageBaseUrl}/20210320_163307.jpg`,
        User_id: 19,
        isValidate: 0,
        location_id: 3,
      },
    ];

    for (let i = 0; i < WorksData.length; i += 1) {
      const element = WorksData[i];
      // try {
      queries.push(
        database.query(
          "INSERT INTO work(latitude,longitude,image,User_id,isValidate,location_id ) VALUES (?,?,?,?,?,?)",
          [
            element.latitude,
            element.longitude,
            element.image,
            element.User_id,
            element.isValidate,
            element.location_id,
          ]
        )
      );
      // } catch (error) {
      //   console.info(error);
      // }
    }

    const ArtistWorkData = [
      {
        artist_id: 3,
        work_id: 1,
      },
      {
        artist_id: 4,
        work_id: 2,
      },
      {
        artist_id: 5,
        work_id: 3,
      },
      {
        artist_id: 7,
        work_id: 4,
      },
      {
        artist_id: 15,
        work_id: 5,
      },
      {
        artist_id: 1,
        work_id: 10,
      },
      {
        artist_id: 2,
        work_id: 11,
      },
      {
        artist_id: 6,
        work_id: 13,
      },
      {
        artist_id: 8,
        work_id: 17,
      },
      {
        artist_id: 9,
        work_id: 20,
      },
      {
        artist_id: 10,
        work_id: 21,
      },
      {
        artist_id: 11,
        work_id: 22,
      },
      {
        artist_id: 12,
        work_id: 26,
      },
      {
        artist_id: 13,
        work_id: 27,
      },
      {
        artist_id: 6,
        work_id: 28,
      },
      {
        artist_id: 14,
        work_id: 29,
      },
      {
        artist_id: 6,
        work_id: 30,
      },
      {
        artist_id: 14,
        work_id: 31,
      },
      {
        artist_id: 3,
        work_id: 33,
      },
    ];
    for (let i = 0; i < ArtistWorkData.length; i += 1) {
      const element = ArtistWorkData[i];
      // try {
      queries.push(
        database.query(
          "INSERT INTO artist_work(artist_id,work_id ) VALUES (?,?)",
          [element.artist_id, element.work_id]
        )
      );
      // } catch (error) {
      //   console.info(error);
      // }
    }
    // Generating Seed Data

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Execute the UPDATE query
    await database.query(`
    UPDATE user AS u
    JOIN (
      SELECT User_id, COUNT(*) * 100 AS new_score
      FROM work
      WHERE isValidate = 1
      GROUP BY User_id
    ) AS works_count ON u.id = works_count.User_id
    SET u.score = u.score + works_count.new_score
  `);

    // Execute the SELECT query to get updated user data
    const users = await database.query("SELECT * FROM user");
    console.info("Updated user data:", users);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
