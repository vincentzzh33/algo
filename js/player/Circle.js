export class Circle {

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getR() {
        return this.r;
    }

    contain(p) {
        return Math.pow(p.getX() - this.x, 2) + Math.pow(p.getY() - this.y, 2) <= this.r * this.r;
    }
}