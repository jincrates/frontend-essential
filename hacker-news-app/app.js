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
    feeds: [],
} //여러 함수가 공유해서 사용하는 변수

function getData(url) {
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
}

function makeFeeds(feeds) {
    for(let i = 0, max = feeds.length; i < max; i++) {
        feeds[i].read = false;
    }

    return feeds;
}

// 목록 호출부분 재사용을 위한 메서드화
function newsFeed() {
    let newsFeed = store.feeds;
    const newsList = [];

    //https://tailwindcss.com/
    //handlebars를 통한 template 구조 개선해보기
    let template = `
        <div class="bg-gray-600 min-h-screen">
            <div class="bg-white text-xl">
                <div class="mx-auto px-4">
                    <div class="flex justify-between items-center py-6">
                        <div class="flex justify-start">
                            <h1 class="font-extrabold">Hacker News</h1>
                        </div>
                        <div class="items-center justify-end">
                            <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                                Previous
                            </a>
                            <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                                Next
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4 text-2xl text-gray-700">
                {{__news_feed__}}
            </div>
        </div>
    `;

    if(newsFeed.length === 0) {
        newsFeed = store.feeds = makeFeeds(getData(NEWS_URL));
    }

    console.log(newsFeed);

    for (let i = (store.currentPage - 1) * 10, max = store.currentPage * 10; i < max; i++) {
        newsList.push(`
            <div class="p-6 ${newsFeed[i].read ? 'bg-red-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
                <div class="flex">
                    <div class="flex-auto">
                        <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>  
                    </div>
                    <div class="text-center text-sm">
                        <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${newsFeed[i].comments_count}</div>
                    </div>
                </div>
                <div class="flex mt-3">
                    <div class="grid grid-cols-3 text-sm text-gray-500">
                        <div><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</div>
                        <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
                        <div><i class="far fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
                    </div>  
                </div>
            </div>    
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
    let template = `
        <div class="bg-gray-600 min-h-screen pb-8">
            <div class="bg-white text-xl">
                <div class="mx-auto px-4">
                    <div class="flex justify-between items-center py-6">
                        <div class="flex justify-start">
                            <h1 class="font-extrabold">Hacker News</h1>
                        </div>
                        <div class="items-center justify-end">
                            <a href="#/page/${store.currentPage}" class="text-gray-500">
                                <i class="fa fa-times"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="h-full border rounded-xl bg-white m-6 p-4 ">
                <h2>${newsContent.title}</h2>
                <div class="text-gray-400 h-20">
                    ${newsContent.content}
                </div>

                {{__comments__}}

            </div>
        </div>
    `;

    for(let i = 0, max = store.feeds.length; i < max; i++){
        if(store.feeds[i].id === Number(id)) {
            store.feeds[i].read = true;
            break;
        }
    }

    function makeComment(comments, called = 0) {
        const commentString = [];

        for(let i = 0, max = comments.length; i < max; i++){
            commentString.push(`
                <div style="padding-left: ${called * 40}px;" class="mt-4">
                    <div class="text-gray-400">
                        <i class="fa fa-sort-up mr-2"></i>
                        <strong>${comments[i].user}</strong> ${comments[i].time_ago}
                    </div>
                    <p class="text-gray-700">${comments[i].content}</p>
                </div>      
            `);

            //재귀호출
            if(comments[i].comments.length > 0){
                commentString.push(makeComment(comments[i].comments, called + 1));
            }
        }

        return commentString.join('');
    }

    container.innerHTML = template.replace('{{__comments__}}', makeComment(newsContent.comments));
}

//화면 전환을 처리하는 라우터
function router() {
    const routePath = location.hash;
    //location.hash에 '#'만 들어오면 빈문자로 인식한다.
    if (routePath === '') {
        newsFeed();  //첫 진입일때
    } else if (routePath.indexOf('#/page/') >= 0) {  // indexOf는 값이 없으면 -1을 리턴
        store.currentPage = Number(routePath.substr(7));
        newsFeed();
    } else {
        newsDetail();
    }
}

window.addEventListener('hashchange', router);

router();