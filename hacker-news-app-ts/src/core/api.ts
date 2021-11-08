import { NewsFeed, NewsDetail } from '../types';

export class Api {
    xhr: XMLHttpRequest;
    url: string;

    constructor(url: string) {
        this.xhr = new XMLHttpRequest();
        this.url = url;
    }

    //동기 코드로 작성하면 응답이 올 때까지 UI가 아무것도 움직이지 않는다.
    //비동기 코드 작성법
    getRequestWithXHR<AjaxResponse>(callback: (data: AjaxResponse) => void): void {
        this.xhr.open('GET', this.url);
        this.xhr.addEventListener('load', () => {
            callback(JSON.parse(this.xhr.response) as AjaxResponse);
        });

        this.xhr.send();
    }

    getRequestWithPromise<AjaxResponse>(callback: (data: AjaxResponse) => void): void {
        fetch(this.url)
            .then(response => response.json())
            .then(callback)
            .catch(() => {
                console.error('데이터를 불러오지 못했습니다.');
            })
    }

}

export class NewsFeedApi extends Api {
    constructor(url: string) {
        super(url);
    }

    getDataWithXHR(callback: (data: NewsFeed[]) => void): void {
        return this.getRequestWithXHR<NewsFeed[]>(callback);
    }

    getDataWithPromise(callback: (data: NewsFeed[]) => void): void {
        return this.getRequestWithXHR<NewsFeed[]>(callback);
    }
}

export class NewsDetailApi extends Api {
    constructor(url: string) {
        super(url);
    }

    getDataWithXHR(callback: (data: NewsDetail) => void): void {
        return this.getRequestWithXHR<NewsDetail>(callback);
    }

    getDataWithPromise(callback: (data: NewsDetail) => void): void {
        return this.getRequestWithXHR<NewsDetail>(callback);
    }
}
