//Init tracker

let xpos;
let ypos;
let doc;


//var stat = document.getElementById("stat");
    //var posstat = document.getElementById("posstat");
    var tipFlag = false  // 是否检测
    var faceflag = false // 是否进行拍照
    // 获取video、canvas实例
    //var facevideo = document.getElementById('video');
    //var facecanvas = document.getElementById('canvas2');
    //var facecontext = facecanvas.getContext('2d');
    // 使用监听人脸的包
    var tracker = new tracking.ObjectTracker('face');
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1); 
        // 每次打开弹框先清除canvas没拍的照片
        //facecontext.clearRect(0, 0, facecanvas.width, facecanvas.height);
        //打开摄像头
    var tracker = tracker.track('video', tracker, { camera: true });
    // 创建监听 每帧都会触发
    tracker.on('track', function(event) {
    if(!tipFlag){
        //facecontext.clearRect(0, 0, facecanvas.width, facecanvas.height);
        if (event.data.length === 0) {
            //未检测到人脸
            if(!faceflag){
              stat.innerHTML = "No face";

              xpos = NaN;
              ypos = NaN;
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
        //Display head location information
        posstat.innerHTML = xpos + "," + ypos;


        //Pass information to main worker
        onmessage = function(e) {
            this.postMessage([xpos,ypos]);
          }
    }
});