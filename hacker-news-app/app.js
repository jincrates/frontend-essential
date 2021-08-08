//parcel index.html
// DOM API를 사용해서 HTML을 그려내면 코드만 봐서는 마크업의 구조(태그들의 위계)를 알아내는 것이 거의 불가능하다.(코드가 복잡해질수록)
// 따라서 아이러니하게도 DOM API를 사용하지 않고 문자열을 이용하는 것이 마크업 구조를 파악하기 더 용이하다.

//let ajax = new XMLHttpRequest();   //let 이후에 다른 값을 넣을 수 있음
const container = document.getElementById('root');
const ajax = new XMLHttpRequest(); //const는 상수
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store = {
    currentPage: 1,
} //여러 함수가 공유해서 사용하는 변수

function getData(url) {
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
}

// 목록 호출부분 재사용을 위한 메서드화
function newsFeed() {
    const newsFeed = getData(NEWS_URL);
    const newsList = [];
    
    //https://tailwindcss.com/
    let template = `
        <div class="container mx-auto p-4">
            <h1>Hacker News</h1>
            <ul>
                {{__news_feed__}}
            </ul>
            <div>
                <a href="#/page/{{__prev_page__}}">이전 페이지</a>
                <a href="#/page/{{__next_page__}}">다음 페이지</a>
            </div>
        </div>
    `;

    for (let i = (store.currentPage - 1) * 10, max = store.currentPage * 10; i < max; i++) {
        newsList.push(`
            <li>
                <a href="#/show/${newsFeed[i].id}">
                    ${newsFeed[i].title} (${newsFeed[i].comments_count})
                </a>
            </li>
        `);
    }
    template = template.replace('{{__news_feed__}}', newsList.join(''));
    template = template.replace('{{__prev_page__}}', store.currentPage > 1 ? store.currentPage - 1 : 1);
    template = template.replace('{{__next_page__}}', store.currentPage + 1);
    container.innerHTML = template;
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

//화면 전환을 처리하는 라우터
function router() {
    const routePath = location.hash;
    //location.hash에 '#'만 들어오면 빈문자로 인식한다.
    if(routePath === '') {
        newsFeed();  //첫 진입일때
    } else if(routePath.indexOf('#/page/') >= 0) {  // indexOf는 값이 없으면 -1을 리턴
        store.currentPage = Number(routePath.substr(7));
        newsFeed();
    } else {
        newsDetail();
    }
}

window.addEventListener('hashchange', router);

router();