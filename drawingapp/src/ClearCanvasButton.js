import React from "react";
import { useCanvas } from "./CanvasFunctions";

export const ClearCanvasButton = () => {
    const { clearCanvas } = useCanvas()

    return <button onClick={clearCanvas}>Clear</button>
}