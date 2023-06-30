const queries = [
  {
    query:
      "SELECT paper_title, COUNT(?) as authors_count FROM research_papers JOIN author_resarch ON research_papers.paper_id = author_resarch.paper_id JOIN authors ON author_resarch.author_id = authors.author_id GROUP BY research_papers.paper_id",
    params: ["authors.author_name"],
  },
  {
    query:
      "SELECT COUNT(DISTINCT ?) as paper_count FROM research_papers JOIN author_resarch ON research_papers.paper_id = author_resarch.paper_id  JOIN authors ON author_resarch.author_id = authors.author_id  WHERE authors.gender = ?",
    params: ["research_Papers.paper_title", "Female"],
  },
  {
    query:
      "SELECT AVG(?) as avrage_hIndex, authors.university FROM authors GROUP BY authors.university",
    params: ["authors.h_index"],
  },
  {
    query:
      "SELECT authors.university, COUNT(?) as sum_papers FROM authors JOIN author_resarch ON author_resarch.author_id = authors.author_id JOIN research_papers ON author_resarch.paper_id = research_papers.paper_id GROUP BY ?",
    params: ["research_Papers.paper_title", "university"],
  },
  {
    query:
      "SELECT MIN(?) as min_hIndex, MAX(?) as max_hIndex, authors.university FROM authors GROUP BY university",
    params: ["authors.h_index", "authors.h_index"],
  },
];

const queries2 = [
  "SELECT a1.author_name, a2.author_name as mentor_name FROM authors a1 LEFT JOIN authors a2 ON a1.mentor = a2.author_id",
  "SELECT authors.*, research_papers.paper_title FROM authors JOIN author_resarch ON authors.author_id = author_resarch.author_id LEFT JOIN research_Papers ON author_resarch.paper_id = research_Papers.paper_id",
];

module.exports = { queries, queries2 };
