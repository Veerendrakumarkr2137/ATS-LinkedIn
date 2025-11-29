const getKeywords = (title) => {
  const base = {
    "full stack developer": ["javascript","react","node","mongodb","express","api","rest"],
    "frontend developer": ["html","css","javascript","react","redux"],
    "backend developer": ["node","express","mongodb","rest","api"],
  };

  return base[title?.toLowerCase()] || ["javascript","react","node","api"];
};

const scoreText = (text, jobTitle) => {
  const keywords = getKeywords(jobTitle);
  const lower = text.toLowerCase();

  let matchCount = 0;
  keywords.forEach(k => {
    if (lower.includes(k)) matchCount++;
  });

  const score = Math.round((matchCount / keywords.length) * 100);

  const suggestions = keywords
    .filter(k => !lower.includes(k))
    .map(k => `Try adding "${k}" if relevant.`);

  return {
    score,
    breakdown: { keywords, matchCount },
    suggestions
  };
};

module.exports = { scoreText };
