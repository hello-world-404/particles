'use strict';

let xpos;
let ypos;


var stat = document.getElementById("stat");
    var posstat = document.getElementById("posstat");
    var tipFlag = false  // 是否检测
    var faceflag = false // 是否进行拍照
    // 获取video、canvas实例
    var facevideo = document.getElementById('video');
    var facecanvas = document.getElementById('canvas2');
    var facecontext = facecanvas.getContext('2d');
    // 使用监听人脸的包
    var tracker = new tracking.ObjectTracker('face');
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1); 
        // 每次打开弹框先清除canvas没拍的照片
        facecontext.clearRect(0, 0, facecanvas.width, facecanvas.height);
        //打开摄像头
    var tra = tracking.track('video', tracker, { camera: true });
    // 创建监听 每帧都会触发
    tracker.on('track', function(event) {
    if(!tipFlag){
        facecontext.clearRect(0, 0, facecanvas.width, facecanvas.height);
        if (event.data.length === 0) {
            //未检测到人脸
            if(!faceflag){
              stat.innerHTML = "No face";

              setTimeout(() => {
                xpos = NaN;
                ypos = NaN;
              }, 5000);
              
            }
        } else if (event.data.length === 1) {
            //检测到一张人脸
            if(!tipFlag){
                stat.innerHTML="1 face";
                // 给检测到的人脸绘制矩形
                event.data.forEach(function(rect) {
                    
                    xpos = rect.x;
                    ypos = rect.y;
                    //facecontext.strokeRect(rect.x, rect.y, rect.width, rect.height);
                });
            
            }
        } else {
            //检测到多张人脸
            if(!faceflag){
                stat.innerHTML = "More than 1 face";
            }
        }
    }
});


//Init the particle system
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;


let particleArray = [];

const mouse = {
    x: null,
    y: null,
    radius: 200
}



window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x, mouse.y);
    document.getElementById("mousepos").innerHTML = "Mouse position: " + mouse.x + "," +mouse.y;
})



let ftposx = 130;

ctx.fillStyle = 'white';
ctx.textAlign = "center";
ctx.font = 'bold 18px Calibri';
ctx.fillText("QWERTYUIOP", ftposx, 25);
ctx.fillText("ASDFGHJKL",ftposx,40);
ctx.fillText("ZXCVBNM",ftposx,55);
ctx.globalAlpha = .7;
const data = ctx.getImageData(0,0,canvas.width,canvas.height);

document.getElementById("rawtextconf").innerHTML = "Raw text config: " + ctx.font;
document.getElementById("particlealphaconf").innerHTML = "Particle alpha (out of 1): " + ctx.globalAlpha;


class Particle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 40;
        this.baseX = this.x;
        this.baseY = this.y;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.size,0,Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(){

        //Use camera coordinates
        let dx = (xpos * 10) - this.x;
        let dy = (ypos * 2) - this.y;

        posstat.innerHTML = xpos * 10 + "," + ypos * 5;



        //Use mouse coordinates
        //let dx = mouse.x - this.x;
        //let dy = mouse.y - this.y;


        let dist = Math.sqrt(dx * dx + dy* dy);

        if(dist < mouse.radius){
            if(this.size < 44 && this.size > 5){

                //this.size = Math.floor(Math.random() * 3.5) +3;
                this.size = 1.5;

                document.getElementById("sparticlesizeconf").innerHTML = "Small particle size: " + this.size;
            }
        }
        else{
            //document.getElementById("delaytimeconf").innerHTML = "Particle coverage delay time (ms): " + delaytime;

            this.size = Math.floor(Math.random() * 30) +14.5;

            //this.size = 30;

            document.getElementById("bparticlesizeconf").innerHTML = "Big particle size: " + this.size;
        }
    }
}

function init(){
    particleArray = [];

    for(let y = 0, y2 = data.height; y < y2; y++){
        for(let x = 0, x2 = data.width; x < x2; x++){
            if(data.data[(y*4*data.width) + (x*4) + 3] > 128){
                let posx = x;
                let posy = y;
                posx *= 9;
                posy *= 9;
                particleArray.push(new Particle(posx,posy));
            }
        }
    }
}

init();
console.log(particleArray);

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let i = 0; i < particleArray.length; i++){
            particleArray[i].draw();
            particleArray[i].update();
        }
    requestAnimationFrame(animate);
}


animate();