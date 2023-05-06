import React, { useState, useRef } from 'react';
import { fabric } from 'fabric';
import './style.css';

const MemeGenerator = () => {
  const [canvas, setCanvas] = useState(null);
  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);
  const colorInputRef = useRef(null);

  const handleCanvas = (canvas) => {
    setCanvas(canvas);
    canvas.setBackgroundColor('#fff');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target.result;
      fabric.Image.fromURL(data, function (img) {
        handleCanvas(canvas.add(img));
        if (img.width > canvas.width) {
          img.scaleToWidth(canvas.width);
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAddText = () => {
    const _text = new fabric.Text(textInputRef.current.value, {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: colorInputRef.current.value,
    });
    handleCanvas(canvas.add(_text));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Delete') {
      canvas.remove(canvas.getActiveObject());
    }
  };

  const handleSave = () => {
    const data = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = data;
    link.download = 'image.png';
    link.click();
  };

  return (
    <div className="container">
      <canvas ref={handleCanvas} id="canvas" width={500} height={500}></canvas>
      <div className="sidebar">
        <p>Add Image</p>
        <input type="file" ref={fileInputRef} onChange={handleImageChange} />
        <div className="group">
          <textarea ref={textInputRef} placeholder="Type something"></textarea>
          <input type="color" ref={colorInputRef} />
          <button onClick={handleAddText}>Add Text</button>
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default MemeGenerator;
