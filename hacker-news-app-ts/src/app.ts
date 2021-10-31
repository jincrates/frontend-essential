import Router from "./core/router";
import { NewsFeedView, NewsDetailView } from "./page";  //page/index.ts로 묶음
import { Store } from './types';


//npx parcel index.html
const store: Store = {
    currentPage: 1,
    feeds: [],
}; //여러 함수가 공유해서 사용하는 변수

//어디서든 접근 가능한 브라우저 window에 값을 넣어둠(좋은 방법은 아님)
declare global {
    interface Window {
        store: Store;
    }
}
const router: Router = new Router();
const newsFeedView = new NewsFeedView('root');
const newsDetailView = new NewsDetailView('root');

router.setDefaultPage(newsFeedView);

router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);

router.route();