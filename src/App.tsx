import React, { useState } from 'react';
import { FileImageFilled } from '@ant-design/icons/es/icons/index';
import './App.css';
import { Image } from 'antd';

function App() {
  const [image, setImage] = useState('monito.jpg')
  const [open, setOpen] = useState(false);

  const handlePaste = async() => {
    try {
      const clipboard = await navigator.clipboard.read();
      for (const item of clipboard) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            const reader = new FileReader();
            reader.onload = (e) => {
              setImage(e.target?.result as string);
              setOpen(true);
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    } 
    catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  }

  const pasteEvent = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const items = Array.from(event.clipboardData.items);
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImage(e.target?.result as string);

            setOpen(true);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  return (<>
    <Image 
      src={image} 
      alt="Pasted Image" 
      style = {{display: 'none'}}
      preview={{ open: open, onOpenChange: (value) => setOpen(value) }}
    />
    <div id="paste-area" onPaste={pasteEvent} onClick={handlePaste}>
      <h1>PASTE IMAGE TO VIEW</h1>
      <FileImageFilled style={{ fontSize: '54px' }} />
      <h3>You can also click me</h3>
    </div>
  </>)
}

export default App;
