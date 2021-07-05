'use strict';

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
    console.log(mouse.x, mouse.y);
})



ctx.fillStyle = 'white';
ctx.font = 'bold 11.5px Heveltica';
ctx.fillText("Hello world, this is a demo.", 20, 20);
ctx.globalAlpha = 0.5;
const data = ctx.getImageData(0,0,canvas.width,canvas.height);


class Particle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 40;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random()*50)+1;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.size,0,Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy* dy);


        if(dist < mouse.radius){
            if(this.size < 44 && this.size > 5){
                this.size = Math.floor(Math.random() * 7) +3;
            }
        }
        else{
            setTimeout(() => {
                this.size = Math.floor(Math.random() * 22) +12;
            }, 400);
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
                posx *= 11;
                posy *= 11;
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
            setTimeout(() => {
                particleArray[i].update();
            }, 600);
        }
    requestAnimationFrame(animate);
}


animate();