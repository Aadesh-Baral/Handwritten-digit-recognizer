import React, { useRef, useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth /4;
    canvas.height = window.innerHeight /2;
    canvas.style.width = `${window.innerWidth /4}px`;
    canvas.style.height = `${window.innerHeight /2 }px`;

    const context = canvas.getContext("2d");
    context.scale(1,1);
    context.fillStyle = 'white';
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, [])

  const startDrawing = ({nativeEvent}) => {
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
  }

  const finishDrawing = () => {
      contextRef.current.closePath();
      setIsDrawing(false);
  }
  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke()
  }
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height)
};
const canvasToByte = () => {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d")
  console.log(canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"))

};

  return (
      <div>
        <canvas 
        onMouseDown = {startDrawing}
        onMouseUp = {finishDrawing}
        onMouseMove = {draw}
        ref = {canvasRef}
        />
        <br />
        <button onClick ={clearCanvas} variant="primary">Clear</button>
        <button onClick = {canvasToByte}>Save</button>
      </div>
  );
}

export default App;
