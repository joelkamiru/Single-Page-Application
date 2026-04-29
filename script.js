document.addEventListener("DOMContentLoaded", () => {
    const searchForm=document.getElementById("search-word")
    const wordInput=document.getElementById("Word-search")

    const displayName=document.getElementById("nameSearched")
    const displayPronunciation=document.getElementById("namePronunciation")
    const displayDefinition=document.getElementById("nameDefinition")
    const displaySynoname=document.getElementById("nameSynoname")

    searchForm.addEventListener("submit", (event)=>{
        event.preventDefault();

        const word=wordInput.value;

        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" +word)
        .then(response => response.json())
        .then(function(data){
            const wordData=data[0]
             displayName.textContent=wordData.word;
            // displayPronunciation.textContent=data.phonetic;
            // displayDefinition.textContent=data.meanings.definitions.definition;
            // displaySynoname.textContent=data.meanings.definitions.synonyms


        });
    })

})