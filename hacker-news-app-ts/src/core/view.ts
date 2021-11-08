//공통으로 사용되거나 연관된 구조를 같은 class로 묶는다.
export default abstract class View {
    private template: string;
    private renderTemplate: string;  //replate 대상이 되는 template
    private container: HTMLElement;
    private htmlList: string[];

    constructor(containerId: string, template: string) {
        const containerElement: HTMLElement | null = document.getElementById(containerId);

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

    abstract render(...params: string[]): void;
}
