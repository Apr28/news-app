// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page


import navigation from "../components/nav.js";

let navbar = document.getElementById('navbar')
navbar.innerHTML = navigation(); 

let results = document.getElementById('results');




// https://masai-mock-api.herokuapp.com/news/top-headlines?country={country code}


// https://masai-mock-api.herokuapp.com/news?q={query}

/*
    - India :- “in”
    - Usa :- “us”
    - China :- “ch”
    - UK :- “uk”
*/ 

let getNews = async (code) => {
    try{ 
        if(code === 'in'){
            const res = await fetch(`https://masai-mock-api.herokuapp.com/news/top-headlines?country=in`)
            let data = await res.json();
            resultDom(data.articles)
        }   
        else{
            const res = await fetch(`https://masai-mock-api.herokuapp.com/news/top-headlines?country=${code}`)
            let data = await res.json();
            resultDom(data.articles)
        }
    }   
    catch(er){
        console.log(er)
    }
}

let resultDom = (newsArray) => {
    results.innerHTML = null

    newsArray.map(({content, description, urlToImage}, index) => {
        if(content !== null && description !== null){
            
            let box = document.createElement('div');
            box.setAttribute('class', 'news')

            let img = document.createElement('img');
            img.src = urlToImage; 

            let newsContent = document.createElement('div'); 

            let title = document.createElement('h3');
            title.textContent = description;

            let details = document.createElement('p');
            details.textContent = content; 

            newsContent.append(title, details)

            box.append(img, newsContent)

            results.append(box)

            box.onclick = () => {
                localStorage.setItem('news', JSON.stringify(newsArray[index]))
                window.location.href = './news.html'
            }

        }
    })
}
getNews('in'); 


let countries = document.querySelectorAll('#sidebar > h4'); 

for(let i=0; i<countries.length; i++){
    let z = countries[i].id
    countries[i].onclick = () => {
        getNews(z);
    }
}

let inquery = document.getElementById('search_input')

document.getElementById('search_input').addEventListener('change', () => {
    let query = inquery.value
    if(query !== ""){
       localStorage.setItem('newsKey', JSON.stringify(query))
       window.location.href = './search.html'
    }
})