//源文件加载器
import {Resources} from "./Resources.js";

export class ResourceLoader {
//	map = null;
    static getInstance() {//单例
        if (!ResourceLoader.instance) {
            ResourceLoader.instance = new ResourceLoader();
        }
        return ResourceLoader.instance;
    }

    constructor() {
        this.map = new Map(Resources);
//		console.log(this.map)
        for (let [key,value] of this.map) {
//			console.log(key,value)
//			const image = wx.createImage();
            const image = new Image();//把图片转存成对象
            image.src = value;
            this.map.set(key, image);
        }
    }

    onLoaded(callback) {
        let loadedCount = 0;
        for (let value of this.map.values()) {
            value.onload = ()=> {
                loadedCount++;
                if (loadedCount >= this.map.size) {
                    callback(this.map);
                }
            }
        }
    }
}
