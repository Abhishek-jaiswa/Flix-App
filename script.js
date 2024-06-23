
const global ={
    currentpage: window.location.pathname,
    search:{
        term:'',
        type:'',
        page:1,
        totalPage:1
    }
}

async function displayPopularMovies(){
    const results = await fetchAPIData('movies')
    results.forEach((movie) =>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML =`
        <a href="movies-details.html?id=${movie.show.id}">
            ${
                movie.show.image ? `<img src="${movie.show.image.original}" alt="${movie.show.name}"></img>` : `<img src="images/no-image.jpg" alt=""></img>`
            }
        </a>
        <div class="card-details">
            <h3>${movie.show.name}</h3>
            <p class="Release-date">Release: <strong>XX/XX/XXX</strong></p>
        </div>
        `;
        document.querySelector('.card-container').appendChild(div);
         
    })
}


async function displayPopularShows(){
    const results = await fetchAPIData('shows')
    results.forEach((shows) =>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML =`
        <a href="tv-details.html?id=${shows.show.id}">
            ${
                shows.show.image ? `<img src="${shows.show.image.original}" alt="${shows.show.name}"></img>` : `<img src="images/no-image.jpg" alt=""></img>`
            }
        </a>
        <div class="card-details">
            <h3>${shows.show.name}</h3>
            <p class="Release-date">Release: <strong>XX/XX/XXX</strong></p>
        </div>
        `;
        document.querySelector('.card-container').appendChild(div);
        
    })
}

async function movieDetails(){
    let id = window.location.search.split('=')[1];
    
    let movie = await fetchMovieDetails(id)
   
    const div = document.createElement('div');
    div.innerHTML=`
     ${
                movie.image ? `<img src="${movie.image.original}" alt="${movie.name}"  width=350 style='padding: 10px'></img>` : `<img src="images/no-image.jpg" alt="" width=350 style='padding: 10px'></img>`
       }
     
            <div class="info-texts">
                <h3>${movie.name}</h3>
                <div class="core">
                    <div class="ratings">
                        <strong>X</strong>234.45
                    </div>
                    <p >Release Date: 2022-20-10</p>
                    <p id="para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum impedit iure eaque quis soluta incidunt sit ducimus magnam. Facilis, quasi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima veniam, itaque nobis quia autem dicta quae, officia, reprehenderit veritatis hic omnis iusto.</p>
                    <div class="type">
                        <p>${movie.type}</p>
                    <p>Action</p>
                    <p>Fantasy</p>
                    <p>Science Fiction</p>
                    </div>
                    <a href="" class="btn Movie-Home_page"  >
                        View Movie Home Page
                    </a>
                </div>
            </div>

        <main class="moreInfo">
            <section class="budget">
                <h3>MOVIE INFO</h3>
                <div>Budget: <span>$200,000,00</span></div>
                <div>Revenue: <span>$450,000,00</span></div>
                <div>Runtime: <span>125 Minutes</span></div>
                <div>Status: <span>released</span></div>
                <p>Production Companies:</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, eveniet?</p>

            </section>
        </main> 
    `;
    document.querySelector('#MovieInDetails').appendChild(div)

}

async function showDetails(){
    let id = window.location.search.split('=')[1];
    let movie = await fetchMovieDetails(id);
    let div = document.createElement('div');
    div.classList.add('showUpdate');
    div.innerHTML = `
     <a href="tv_shows-details.html">
            <button class="hello btn">Back To Shows</button>
    </a>

        <main class="movie-info">
             ${
                movie.image ? `<img src="${movie.image.original}" alt="${movie.name}"  width=350 style='padding: 10px'></img>` : `<img src="images/no-image.jpg" alt="" width=350 style='padding: 10px'></img>`
       }
            <div class="info-texts">
                <h3>${movie.name}</h3>
                <div class="core">
                    <div class="ratings">
                        <strong>X</strong>234.45
                    </div>
                    <p >Release Date: 2022-20-10</p>
                    <p id="para">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum impedit iure eaque quis soluta incidunt sit ducimus magnam. Facilis, quasi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima veniam, itaque nobis quia autem dicta quae, officia, reprehenderit veritatis hic omnis iusto.</p>
                    <div class="type">
                        <p>Geners</p>
                    <p>Action</p>
                    <p>Fantasy</p>
                    <p>Science Fiction</p>
                    </div>
                    <a href="" class="btn Movie-Home_page"  >
                        View Show Home Page
                    </a>
                </div>
            </div>
        </main>

        <main class="moreInfo">
            <section class="budget">
                <h3>Show INFO</h3>
                <div>Budget: <span>$200,000,00</span></div>
                <div>Revenue: <span>$450,000,00</span></div>
                <div>Runtime: <span>125 Minutes</span></div>
                <div>Status: <span>released</span></div>
                <p>Production Companies:</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, eveniet?</p>

            </section>
        </main>
    `;
    document.querySelector('#MovieInDetails').appendChild(div)
}

async function search(){
    const queryString = window.location.search;
    const url = new URLSearchParams(queryString);
    global.search.type = url.get('type');
    global.search.term =  url.get('search-term');

    if(global.search.term !== '' && global.search.term !== null){
        const results = await searchAPIData()
        if(results.length === 0){
            alert('Nothing Found! try again.')
            return;
        }
        displaySearch(results);

    }else{
        alert('please enter something!')
    }
}

function displaySearch(results){
    let current = global.search.term;
    document.querySelector('.pop').innerHTML=`Results of  ${current}..`
    results.forEach((movie) =>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML =`
        <a href="movies-details.html?id=${movie.show.id}">
            ${
                movie.show.image ? `<img src="${movie.show.image.original}" alt="${movie.show.name}"></img>` : `<img src="images/no-image.jpg" alt=""></img>`
            }
        </a>
        <div class="card-details">
            <h3>${movie.show.name}</h3>
            <p class="Release-date">Release: <strong>XX/XX/XXX</strong></p>
        </div>
        `;
        document.querySelector('.card-container').appendChild(div);
         
    })
}

async function displaySlider(){
    const results = await fetchAPIData('new');
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML =`
                    <a href="movies-details.html?id=${movie.show.id}">
                       <img src="${movie.show.image.medium}" alt="${movie.show.name}">
                   </a>
        `;
        document.querySelector('.swiper-wrapper').appendChild(div)
        initSwiper()
    })

}

function initSwiper(){
    const swiper = new Swiper('.swiper',{
        slidesPerView:1,
        spaceBetween: 0,
        freeMode: true,
        loop: true,
        ariaLive:true,
        autoplay:{
            delay:3000,
            disabledOnInteraction: false
        },
        breakpoints:{
            500:{
                slidesPerView:2
            },
            700:{
                slidesPerView:3
            },
            1200:{
                slidesPerView:4
            }
        },
    })
}

async function fetchMovieDetails(endpoint){
    showspinner()
    const response = await fetch(`https://api.tvmaze.com/shows/${endpoint}`)

    const data = await response.json();
    removespinner()
    return data
}

async function fetchAPIData(endpoint){
    showspinner()
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${endpoint}`
    )

    const data = await response.json();
    removespinner()
    return data
}

async function searchAPIData(){
    showspinner()
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${global.search.term}`
    )
   
    const data = await response.json();
    removespinner()
    return data
}


function showspinner(){
    document.querySelector('.spinner').classList.add('show')
}

function removespinner(){
    document.querySelector('.spinner').classList.remove('show')
}

//Highlight Active link
function highlightActiveLink(){
    let highlight = document.querySelectorAll('.highlight')
    highlight.forEach((item) =>{
        if(global.currentpage.includes(item.getAttribute('href')))
            item.style.color = 'yellow'
    })
}

//Init App
function init(){
    switch(global.currentpage){
        case '/index.html':
            displaySlider()
            displayPopularMovies();
            break;
        
        case '/search.html':
            search()
            break;

        case '/movies-details.html':
            movieDetails()
            break;

        case '/tv-details.html':
            showDetails()
            break;

        case '/tv_shows-details.html':
            displayPopularShows()
            break;

    
    }
    
highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)