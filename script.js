const myCanvas = document.getElementById("myCanvas");
const ctx =myCanvas.getContext("2d");
const point = {x:90,y:190}

const offset = {
    x:myCanvas.width/2,
    y:myCanvas.height/2
}

ctx.translate(offset.x,offset.y)

function drawCoordinateSystem(){
ctx.beginPath();
ctx.moveTo(-offset.x, 0);
ctx.lineTo(myCanvas.width-offset.x,0);
ctx.moveTo(0,-offset.y);
ctx.lineTo(0,myCanvas.height-offset.y);
ctx.setLineDash([5,4]);
ctx.lineWidth = 2;
ctx.strokeStyle="red";
ctx.stroke();
}
drawCoordinateSystem()

document.onmousemove = (event)=>{
    point.x=event.x-offset.x;
    point.y=event.y-offset.y;

    update();
    console.log("mouse is moving x is: ",event.x-offset.x,"y is: ",event.y-offset.y);
}

function update(){
    ctx.clearRect(-offset.x,-offset.y,
        myCanvas.width,myCanvas.height);
       drawCoordinateSystem();
       drawPoint(point)
        
       const {mag,dir} = toPolar(point);
       const same = toXY({mag,dir});
       drawPoint(same,6,"red");

       console.log("magnitude",mag)
       console.log("direction",dir)

       drawArrow(point);
    }

    function drawArrow(tip,color="white",size=50){
        const {dir,mag} = toPolar(tip);
        //first point
        const v1={dir:dir+Math.PI*0.8,mag:size/2};
        const p1=toXY(v1);

        const t1 = {
            x:p1.x+tip.x,
            y:p1.y+tip.y
        }

        drawPoint(t1);
        //second point
        const v2={dir:dir-Math.PI*0.8,mag:size/2};
        const p2=toXY(v2);

        const t2 = {
            x:p2.x+tip.x,
            y:p2.y+tip.y 
        }
        drawPoint(t2);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(tip.x,tip.y);
        ctx.strokeStyle=color;
        ctx.stroke()
    }

    function toXY({mag,dir}){
        console.log("XY: ",dir)
        return {
       x:Math.cos(dir)*mag,
       y:Math.sin(dir)*mag
        }
    }

    function toPolar({x,y}){
        return {
            dir:direction({x,y}),
            mag:magnitude({x,y})
        }
    }

 function direction({x,y}){
    //console.log("direction func y:",y," x: ",x)
   return Math.atan2(y,x)
 }   
function magnitude({x,y}){
    return Math.hypot(x,y)
}


drawPoint(point)
function drawPoint(loc,size=10,color="white"){
  ctx.beginPath();
  ctx.fillStyle = "white"
  ctx.arc(loc.x,loc.y,size/5,0,Math.PI*2)
  ctx.fill()
}