const kyesFields = [
  "author_id INT NOT NULL AUTO_INCREMENT, author_name VARCHAR(50), university VARCHAR(50), date_of_birth DATE, h_index INT, gender VARCHAR(50), PRIMARY KEY(author_id)",
];

const realtionFieldsType = [
  "paper_id INT NOT NULL AUTO_INCREMENT, paper_title VARCHAR(50), conference INT, publish_date DATE, PRIMARY KEY(paper_id)",
];

const realtionFields = ["paper_title, conference, publish_date"];
const authorFields = [
  "author_name",
  "university",
  "date_of_birth",
  "h_index",
  "gender",
  "mentor",
];

const junctionFieldsType = [
  "author_id INT NOT NULL, paper_id INT NOT NULL, FOREIGN KEY (author_id) REFERENCES authors (author_id), FOREIGN KEY (paper_id) REFERENCES research_Papers (paper_id)",
];

const junctionFields = ["author_id, paper_id"];

const authorsData = [
  [
    ["Germ Daniels", "University of the South", "1952-12-02", 23, "Male", 1],
    ["Wilhelmus Kaijser", "Carleton College", "1955-05-06", 12, "Male", 2],
    ["Gwen Zwiep", "University of Texas, Austin", "2018-07-07", 24, "Male", 3],
    ["Hodan Berkelaar", "University of Georgia", "1994-05-16", 124, "Male", 4],
    ["Janey Hellemons", "Pomona College", "2017-12-11", 1224, "Male", 5],
    ["Janey Hellemons", "Macalester College", "1959-03-16", 535, "Male", 6],
    ["Jaafar Winters", "University of Richmond", "1974-04-02", 635, "Male", 7],
    [
      "Jalisa Rath",
      "University of California, Santa Barbara",
      "1973-09-22",
      233,
      "Male",
      8,
    ],
    [
      "Elleke van der Pluijm",
      "Haverford College",
      "1959-05-07",
      2312,
      "Male",
      9,
    ],
    [
      "Hiske Stoppelenburg",
      "Haverford College",
      "1954-08-29",
      5325,
      "Female",
      10,
    ],
    ["Angélique Paulus", "Haverford College", "1997-04-03", 243, "Female", 11],
    [
      "Yasmina Oosterbaan",
      "Vanderbilt University",
      "1954-01-08",
      235,
      "Female",
      12,
    ],
    ["Hendrina Denekamp", "Smith College", "1957-06-18", 364, "Female", 13],
    ["Yoël Helder", "Smith College", "1949-04-25", 754, "Female", 14],
    ["Lenne van Ee", "Smith College", "1973-07-30", 765, "Female", 15],
  ],
];

const papersData = [
  [
    ["Whispering Twins", 1, "2022/01/19"],
    ["The Living Voyagers", 2, "2003/05/22"],
    ["Vision of Night", 3, "1966/08/28"],
    ["The Hunter's Lights", 4, "1998/08/01"],
    ["The Darkness of the Force", 5, "1961/05/07"],
    ["Legend in the Dreams", 23, "1969/05/05"],
    ["Ravaged Swords", 21, "1953/07/25"],
    ["The Lost Snake", 12, "1957/01/30"],
    ["Son of Scent", 734, "1956/12/07"],
    ["The Thought's Memory", 122, "1994/01/06"],
    ["The Woman of the Sparks", 1224, "1947/08/13"],
    ["Tales in the World", 2423, "1978/05/26"],
    ["Wanton Storms", 2132, "2001/02/15"],
    ["The Silver Bridges", 252, "1975/02/09"],
    ["Alien in the Dreams", 123, "2018/05/02"],
    ["Black Woman", 1, "2022/01/19"],
    ["The Dwindling Slaves", 2, "2003/05/22"],
    ["Souls of Eye", 3, "1966/08/28"],
    ["The Scent's Birch", 4, "1998/08/01"],
    ["The Son of the Guardian", 5, "1961/05/07"],
    ["Pirates in the Planet", 23, "1969/05/05"],
    ["The Rough Windows", 21, "1953/07/25"],
    ["Sparks of Truth", 12, "1957/01/30"],
    ["The Death's Stream", 734, "1956/12/07"],
    ["The Secret of the Moons", 122, "1994/01/06"],
    ["Wizards in the Wizard", 1224, "1947/08/13"],
    ["Last Guardian", 2423, "1978/05/26"],
    ["The Dwindling Ashes", 2132, "2001/02/15"],
    ["Healer of Serpent", 252, "1975/02/09"],
    ["The Stone's Wife", 123, "2018/05/02"],
  ],
];

authorPaperAssociations = [
  [1, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [2, 1],
  [3, 6],
  [4, 7],
  [4, 1],
  [4, 2],
  [5, 1],
  [5, 8],
  [5, 2],
  [6, 8],
  [6, 9],
  [6, 10],
  [7, 1],
  [7, 5],
  [7, 11],
  [7, 12],
  [8, 4],
  [8, 13],
  [8, 7],
  [8, 8],
  [9, 1],
  [9, 14],
  [1, 6],
  [10, 15],
  [10, 16],
  [10, 17],
  [10, 18],
  [10, 19],
  [10, 20],
  [11, 20],
  [12, 21],
  [12, 22],
  [12, 23],
  [13, 16],
  [13, 17],
  [13, 24],
  [14, 25],
  [14, 26],
  [14, 27],
  [14, 28],
  [14, 1],
  [15, 29],
  [15, 30],
  [15, 17],
];

const queries = [
  {
    query: "SELECT Name FROM country WHERE Population > ?",
    params: [8000000],
  },
  {
    query: "SELECT Name FROM country WHERE Name LIKE ?",
    params: ["%land%"],
  },
  {
    query: "Select Name from city WHERE Population BETWEEN ? AND ?",
    params: [500000, 1000000],
  },
  {
    query: "SELECT Name FROM country WHERE Continent= ?",
    params: ["Europe"],
  },
  {
    query: "SELECT * FROM country ORDER BY ? DESC",
    params: ["SurfaceArea"],
  },
  {
    query: "SELECT * FROM city WHERE CountryCode= ?",
    params: ["NLD"],
  },
  {
    query: "SELECT Population FROM city WHERE Name= ?",
    params: ["Rotterdam"],
  },
  {
    query: "SELECT * FROM country ORDER BY ? DESC LIMIT 10",
    params: ["SurfaceArea"],
  },
  {
    query: "SELECT * FROM city ORDER BY ? DESC LIMIT 10",
    params: ["Population"],
  },
  {
    query: "SELECT SUM(?) FROM country",
    params: ["Population"],
  },
];

module.exports = {
  kyesFields,
  realtionFieldsType,
  junctionFieldsType,
  authorsData,
  papersData,
  realtionFields,
  authorFields,
  junctionFields,
  authorPaperAssociations,
};
