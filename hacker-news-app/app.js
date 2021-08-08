//parcel index.html

//let ajax = new XMLHttpRequest();   //let 이후에 다른 값을 넣을 수 있음
const container = document.getElementById('root');

const ajax = new XMLHttpRequest(); //const는 상수
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement('ul');

window.addEventListener('hashchange', function() {
    //console.log('해시가 변경됨');
    //console.log(this.location.hash);
    const id = this.location.hash.substr(1);

    ajax.open('GET', CONTENT_URL.replace('@id', id), false);
    ajax.send();

    const newsContent = JSON.parse(ajax.response);
    const title = document.createElement('h1');

    title.innerHTML = newsContent.title;
    content.appendChild(title);
    //console.log(newsContent);
});

for (let i = 0, max = 10; i < max; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = `#${newsFeed[i].id}`;
    a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

    a.addEventListener('click', function() {});

    li.appendChild(a);
    ul.appendChild(li);
}

// document.getElementById('root').appendChild(ul);
// document.getElementById('root').appendChild(content);
// => 공통된 코드는 const로 뽑아냄
container.appendChild(ul);
container.appendChild(content);



