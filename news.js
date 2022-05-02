// Ude Import export (MANDATORY)

import navigation from "../components/nav.js";

let navbar = document.getElementById('navbar')
navbar.innerHTML = navigation();

let detailed = document.getElementById('detailed_news'); 

let newsObj = JSON.parse(localStorage.getItem('news')) 

if(newsObj !== null){

    detailed.innerHTML = null;

    let {urlToImage, content, description} = newsObj; 

    let box = document.createElement('div');
    box.setAttribute('class', 'news')

    let img = document.createElement('img');
    img.src = urlToImage;

    let headline = document.createElement('h3');
    headline.textContent = description;

    let newsDetail = document.createElement('p');
    newsDetail.textContent = content; 

    box.append(img, headline, newsDetail); 

    detailed.append(box)

}


let inquery = document.getElementById('search_input')

document.getElementById('search_input').addEventListener('change', () => {
    let query = inquery.value
    if(query !== ""){
       localStorage.setItem('newsKey', JSON.stringify(query))
       window.location.href = './search.html'
    }
})