const nodeFetch = require('node-fetch'),
	cheerio = require('cheerio'),
	stringSimilarity = require('string-similarity');

function fetch(url) {
	return nodeFetch('https://www.dicio.com.br' + url).then(res => res.text());
}

module.exports = q =>
	fetch(
		'/pesquisa.php?' +
			new URLSearchParams({
				q
			})
	).then(response => {
		const $ = cheerio.load(response),
			urls = $('#wrapper > .container a')
				.map((i, e) => e.attribs.href)
				.get(),
			url = stringSimilarity.findBestMatch(q, urls).bestMatch.target;
		return fetch(url).then(res => {
			const $$ = cheerio.load(res);
			return {
				word: $$('h1[itemprop="name"]').text(),
				definition: $$(`.sg-social`).attr('data-text'),
				url,
				urls
			};
		});
	});
