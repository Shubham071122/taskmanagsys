import React, { useState } from 'react';

function DropArea({ onDrop }) {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={e => e.preventDefault()}
      className={`${
        showDrop
          ? 'w-full h-[100px] border-2 rounded-lg p-4 my-4 opacity-5 transition-all duration-300 ease-in-out'
          : 'opacity-0 py-1'
      }`}
    >
        
    </section>
  );
}

export default DropArea;
