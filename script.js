// store pairs in object

const flipCard = document.querySelector('.flip-card');
flipCard.addEventListener('click', () => {
    flipCard.classList.add('flip-card-clicked');
});

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

async function fetchDefinition() {
    try {
        let definition = '';
        while (definition == '') {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${await fetchRandomWord()}`);
            const data = await response.json();
            if (data.title != 'No Definitions Found') {
                definition = data[0].meanings[0].definitions[0].definition;
            }
        }
        
        console.log(definition);
        return definition;
    } catch(error) {
        console.error("Error in fetchDefinition():", error);
    }
}