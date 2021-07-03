'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

let moving = false;


const mouse = {
    x: null,
    y: null,
    //radius: 500
}



window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    mouse.radius = 200;
    console.log(mouse.x, mouse.y);
    moving = true;
})



ctx.fillStyle = 'white';
ctx.font = 'bold 10px Heveltica';
ctx.fillText("A B C D E F G H I J K L M N", 5, 10);
const data = ctx.getImageData(0,0,canvas.width,canvas.height);


class Particle{
    constructor(x,y,s){
        this.x = x;
        this.y = y;
        this.size = s;
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
        let fdirx = dx / dist;
        let fdiry = dy / dist;
        let mmdist = mouse.radius;
        let force = (mmdist - dist) / mmdist;
        let dirx = fdirx * force * this.density;
        let diry = fdiry * force * this.density;


        if(dist < mouse.radius){
            this.x += dirx;
            this.y += diry;
        }
        else{
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
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
                let sz = Math.floor(Math.random() * 10) + 2;
                particleArray.push(new Particle(posx,posy,sz));
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