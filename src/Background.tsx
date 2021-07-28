import { Backdrop } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';


let points : any = []

for(let i = 0; i < 100; i++){
    points.push({x:Math.random(), y: Math.random(), vx: Math.random()*2-1, vy: Math.random()*2-1 })
}

export function Background(props:any) {
    const canvasRef = useRef(null)

    const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
        
      
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#141414'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let maxDistance = 1/7;
        ctx.fillStyle = '#ffffff'
        
        const drawLine = (x1:number,y1:number, x2:number, y2:number)=>{
            ctx.beginPath();
            ctx.moveTo(x1*ctx.canvas.width, y1*ctx.canvas.height);
            ctx.lineTo(x2*ctx.canvas.width, y2*ctx.canvas.height);
            ctx.lineWidth = 1;
            ctx.stroke()
            ctx.closePath();
        }

        const drawCircle = (x:number,y:number, r:number)=>{
            ctx.beginPath();
            ctx.ellipse(x*ctx.canvas.width,y*ctx.canvas.height,r,r,0,0,2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }

        points.forEach((p:any)=>{
            drawCircle(p.x,p.y,3);
        })

        points.forEach((p1:any)=>{
            points.forEach((p2:any)=>{
                let dis = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
                if(dis < maxDistance){
                    const offset = 20;
                    let strength = ((maxDistance-dis)/maxDistance);
                    
                    

                    strength = strength*255 + offset;
                    ctx.strokeStyle = "rgb("+strength+","+strength+","+strength+")"
                    drawLine(p1.x, p1.y, p2.x, p2.y);
                }
            })
        })

        points.forEach((p:any)=>{
            p.x += p.vx * 0.0003;
            p.y += p.vy * 0.0003;
            if(p.x < 0) p.x = 1+p.x;
            if(p.y < 0) p.y = 1+p.y;
            if(p.x > 1) p.x = p.x-1;
            if(p.y > 1) p.y = p.y-1;
        })
    
        
        
        
    }

    useEffect(() => {

        const canvas : any = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d')
            let frameCount = 0
            let animationFrameId:any;

            //Our draw came here
            const render = () => {
                frameCount++
                draw(context, frameCount)
                animationFrameId = window.requestAnimationFrame(render)
            }
            render()

            return () => {
                window.cancelAnimationFrame(animationFrameId)
            }
        }
    }, [draw])

    return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} {...props} />
}