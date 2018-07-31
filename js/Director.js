import {DataStore} from "./base/DataStore.js";
import {Circle} from "./player/Circle.js";
export class Director {

    //单例
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
        this.algoVisHelper = this.dataStore.algoVisHelper;

        // this.isGameOver = true;
        //console.log(this.dataStore);
        //this.snake = new Snake();

        //this.x1 = this.x2 = this.y1 = this.y2 = 0;
        //this.keyPush(this.snake);
        document.addEventListener("keydown", (evt)=> {
            this.snake = this.dataStore.get('snake');
            this.tank = this.dataStore.get('tank');
            //console.log(this.snake);
            switch (evt.keyCode) {
                case 37://左箭头
                    this.tank.move(0);
                    this.snake.xv = -1;
                    this.snake.yv = 0;
                    break;
                case 38:
                    this.tank.move(1);
                    this.snake.xv = 0;
                    this.snake.yv = -1;
                    break;
                case 39:
                    this.tank.move(2);
                    this.snake.xv = 1;
                    this.snake.yv = 0;
                    break;
                case 40:
                    this.tank.move(3);
                    this.snake.xv = 0;
                    this.snake.yv = 1;
                    break;
            }
        });
        this.timer = null;

    }

    run(money) {
        if (!this.isGameOver) {
            //this.dataStore.get('StartButton').draw();

            //this.algoVisHelper.ctx.fillStyle = this.algoVisHelper.Blue;
            //this.algoVisHelper.ctx.fillRect(0, 0, this.dataStore.canvas.width, this.dataStore.canvas.height);//(this.dataStore.canvas.height-this.dataStore.canvas.width)/2
            //let snake = this.dataStore.get('snake');
            //let tank = this.dataStore.get('tank');
            //tank.draw(this.algoVisHelper.ctx);
            //this.keyPush(snake);//监听动作
            //snake.xv=-1;
            //snake.yv=0;
            //this.snake.game();
            //snake.game();
            money.sort(function (a, b) {
                return a - b;
            });
            let helper = this.algoVisHelper;
            helper.clear();
            //setInterval(this.run,1000/15);
            //this.dataStore.get('Snake').game()
            //setInterval(this.run(),100);
            //let i =0;

            //console.log(money.length);
            let w = helper.width / money.length;
            let h = helper.height;
            //console.log(w);

            //ctx.fillRect(0,0,300,200);
            for (let i = 0; i < money.length; i++) {
                if (money[i] > 0) {
                    helper.setColor(helper.Blue);
                    helper.fillRect(i * w + 1, h / 2 - money[i], w - 1, money[i]);
                } else {
                    helper.setColor(helper.Red);
                    helper.fillRect(i * w + 1, h / 2, w - 1, -money[i]);
                }

                //if(money[i]>0){
                let j = Math.floor(Math.random() * money.length);
                money[i] -= 1;
                money[j] += 1;
                //}
            }
            //money.sort();

        } else {
            console.log('game over');
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destory();
        }

        //let timer = requestAnimationFrame(()=>this.run(money));//循环自己
        let timer = null;
        timer = setInterval(()=> {
            this.run(money);
        }, 1000 / 2);

        document.getElementById('end').addEventListener('click', function () {
            clearInterval(timer);
        });
        document.getElementById('begin').addEventListener('click', ()=> {
            timer = setInterval(()=> {
                this.run(money);
            }, 1000 / 2);
        });
    }

    run2(circle, points, N, insideC) {

        //第2个案例的业务逻辑
        this.pi(circle, points, N, insideC);

        //循环逻辑
        let timer = null;
        timer = setInterval(()=> {
            this.pi(circle, points, N, insideC);
        }, 1000 / 200);

        document.getElementById('end').addEventListener('click', function () {
            clearInterval(timer);
        });
        document.getElementById('begin').addEventListener('click', ()=> {
            timer = setInterval(()=> {
                this.pi(circle, points, N, insideC);
            }, 1000 / 200);
        });
    }

    loop(fun, arg) {
        //循环逻辑
        let _this = fun;
        let timer = null;
        timer = setInterval(()=> {
            _this(arg)
        }, 1000 / 200);

        document.getElementById('end').addEventListener('click', function () {
            clearInterval(timer);
        });
        document.getElementById('begin').addEventListener('click', ()=> {
            timer = setInterval(()=> {
                _this.fun(arg)
            }, 1000 / 200);
        });
    }

    test() {
        let helper = this.algoVisHelper;
        console.log(helper);
        let w = helper.width;
        let h = helper.height;
        helper.setStrokeWidth(5);
        helper.setColor(helper.Red);
        helper.fillCircle(w / 2, h / 2, h / 2);
        helper.strokeCircle(w / 2, h / 2, h / 2);
        helper.strokeRect(0, 0, 200, 100);
        helper.fillRect(0, 10, 200, 100);
        let img = this.dataStore.getImage('startButton');
        helper.putImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
        helper.drawText('aaa', 0, 200);
    }

    money(money) {
        money.sort(function (a, b) {
            return a - b;
        });
        let ctx = this.algoVisHelper.ctx;
        ctx.clearRect(0, 0, this.algoVisHelper.canvas.width, this.algoVisHelper.canvas.height);
        //setInterval(this.run,1000/15);
        //this.dataStore.get('Snake').game()
        //setInterval(this.run(),100);
        //let i =0;

        //console.log(money.length);
        let w = this.algoVisHelper.canvas.width / money.length;
        let h = this.algoVisHelper.canvas.height;
        //console.log(w);

        //ctx.fillRect(0,0,300,200);
        for (let i = 0; i < money.length; i++) {
            if (money[i] > 0) {
                ctx.fillStyle = this.algoVisHelper.Blue;
                ctx.fillRect(i * w + 1, h / 2 - money[i], w - 1, money[i]);
            } else {
                ctx.fillStyle = this.algoVisHelper.Red;
                ctx.fillRect(i * w + 1, h / 2, w - 1, -money[i]);
            }

            //if(money[i]>0){
            let j = Math.floor(Math.random() * money.length);
            money[i] -= 1;
            money[j] += 1;
            //}
        }
    }

    pi(circle, points, N, insideC) {
        //console.log(insideC);
        //console.log(points.length);
        //面积的公式                 圆形pi*r*r 方形2r*2r
        console.log('pi', 4 * insideC.length / points.length);

        let helper = this.algoVisHelper;
        //helper.grd(false, helper.Blue, helper.Green);
        helper.fillRect(0, 0, helper.width, helper.height);
        let w = helper.width;
        let h = helper.height;
        helper.clear();//可以不用每次绘制全部,只要画那个没画过的就行
        helper.setStrokeWidth(3);
        helper.strokeCircle(circle.getX(), circle.getY(), circle.getR(), helper.Blue);//外部的大圆
        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            if (circle.contain(p)) {
                helper.fillCircle(p.x, p.y, 3, helper.Red);
            } else {
                helper.fillCircle(p.x, p.y, 3, helper.Green);
            }
        }

        if (points.length < N) {
            let p = new Circle(Math.random() * w, Math.random() * h, 3);
            points.push(p);
            if(circle.contain(p)){
                insideC.push(1);
            }
        }

    }

    run3(arr, index) {
        //let arr = this.dataStore.get('arg');
        let helper = this.algoVisHelper;
        let w = helper.width / arr.length;

        helper.clear();
        for (let i = 0; i < arr.length; i++) {
            let tmp = arr[i];
            if (i < index) {
                helper.setColor(helper.Red);
                helper.fillText(tmp, w * i + w / 3, helper.height - tmp * 10 - 30, helper.Red);
            } else if (i === index) {
                helper.setColor(helper.LightBlue);
                helper.fillText(tmp, w * i + w / 3, helper.height - tmp * 10 - 30, helper.LightBlue);
            } else {
                helper.setColor(helper.Grey);
                helper.fillText(tmp, w * i + w / 3, helper.height - tmp * 10 - 30, helper.Grey);
            }

            helper.fillRect(w * i, helper.height - tmp * 10, w - 2, tmp * 10);
        }


        //for (let i = 0; i < arr.length; i++) {
        let i = index;
        let min = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        helper.clear(w * min, helper.height - arr[min] * 10, w - 2, arr[min] * 10);
        helper.setColor(helper.Indigo);
        helper.fillText(arr[min], w * min + w / 3, helper.height - arr[min] * 10 - 30, helper.Indigo);
        helper.fillRect(w * min, helper.height - arr[min] * 10, w - 2, arr[min] * 10);

        if (min != i) {
            let tmp = arr[min];
            arr[min] = arr[i];
            arr[i] = tmp;
        }
        //this.sleep(1000);
        //helper.clear();
        //for (let i = 0; i < arr.length; i++) {
        //    let tmp = arr[i];
        //    helper.fillText(tmp, w * i + w / 3, helper.height - tmp * 10 - 30, helper.Blue);
        //    helper.fillRect(w * i, helper.height - tmp * 10, w - 2, tmp * 10);
        //}

        //}

        console.log(arr);

        index++;

        //let timer = requestAnimationFrame(()=>this.run3(arr, index));//循环自己
        //helper.timer = null;
        //console.log(helper.timer);
        //if(!helper.timer){
        let timer = null;
        timer = setTimeout(()=> {
            this.run3(arr, index);
        }, 1000);
        //}


        let sorted = true;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                sorted = false;
                console.log(sorted);
            }
        }
        if (sorted) {
            clearTimeout(timer);
        }

        document.getElementById('end').addEventListener('click', function () {
            clearInterval(timer);
        });
        document.getElementById('begin').addEventListener('click', ()=> {
            timer = setTimeout(()=> {
                this.run3(arr, index);
            }, 1000);
        });
    }

    sleep(millis) {
        var now = new Date();
        var exitTime = now.getTime() + millis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    }

    run4(arr, index) {
        //let arr = this.dataStore.get('arg');
        let helper = this.algoVisHelper;
        let w = helper.width / arr.length;

        helper.clear();
        for (let i = 0; i < arr.length; i++) {
            let tmp = arr[i];
            if (i < index) {
                helper.setColor(helper.Red);
                helper.fillText(tmp, w * i + w / 3, helper.height - tmp * 10 - 30, helper.Red);
            } else if (i === index) {
                helper.setColor(helper.LightBlue);
                helper.fillText(tmp, w * i + w / 3, helper.height - tmp * 10 - 30, helper.LightBlue);
            } else {
                helper.setColor(helper.Grey);
                helper.fillText(tmp, w * i + w / 3, helper.height - tmp * 10 - 30, helper.Grey);
            }

            helper.fillRect(w * i, helper.height - tmp * 10, w - 2, tmp * 10);
        }


        //for (let i = 0; i < arr.length; i++) {
        let i = index;
        let tmp = arr[i];
        for (var j = i; j > 0 && arr[j - 1] > tmp; j--) {
            arr[j] = arr[j - 1];
        }
        helper.clear(w * j, helper.height - arr[j] * 10, w - 2, arr[j] * 10);
        helper.setColor(helper.Indigo);
        helper.fillText(arr[j], w * j + w / 3, helper.height - arr[j] * 10 - 30, helper.Indigo);
        helper.fillRect(w * j, helper.height - arr[j] * 10, w - 2, arr[j] * 10);

        arr[j] = tmp;
        //this.sleep(1000);
        //helper.clear();
        //for (let i = 0; i < arr.length; i++) {
        //    let tmp = arr[i];
        //    helper.fillText(tmp, w * i + w / 3, helper.height - tmp * 10 - 30, helper.Blue);
        //    helper.fillRect(w * i, helper.height - tmp * 10, w - 2, tmp * 10);
        //}

        //}

        console.log(arr);

        index++;

        //let timer = requestAnimationFrame(()=>this.run3(arr, index));//循环自己
        //helper.timer = null;
        //console.log(helper.timer);
        //if(!helper.timer){
        let timer = null;
        timer = setTimeout(()=> {
            this.run4(arr, index);
        }, 1000);
        //}

        let sorted = true;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                sorted = false;
                //console.log(sorted);
            }
        }
        if (sorted) {
            clearTimeout(timer);
        }

        document.getElementById('end').addEventListener('click', function () {
            clearInterval(timer);
        });
        document.getElementById('begin').addEventListener('click', ()=> {
            timer = setTimeout(()=> {
                this.run4(arr, index);
            }, 1000);
        });
    }

    run5(maze, visited, entranceX, enteranceY, exitX, exitY, x, y,path) {//递归求解
        let helper = this.algoVisHelper;
        const w = helper.width / maze.length;
        const h = helper.height / maze.length;
        //画迷宫,和走过的路
        for (let i = 0; i < maze.length; i++) {
            for (let j = 0; j < maze[i].length; j++) {
                if (maze[i][j] === '#') {
                    helper.setColor(helper.Blue);
                } else if (visited[i][j] === true) {
                    helper.setColor(helper.Yellow);
                }
                else {
                    helper.setColor(helper.White);
                }
                helper.fillRect(j * w, i * h, w, h);
            }
        }

        visited[x][y] = true;
        path[x][y] = true;
        if (x === exitX && y === exitY) {
            console.log('ok');
            return; //有return 可以结束动画
        }
        let d = [
            [-1, 0],//左
            [0, 1],//下
            [1, 0],//右
            [0, -1]//上
        ];
        for (let i = 0; i < 4; i++) {
            let newX = x + d[i][0];
            let newY = y + d[i][1];
            if (newX >= 0 && newX <= 101 && newY >= 0 && newY <= 101 && maze[newX][newY] !== '#' && !visited[newX][newY]) {
                //let timer = setTimeout(()=> {
                //    this.run5(maze, visited, entranceX, enteranceY, exitX, exitY, newX, newY,path);
                //}, 1);
                let timer = requestAnimationFrame(()=>this.run5(maze, visited, entranceX, enteranceY, exitX, exitY, newX, newY,path));//循环自己
            }
        }
    }

    run6(maze, visited, entranceX, enteranceY, exitX, exitY, x, y,path) {//非递归
        let helper = this.algoVisHelper;
        const w = helper.width / maze.length;
        const h = helper.height / maze.length;
        //画迷宫,和走过的路
        for (let i = 0; i < maze.length; i++) {
            for (let j = 0; j < maze[i].length; j++) {
                if (maze[i][j] === '#') {
                    helper.setColor(helper.Blue);
                } else if (visited[i][j] === true) {
                    helper.setColor(helper.Yellow);
                }
                else {
                    helper.setColor(helper.White);
                }
                helper.fillRect(j * w, i * h, w, h);
            }
        }

        function Stack() {
            var items = [];
            this.push = function(element){
                items.push(element);
            };
            this.pop = function(){
                return items.pop();
            };
            this.peek = function(){
                return items[items.length-1];
            };
            this.isEmpty = function(){
                return items.length == 0;
            };
            this.size = function(){
                return items.length;
            };
            this.clear = function(){
                items = [];
            };
            this.print = function(){
                console.log(items.toString());
            };
            this.toString = function(){
                return items.toString();
            };
        }

        function Position(x,y){
            this.x = x;
            this.y = y;
        }

        let stack = new Stack();
        stack.push(new Position(entranceX,enteranceY));

        visited[x][y] = true;
        let d = [
            [-1, 0],//左
            [0, 1],//下
            [1, 0],//右
            [0, -1]//上
        ];

        while(!stack.isEmpty()){
            let p = stack.pop();
            //let timer = setTimeout(()=> {
            //    //画这个点
            //    helper.setColor(helper.Yellow);
            //    helper.fillRect(p.x * w, p.y * h, w, h);
            //}, 200);


            if (p.x === exitX && p.y === exitY) {
                console.log('ok');
                return; //有return 可以结束动画
            }

            for (let i = 0; i < 4; i++) {
                let newX = x + d[i][0];
                let newY = y + d[i][1];
                if (newX >= 0 && newX <= 101 && newY >= 0 && newY <= 101 && maze[newX][newY] !== '#' && !visited[newX][newY]) {
                    stack.push(new Position(newX,newY));
                }
            }
        }


        console.log('ok');





    }
}
