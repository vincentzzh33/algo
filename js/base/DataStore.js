//变量缓存器,方便我们在不同的类型中访问
export class DataStore{

    static getInstance(){
        if(!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    constructor(){
        this.map = new Map();
    }

    //随时销毁
    put(key,value){
        if(typeof value==='function'){
            value = new value();
        }
        this.map.set(key,value);
        return this;//链式技巧
    }

    get(key){
        return this.map.get(key);
    }

    destory(){
        for(let value of this.map.values()){
            value = null;
        }
    }

    getImage(key){
        //console.log(DataStore.getInstance().get(key));
        return this.resource.get(key);
    }
}
