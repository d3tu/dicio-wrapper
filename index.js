const fetch = require('node-fetch').default,
  cheerio = require('cheerio'),
  equal = require('string-similarity'),
  URL = 'https://www.dicio.com.br';
module.exports = (q = '') => {
  if (!q || typeof q != 'string') throw new Error('the first argument is not a string');
  return fetch(`${URL}/pesquisa.php?${new URLSearchParams({ q })}`)
    .then(res => res.text()).then(res => {
      let $ = cheerio.load(res),
        urls = $('#wrapper > .container a').map((_, e) => e.attribs.href).get(),
        url = equal.findBestMatch(q, urls);
      return fetch(URL + url).then(res => res.json()).then(res => {
        $ = cheerio.load(res);
        return {
          word: $$('h1[itemprop="name"]').text(),
          definition: $$(`.sg-social`).attr('data-text'),
	  url, urls
        };
      });
    });
};
