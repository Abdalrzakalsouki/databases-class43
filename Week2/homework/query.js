const queries = [
  {
    query:
      "SELECT research_Papers.*, COUNT(?) FROM research_Papers INNER JOIN authors ON authors.author_id = research_Papers.paper_id GROUP BY research_Papers.paper_id ORDER BY COUNT(authors.author_name) DESC",
    params: ["authors.author_name"],
  },
  {
    query:
      "SELECT COUNT(?) AS Totall_papers FROM research_Papers JOIN authors ON authors.author_id = research_Papers.paper_id WHERE authors.gender = ?",
    params: ["research_Papers.paper_title", "Female"],
  },
  {
    query:
      "SELECT AVG(?) AS H_AVG, university FROM authors GROUP BY university",
    params: ["authors.h_index"],
  },
  {
    query:
      "SELECT COUNT(?) AS Papers_AVG FROM research_Papers JOIN authors ON authors.author_id = research_Papers.paper_id GROUP BY ?",
    params: ["research_Papers.paper_title", "university"],
  },
  {
    query:
      "SELECT MIN(?) AS H_MIN, MAX(?) AS H_MIN, university FROM authors GROUP BY university",
    params: ["authors.h_index", "authors.h_index"],
  },
];

const queries2 = [
  "SELECT author_name, mentor FROM authors",
  "SELECT authors.*, research_Papers.paper_title FROM authors LEFT JOIN research_Papers ON authors.author_id = research_Papers.paper_id",
];

module.exports = { queries, queries2 };
