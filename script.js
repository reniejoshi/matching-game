const wordsData = [];
const flipCards = [];

async function createFlipCards() {
    await createWordsData();

    const container = document.querySelector('.container');

    for (let i = 0; i < wordsData.length; i++) {
        for (let j = 0; j < Object.keys(wordsData[0]).length; j++) {
            const flipCard = document.createElement('div');
            flipCard.className = 'flip-card';

            const flipCardContent = document.createElement('div');
            flipCardContent.className = 'flip-card-content';
            flipCard.appendChild(flipCardContent);

            const flipCardFront = document.createElement('div');
            flipCardFront.className = 'flip-card-front';
            const flipCardFrontP = document.createElement('p');
            flipCardFront.appendChild(flipCardFrontP);
            flipCardContent.appendChild(flipCardFront);

            const flipCardBack = document.createElement('div');
            flipCardBack.className = 'flip-card-back';
            const flipCardBackP = document.createElement('p');
            const wordDataArray = Object.values(wordsData[i]);
            flipCardBackP.textContent = wordDataArray[j];
            flipCardBack.appendChild(flipCardBackP);
            flipCardContent.appendChild(flipCardBack);

            flipCard.addEventListener('click', () => {
                flipCard.classList.add('flip-card-clicked');
            });

            container.appendChild(flipCard);
        }
    }
}

async function createWordsData() {
    for (let i = 0; i < 8; i++) {
        wordsData.push(await fetchWordData());
    }

    console.log(wordsData);
}

async function fetchRandomWord() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word');
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.error("Error in fetchRandomWord():", error);
    }
}

async function fetchWordData() {
    try {
        let definition = '';
        let word;

        while (definition == '') {
            word = await fetchRandomWord();
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();
            if (data.title != 'No Definitions Found') {
                definition = data[0].meanings[0].definitions[0].definition;
            }
        }
        
        console.log(definition);
        return {
            word: word,
            definition: definition
        };
    } catch(error) {
        console.error("Error in fetchDefinition():", error);
    }
}

createFlipCards();