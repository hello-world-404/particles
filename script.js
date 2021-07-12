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
    document.getElementById("mousepos").innerHTML = "Mouse position: " + mouse.x + "," +mouse.y;
})



ctx.fillStyle = 'white';
ctx.font = 'bold 22px Calibri';
ctx.fillText("qh^Jkn", 20, 20);
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
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy* dy);


        if(dist < mouse.radius){
            if(this.size < 44 && this.size > 5){

                //this.size = Math.floor(Math.random() * 7) +3;

                this.size = 1.5;

                document.getElementById("sparticlesizeconf").innerHTML = "Small particle size: " + this.size;
            }
        }
        else{
            let delaytime = 0;
            document.getElementById("delaytimeconf").innerHTML = "Particle coverage delay time (ms): " + delaytime;

            setTimeout(() => {

                //this.size = Math.floor(Math.random() * 22) +12;

                this.size = 30;

                document.getElementById("bparticlesizeconf").innerHTML = "Big particle size (Uniform): " + this.size;
            }, delaytime);
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
            setTimeout(() => {
                particleArray[i].update();
            }, 0);
        }
    requestAnimationFrame(animate);
}


animate();