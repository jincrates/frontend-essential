//let ajax = new XMLHttpRequest();   //let 이후에 다른 값을 넣을 수 있음
const ajax = new XMLHttpRequest(); //const는 상수
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';

ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement("ul");


for (let i = 0, max = 10; i < max; i++) {
    const li = document.createElement("li");

    li.innerHTML = newsFeed[i].title;

    ul.appendChild(li);
}

document.getElementById('root').appendChild(ul);
