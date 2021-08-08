//parcel index.html

//let ajax = new XMLHttpRequest();   //let 이후에 다른 값을 넣을 수 있음
const container = document.getElementById('root');
const ajax = new XMLHttpRequest(); //const는 상수
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

function getData(url) {
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);
const ul = document.createElement('ul');

window.addEventListener('hashchange', function() {
    //console.log('해시가 변경됨');
    //console.log(this.location.hash);
    const id = this.location.hash.substr(1);
    const newsContent = getData(CONTENT_URL.replace('@id', id));

    container.innerHTML = `
        <h1>${newsContent.title}</h1>

        <div>
            <a href="#">목록으로</a>
        </div>
    `;
});

const newsList = [];

newsList.push('<ul>');

for (let i = 0, max = 10; i < max; i++) {
    newsList.push( `
        <li>
            <a href="#${newsFeed[i].id}">
                ${newsFeed[i].title} (${newsFeed[i].comments_count})
            </a>
        </li>
    `);
}

// document.getElementById('root').appendChild(ul);
// document.getElementById('root').appendChild(content);
// => 공통된 코드는 변수(const)로 뽑아냄
// container.appendChild(ul);

newsList.push('</ul>');

//container.appendChild(content);
container.innerHTML = newsList.join('');  //join() : 배열 안에 요소들을 하나의 문자열로 합치는 메소드 - 기본값은 ','를 구분자로 넣음

// DOM API를 사용해서 HTML을 그려내면 코드만 봐서는 마크업의 구조(태그들의 위계)를 알아내는 것이 거의 불가능하다.(코드가 복잡해질수록)
// 따라서 아이러니하게도 DOM API를 사용하지 않고 문자열을 이용하는 것이 마크업 구조를 파악하기 더 용이하다.

