export default class Component {
    constructor(parentElement) {
        this.parentElement = parentElement;
    }
    render() {
        throw new Error("Render metodu implement edilmeli");
    }
    afterRender() {}
}