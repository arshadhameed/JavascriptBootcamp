
// http://www.omdbapi.com/?i=tt3896198&apikey=42171776
// 42171776

const autoCompleteConfig={
    renderOption(movie){
        const imgSrc=movie.Poster==='N/A' ? '':movie.Poster;
        return `
        <img src="${imgSrc}"/>
        ${movie.Title} (${movie.Year}) `
    },
    inputValue(movie){
        return movie.Title;
    },
    async fetchData(searchTerms){

        const response= await axios.get('http://www.omdbapi.com/',{
            params:{
                apikey: '42171776',
                s:searchTerms
            }
        });
        if(response.data.Error){
            return [];
        }
        return response.data.Search;
        }

}

createAutoComplete({...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelection(movie,document.querySelector('#left-summary'),'left');
    },
    
});

createAutoComplete({...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelection(movie,document.querySelector('#right-summary','right'));
    },
    
});


let leftMovie;
let rightMovie;
const onMovieSelection= async (movie, summaryElement,side)=>{

    const response= await axios.get('http://www.omdbapi.com/',{
    params:{
        apikey: '42171776',
        i: movie.imdbID
    }

    

});
summaryElement.innerHTML=movieTemplate(response.data);
if(side==='left'){
    leftMovie=response.data;

}
    else{
    rightMovie=response.data;
   
    }

    if (leftMovie && rightMovie ){

        runComparison();
    }
};

const runComparison=()=>{
    console.log('time for comparison');
}


const movieTemplate=(movieDetails)=>{

    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetails.Poster}"/>
            </p> 
        </figure>
        <div class="media-content>
            </div class="content">
                <h1>${movieDetails.Title}</h1>
                <h4>${movieDetails.Genre}</h4>
                <p>${movieDetails.Plot}</p>
            </div>
        </div>
    </article> 
    <article class="notification is-primary">
        <p class="title">${movieDetails.Awards}</p>
        <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
        <p class="title">${movieDetails.Metascore}</p>
        <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
        <p class="title">${movieDetails.imdbRating}</p>
        <p class="subtitle">IMDB rating</p>
        </article>
        <article class="notification is-primary">
        <p class="title">${movieDetails.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
    `
}

