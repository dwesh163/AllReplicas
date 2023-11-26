$(document).ready(function () {
    $('#input').on('change', async function () {
        var inputValue = $('#input').val();

        let dataText = await fetchData('text.json');
        let dataPeople = await fetchData('people.json');

        let isIn = false

        $('.container').html("")

        for (const episode in dataText) {
            let article = `<article><header style="display: flex; justify-content: space-between;"><h1>${episode}</h1><div style="display: flex;"><h3>Episode ${dataText[episode]["id"].toString().split(".")[1]}</h3><h5>Livre ${dataText[episode]["id"].toString().split(".")[0]}</div></h5></header>`
            for (const line of dataText[episode]["text"]) {
                if ((line[0].toUpperCase()).includes(inputValue.toUpperCase())) {
                    isIn = true
                    let peopleList = ""

                    console.log(Object.keys(line[1]).length);
                    console.log((line[1]));

                    if(Array.isArray(line[1])){
                        peopleList = dataPeople[line[1][0]]["firstname"]
                        console.log(Object.keys(line[1]));
                        for (let i = 1; i < Object.keys(line[1]).length; i++) {
                            peopleList += ", " + dataPeople[line[1][i]]["firstname"]   
                        }
                    }
                    else{
                        peopleList = dataPeople[line[1]]["firstname"]
                    }

                    
                    
                    

                    console.log(peopleList);
                    
                    
                    article += `<div style="display: flex;"><h4>${line[0]}</h4><h6>${peopleList}</h6></div>`;
                }
            }

            if (isIn) {
                $('.container').append(article)
            }

            isIn = false

        }
    });
});

async function fetchData(name) {
    const response = await fetch(name);
    const data = await response.json();
    localStorage.setItem('NextPauseData', JSON.stringify(data));
    return data;
}



console.log(dataText);