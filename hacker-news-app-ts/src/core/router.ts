import { RouteInfo } from '../types';
import View from './view';

export default class Router {
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

    go = (): void => {
      this.route();
    }

    setDefaultPage(page: View, params: RegExp | null = null): void {
        this.defaultRoute = { path: '', page, params, } 
    }

    addRoutePath(path: string, page: View, params: RegExp | null = null): void {
        this.routeTable.push({ path, page, params });
    }

    private route() {
        const routePath = location.hash;

        if (routePath === '' && this.defaultRoute) {
            this.defaultRoute.page.render();
            return;        
        }

        for(const routeInfo of this.routeTable) {
            if (routePath.indexOf(routeInfo.path) >= 0) {        
              if (routeInfo.params) {
                const parseParams = routePath.match(routeInfo.params);
      
                if (parseParams) {
                  routeInfo.page.render.apply(null, [parseParams[1]]);
                }          
              } else {
                routeInfo.page.render();
              }       
              return;
            }  
          }
    }
}


