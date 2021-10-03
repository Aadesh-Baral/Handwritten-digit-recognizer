import React, { useEffect } from "react";
import { useCanvas } from "./CanvasFunctions";

export function Canvas() {
    const {
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
    } = useCanvas();
    
    useEffect(() => {
        prepareCanvas();
    }, []);
    
    return (
        <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
    );
}