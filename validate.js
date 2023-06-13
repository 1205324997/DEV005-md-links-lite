const axios = require('axios');

const validateLinks = (links) => {
  const linksPromise = links.map((link) =>
    axios
      .head(link.href)
      .then((response) => ({
        ...link,
        status: response.status,
        ok: response.status >= 200 && response.status < 400,
      }))
      .catch(() => ({
        ...link,
        status: 404,
        ok: false,
      }))
  );

  return Promise.all(linksPromise);
};

module.exports = {
  validateLinks,
};