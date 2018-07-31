import {DataStore} from './DataStore.js';

export class AlgoVisHelper {

    static getInstance() {
        if (!AlgoVisHelper.instance) {
            AlgoVisHelper.instance = new AlgoVisHelper();
        }
        return AlgoVisHelper.instance;
    }

    //不允许new
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.canvas = DataStore.getInstance().canvas;
        this.Red = '#F44336';
        this.Pink = '#E91E63';
        this.Purple = '#9C27B0';
        this.DeepPurple = '#673AB7';
        this.Indigo = '#3F51B5';
        this.Blue = '#3F51B5';
        this.LightBlue = '#03A9F4';
        this.Cyan = '#00BCD4';
        this.Teal = '#F44336';
        this.Green = '#4CAF50';
        this.LightGreen = '#8BC34A';
        this.Lime = '#CDDC39';
        this.Yellow = '#FFEB3B';
        this.Amber = '#FFC107';
        this.Orange = '#FF9800';
        this.DeepOrange = '#FF5722';
        this.Brown = '#795548';
        this.Grey = '#9E9E9E';
        this.BlueGrey = '#607D8B';
        this.Black = '#000000';
        this.White = '#FFFFFF';

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.timer = null;
    }

    //width() {
    //    return this.canvas.width;
    //}
    //
    //height() {
    //    return this.canvas.height;
    //}

    clear(x = 0, y = 0, w = this.canvas.width, h = this.canvas.height) {
        this.ctx.clearRect(x, y, w, h);
    }

    strokeCircle(x, y, r, color = this.Black) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    fillCircle(x, y, r, color = this.Black) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    strokeRect(x, y, w, h) {
        this.ctx.beginPath();
        this.ctx.strokeRect(x, y, w, h);
        this.ctx.closePath();
    }

    fillRect(x, y, w, h) {
        this.ctx.beginPath();
        this.ctx.fillRect(x, y, w, h);
        this.ctx.closePath();
    }

    setColor(color) {
        //this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
    }

    setStrokeWidth(w) {
        this.ctx.lineWidth = w;
    }

    /**
     * img 传入Image对象
     * srcX 要剪裁的起始X坐标
     * srcY 要剪裁的起始Y坐标
     * srcW 剪裁的宽度
     * srcH 剪裁的高度
     * x 放置的x坐标
     * y 放置的y坐标
     * width 要使用的宽度
     * height 要使用的高度
     */
    putImage(img = this.img,
             srcX = this.srcX, srcY = this.srcY, srcW = this.srcW, srcH = this.srcH,
             x = this.x, y = this.y, width = this.width, height = this.height) {
        this.ctx.drawImage(
            img,
            srcX, srcY, srcW, srcH,
            x, y, width, height
        );
    }

    fillText(text, x, y, color = '#ffcbeb') {
        this.ctx.beginPath();
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
        this.ctx.closePath();
    }

    strokeText(text, x, y, color = '#ffcbeb') {
        this.ctx.beginPath();
        this.ctx.font = '25px Arial';
        this.ctx.strokeStyle = color;
        this.ctx.strokeText(text, x, y);
        this.ctx.closePath();
    }

    //渐变
    grd(Linear = true, beginColor = this.Red, endColor = this.White) {
        let grd = null;
        if (Linear) {
            grd = this.ctx.createLinearGradient(0, 0, this.width, 0);
        } else {
            //grd = this.ctx.createRadialGradient(this.width/2, this.height/2, 0, this.width, this.height, Math.min(this.width,this.height));
            grd = this.ctx.createRadialGradient(this.width / 2, this.height / 2, 5, this.width / 2, this.width / 2, 500);
        }

        grd.addColorStop(0, beginColor);
        grd.addColorStop(1, endColor);
        // 填充渐变
        this.ctx.fillStyle = grd;
        //ctx.fillRect(10,10,150,80);
    }

}