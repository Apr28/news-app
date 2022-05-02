// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page

// https://masai-mock-api.herokuapp.com/news?q={query}

import navigation from "../components/nav.js";

let navbar = document.getElementById('navbar')
navbar.innerHTML = navigation();



let results = document.getElementById('results')

let inquery = document.getElementById('search_input')

document.getElementById('search_input').addEventListener('change', () => {
    let query = inquery.value
    if(query !== ""){
        fetchNews(query)
    }
})


let fetchNews = async (query) => {
    try{
        const res = await fetch(`https://masai-mock-api.herokuapp.com/news?q=${query}`)
        
        let data = await res.json();
        createDom(data.articles)

    }catch(er){
        console.log(er)
    }
}


let createDom = (newsArray) => {
    results.innerHTML = null; 

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

let keyNews = JSON.parse(localStorage.getItem('newsKey'));
if(keyNews !== null || keyNews == ""){
    fetchNews(keyNews)
}














