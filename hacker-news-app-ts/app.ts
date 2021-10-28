//parcel index.html
// DOM API를 사용해서 HTML을 그려내면 코드만 봐서는 마크업의 구조(태그들의 위계)를 알아내는 것이 거의 불가능하다.(코드가 복잡해질수록)
// 따라서 아이러니하게도 DOM API를 사용하지 않고 문자열을 이용하는 것이 마크업 구조를 파악하기 더 용이하다.

//let ajax = new XMLHttpRequest();   //let 이후에 다른 값을 넣을 수 있음
type Store = {
    currentPage: number;
    feeds: NewsFeed[];
}

type News = {
    id: number;
    time_ago: string;
    title: string;
    url: string;
    user: string;
    content: string;
}

type NewsFeed = News & { 
    comments_count: number;
    points: number;
    read?: boolean;
}

type NewsDetail = News & {
    comments: NewsComment[];
}

type NewsComment = News & {
    comments: NewsComment[];
    level: number;
}
const container: HTMLElement | null = document.getElementById('root');
const ajax: XMLHttpRequest = new XMLHttpRequest(); //const는 상수
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store: Store = {
    currentPage: 1,
    feeds: [],
} //여러 함수가 공유해서 사용하는 변수

function getData<AjaxResponse>(url: string): AjaxResponse {
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
}

function makeFeeds(feeds: NewsFeed[]): NewsFeed[] {
    for(let i = 0, max = feeds.length; i < max; i++) {
        feeds[i].read = false;
    }

    return feeds;
}

//타입가드 코드
function updateView(html: string): void {
    if(container) {
        container.innerHTML = html;
    } else {
        console.error('최상위 컨테이너가 없어 UI를 진행하지 못합니다.');
    }
}

// 목록 호출부분 재사용을 위한 메서드화
function newsFeed(): void {
    let newsFeed: NewsFeed[] = store.feeds;
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
        newsFeed = store.feeds = makeFeeds(getData<NewsFeed[]>(NEWS_URL));
    }

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
    template = template.replace('{{__prev_page__}}', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
    template = template.replace('{{__next_page__}}', String(store.currentPage + 1));
    
    updateView(template);
}

function newsDetail(): void {
    const id = location.hash.substr(7);
    const newsContent = getData<NewsDetail>(CONTENT_URL.replace('@id', id));
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

    
    updateView(template.replace('{{__comments__}}', makeComment(newsContent.comments)));
}

function makeComment(comments: NewsComment[]): string {
    const commentString = [];

    for(let i = 0, max = comments.length; i < max; i++){
        const comment: NewsComment = comments[i];
        commentString.push(`
            <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
                <div class="text-gray-400">
                    <i class="fa fa-sort-up mr-2"></i>
                    <strong>${comment.user}</strong> ${comment.time_ago}
                </div>
                <p class="text-gray-700">${comment.content}</p>
            </div>      
        `);

        //재귀호출
        if(comment.comments.length > 0){
            commentString.push(makeComment(comment.comments));
        }
    }

    return commentString.join('');
}
//화면 전환을 처리하는 라우터
function router(): void {
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