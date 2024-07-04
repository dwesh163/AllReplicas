$(document).ready(function () {
	$('#input').on('input', async function () {
		var inputValue = $('#input').val().toUpperCase(); // Convertir en majuscules pour la recherche insensible à la casse

		try {
			// Récupérer les données une seule fois au chargement de la page
			const [dataText, dataPeople] = await Promise.all([fetchData('text.json'), fetchData('people.json')]);

			$('.grid').html(''); // Effacer le contenu précédent

			let isIn = false;

			for (const episode in dataText) {
				let episodeData = dataText[episode];
				let episodeTitle = episode;
				let episodeNumber = episodeData['id'].toString().split('.')[1];
				let bookNumber = episodeData['id'].toString().split('.')[0];

				let article = `
                    <div class="episode bg-white rounded-md p-4 shadow-md">
                        <h1 class="text-xl font-bold mb-2">${episodeTitle}</h1>
                        <div class="episode-details flex justify-between text-sm text-gray-600">
                            <div>Episode ${episodeNumber}</div>
                            <div>Livre ${bookNumber}</div>
                        </div>
                `;

				episodeData['text'].forEach((line) => {
					let lineText = line[0];
					let linePeople = line[1];

					if (lineText.toUpperCase().includes(inputValue)) {
						isIn = true;

						let peopleList = '';

						if (Array.isArray(linePeople)) {
							peopleList = linePeople.map((personId) => dataPeople[personId]['firstname']).join(', ');
						} else {
							peopleList = dataPeople[linePeople]['firstname'];
						}

						article += `
                            <div class="line mt-2">
                                <h4 class="font-medium">${lineText}</h4>
                                <h6>${peopleList}</h6>
                            </div>
                        `;
					}
				});

				article += `</div>`; // Fermeture de l'article

				if (isIn) {
					$('.grid').append(article);
				}

				isIn = false;
			}
		} catch (error) {
			console.error('Erreur lors de la récupération des données :', error);
		}
	});
});

async function fetchData(name) {
	try {
		// Vérifier si les données sont déjà en cache dans localStorage
		let cachedData = localStorage.getItem(name);
		if (cachedData) {
			return JSON.parse(cachedData);
		}

		// Si les données ne sont pas en cache, les récupérer via fetch
		const response = await fetch(name);
		const data = await response.json();

		// Stocker les données en cache dans localStorage pour une utilisation ultérieure
		localStorage.setItem(name, JSON.stringify(data));
		return data;
	} catch (error) {
		console.error('Erreur lors de la récupération des données :', error);
		throw error;
	}
}
