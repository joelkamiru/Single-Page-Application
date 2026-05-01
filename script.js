document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("search-word");
    const wordInput = document.getElementById("Word-search");
    const displayName = document.getElementById("nameSearched");
    const displayPronunciation = document.getElementById("namePronunciation");
    const displayPronunciationAudio = document.getElementById("pronunciationAudio");
    const displayDefinition = document.getElementById("nameDefinition");
    const displaySynoname = document.getElementById("nameSynoname");
    const displaySearching = document.getElementById("loadSearching");
    const displayemptySearch = document.getElementById("emptySearch");

    displayPronunciationAudio.style.display = "none";

    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const word = wordInput.value.trim();
        if (word === "") {
            displayemptySearch.textContent = "Type a word";
            return; 
        }

        displaySearching.textContent = "Searching...";
        displayemptySearch.textContent = "";
        displayDefinition.innerHTML = ""; 
        displayPronunciationAudio.style.display = "none";

        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        .then(function(response) {
            if (response.ok === false) {
                displaySearching.textContent = "";
                displayemptySearch.textContent = "Word not found!";
                return null; 
            }
            return response.json();
        })
        .then(function(data) {
            if (data === null) return; 

            const wordData = data[0];
            displaySearching.textContent = "";

            displayName.textContent = "Word: " + wordData.word;
            displayPronunciation.textContent = wordData.phonetic || "N/A";

            // AUDIO LOGIC (Finding the first available sound)
            const audioObject = wordData.phonetics.find(function(item) {
                return item.audio !== "";
            });

            if (audioObject) {
                displayPronunciationAudio.href = audioObject.audio;
                displayPronunciationAudio.style.display = "inline";
                displayPronunciationAudio.textContent = "Listen to Pronunciation";
            }

            // --- DISPLAYING JUST 1 MEANING ---
            // We grab ONLY the first object in the meanings array
            const firstMeaning = wordData.meanings[0];

            if (firstMeaning) {
                const posLabel = document.createElement("p");
                posLabel.textContent = firstMeaning.partOfSpeech; 
                displayDefinition.appendChild(posLabel);

                const list = document.createElement("ul");
                
                // We still loop through all definitions for this ONE meaning
                firstMeaning.definitions.forEach(function(def) {
                    const defList = document.createElement("li"); // Using your defList name
                    defList.textContent = def.definition;
                    list.appendChild(defList);
                });

                displayDefinition.appendChild(list);
            }

            // --- SYNONYMS USING SPREAD SYNTAX ---
            const synonyms = wordData.meanings[0].synonyms;
            if (synonyms && synonyms.length > 0) {
                const synonymList = [...synonyms];
                displaySynoname.textContent = "Synonyms: " + synonymList.join(", ");
            } else {
                displaySynoname.textContent = "Synonyms: None found";
            }
        });
    });
});