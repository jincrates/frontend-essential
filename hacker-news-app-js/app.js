const container = document.getElementById("root");

//let은 변수, const는 상수
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'; //@id로 Marking
const store = {
    currentPage: 1,
}
function getData(url) {
    ajax.open('GET', url, false);
    ajax.send(); //데이터를 가져옴

    return JSON.parse(ajax.response);
}

function newsFeed() {
    const newsFeed = getData(NEWS_URL);
    const newsList = [];

    newsList.push('<ul>');
    for (let i = store.currentPage - 1; i < store.currentPage * 10; i++) {
        newsList.push(`
            <li>
                <a href="#/show/${newsFeed[i].id}">
                    ${newsFeed[i].title} (${newsFeed[i].comments_count})
                </a>
            </li>
        `);
    }
    newsList.push('</ul>');
    newsList.push(`
        <div>
            <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">Prev</a>
            <a href="#/page/${store.currentPage + 1}">Next</a>
        </div>
    `);
    container.innerHTML = newsList.join('');  //배열 안에 들어있는 요소를 모두 합쳐줌
}

function newsDetail() {
    const id = location.hash.substr(7);
    const newsContent = getData(CONTENT_URL.replace('@id', id));

    container.innerHTML = `
        <h1>${newsContent.title}</h1>

        <div>
            <a href="#/page/${store.currentPage}">목록으로</a>
        </div>
    `; 
}

function rounter() {
    const routePath = location.hash;

    //첫 진입일 때
    if (routePath === '') {
        newsFeed();
    } else if (routePath.indexOf('#/page/') >= 0) {
        store.currentPage = Number(routePath.substr(7));
        newsFeed();
    } else {
        newsDetail();
    }
}

window.addEventListener('hashchange', rounter);

rounter();