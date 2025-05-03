export class UserName {
    constructor(name) {
        this.name = name;
    }

    render() {
        const span = document.createElement('span');
        span.className = 'user-name';
        span.textContent = this.name;
        return span;
    }
}