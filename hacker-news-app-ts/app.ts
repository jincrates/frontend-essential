//npx parcel index.html

interface Store {
    currentPage: number;
    feeds: NewsFeed[];
}

interface News {
    readonly id: number;  //readonly 변경불가 지시어
    readonly time_ago: string;
    readonly title: string;
    readonly url: string;
    readonly user: string;
    readonly content: string;
}

interface NewsFeed extends News { 
    readonly comments_count: number;
    readonly points: number;
    read?: boolean;  //? : optional
}

interface NewsDetail extends News {
    readonly comments: NewsComment[];
}

interface NewsComment extends News {
    readonly comments: NewsComment[];
    readonly level: number;
}

interface RouteInfo {
    path: string;
    page: View;
}

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store: Store = {
    currentPage: 1,
    feeds: [],
}; //여러 함수가 공유해서 사용하는 변수


//상속은 관계를 바꾸기 위해서는 코드 자체를 바꿔야 하며, 다중상속도 불가능하기 때문에 Mixin 기법을 사용
function appliyApiMixins(targetClass: any, baseClasses: any[]): void {
    baseClasses.forEach(baseClass => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
            const descripter = Object.getOwnPropertyDescriptor(baseClass.prototype, name);

            if (descripter) {
                Object.defineProperty(targetClass.prototype, name, descripter);
            }
        });
    });
}

//class 생성
class Api {
    getRequest<AjaxResponse>(url: string): AjaxResponse {
        const ajax = new XMLHttpRequest;
        ajax.open('GET', url, false);
        ajax.send();

        return JSON.parse(ajax.response);
    }
}

class NewsFeedApi extends Api {
    getData(): NewsFeed[] {
        return this.getRequest<NewsFeed[]>(NEWS_URL);
    }
}

class NewsDetailApi extends Api {
    getData(id: string): NewsDetail {
        return this.getRequest<NewsDetail>(CONTENT_URL.replace('@id', id));
    }
}

// interface NewsFeedApi extends Api {};
// interface NewsDetailApi extends Api {};

// appliyApiMixins(NewsFeedApi, [Api]);
// appliyApiMixins(NewsDetailApi, [Api]);

//공통으로 사용되거나 연관된 구조를 같은 class로 묶는다.
abstract class View {
    private template: string;
    private renderTemplate: string;  //replate 대상이 되는 template
    private container: HTMLElement;
    private htmlList: string[];

    constructor(containerId: string, template: string) {
        const containerElement = document.getElementById(containerId);

        if (!containerElement) {
            throw '최상위 컨테이너가 없어 UI를 진행하지 못합니다.';
        }

        this.container = containerElement;
        this.template = template;
        this.renderTemplate = template;
        this.htmlList = [];
    }

    protected updateView(): void {
        this.container.innerHTML = this.renderTemplate;
        this.renderTemplate = this.template;
    }
    
    protected addHtml(htmlString: string): void {
        this.htmlList.push(htmlString);
    }

    protected getHtml(): string {
        const snapshot = this.htmlList.join('');
        this.clearHtmlList();
        return snapshot;
    }

    protected setTemplateData(key: string, value: string): void {
        this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
    }

    private clearHtmlList(): void {
        this.htmlList = [];
    }

    abstract render(): void;
}

class Router {
    defaultRoute: RouteInfo | null;
    routeTable: RouteInfo[];

    constructor() {
        // this.route만 작성하면 브라우저의 이벤트 시스템에서 호출하는 시점에 route는 
        // Router의 인스턴스가 아니기 때문에 defaultRoute, routeTable에 접근할 수 없다.
        // 따라서 bind(this)를 사용하여 현재 등록 시점의 this를 고정시켜준다. 
        window.addEventListener('hashchange', this.route.bind(this));

        this.routeTable = [];
        this.defaultRoute = null;

    }

    setDefaultPage(page: View): void {
        this.defaultRoute = { path: '', page };
    };
    addRoutePath(path: string, page: View): void {
        this.routeTable.push({ path, page });
    }

    route() {
        const routePath = location.hash;

        if (routePath === '' && this.defaultRoute) {
            this.defaultRoute.page.render();
        }

        for (const routeInfo of this.routeTable) {
            if (routePath.indexOf(routeInfo.path) >= 0) {
                routeInfo.page.render();
                break;
            }
        }
    }
}

//class는 대문자로
class NewsFeedView extends View {
    private api: NewsFeedApi;
    private feeds: NewsFeed[];

    constructor(containerId: string) {
        let template: string = `
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

        super(containerId, template);

        this.api = new NewsFeedApi();
        this.feeds = store.feeds;
    
        if (this.feeds.length === 0) {
            this.feeds = store.feeds = this.api.getData();
            this.makeFeeds();
        }
    }
    
    render(): void {
        store.currentPage = Number(location.hash.substr(7) || 1);

        for (let i = (store.currentPage - 1) * 10, max = store.currentPage * 10; i < max; i++) {
            //구조 분해 할당(ES5 이후 추가된 문법★★)
            const { id, title, comments_count, user, points, time_ago, read } = this.feeds[i]; 
            
            this.addHtml(`
                <div class="p-6 ${read ? 'bg-red-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
                    <div class="flex">
                        <div class="flex-auto">
                            <a href="#/show/${id}">${title}</a>  
                        </div>
                        <div class="text-center text-sm">
                            <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${comments_count}</div>
                        </div>
                    </div>
                    <div class="flex mt-3">
                        <div class="grid grid-cols-3 text-sm text-gray-500">
                            <div><i class="fas fa-user mr-1"></i>${user}</div>
                            <div><i class="fas fa-heart mr-1"></i>${points}</div>
                            <div><i class="far fa-clock mr-1"></i>${time_ago}</div>
                        </div>  
                    </div>
                </div>    
            `);
        }
        this.setTemplateData('news_feed', this.getHtml());
        this.setTemplateData('prev_page', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
        this.setTemplateData('next_page', String(store.currentPage + 1));
        
        this.updateView();
    }
    
    private makeFeeds(): void {
        for (let i = 0, max = this.feeds.length; i < max; i++) {
            this.feeds[i].read = false;
        }
    }
}

class NewsDetailView extends View {
    constructor(containerId: string) {
        let template = `
            <div class="bg-gray-600 min-h-screen pb-8">
                <div class="bg-white text-xl">
                    <div class="mx-auto px-4">
                        <div class="flex justify-between items-center py-6">
                            <div class="flex justify-start">
                                <h1 class="font-extrabold">Hacker News</h1>
                            </div>
                            <div class="items-center justify-end">
                                <a href="#/page/{{__currentPage__}}" class="text-gray-500">
                                    <i class="fa fa-times"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="h-full border rounded-xl bg-white m-6 p-4 ">
                    <h2><a href="{{__link__}}" onclick="window.open(this.href); return false;">{{__title__}}</a></h2>
                    <div class="text-gray-400 h-20">
                        {{__content__}}
                    </div>

                    {{__comments__}}

                </div>
            </div>
        `;

        super(containerId, template);
    }
    
    render() {
        const id = location.hash.substr(7);
        const api = new NewsDetailApi();
        const newsDetail: NewsDetail = api.getData(id);

        for(let i = 0, max = store.feeds.length; i < max; i++) {
            if(store.feeds[i].id === Number(id)) {
                store.feeds[i].read = true;
                break;
            }
        }
        
        this.setTemplateData('currentPage', String(store.currentPage));
        this.setTemplateData('title', newsDetail.title);
        this.setTemplateData('link', newsDetail.url);
        this.setTemplateData('content', newsDetail.content);
        this.setTemplateData('comments', this.makeComment(newsDetail.comments));

        this.updateView();
    }

    private makeComment(comments: NewsComment[]): string {
        for(let i = 0, max = comments.length; i < max; i++){
            const comment: NewsComment = comments[i];
    
            this.addHtml(`
                <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
                    <div class="text-gray-400">
                        <i class="fa fa-sort-up mr-2"></i>
                        <strong>${comment.user}</strong> ${comment.time_ago}
                    </div>
                    <p class="text-gray-700">${comment.content}</p>
                </div>      
            `);
    
            //재귀호출
            if (comment.comments.length > 0){
                this.addHtml(this.makeComment(comment.comments));
            }
        }
    
        return this.getHtml();
    }
}

const router: Router = new Router();
const newsFeedView = new NewsFeedView('root');
const newsDetailView = new NewsDetailView('root');

router.setDefaultPage(newsFeedView);

router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);

router.route();