import React, { useState, useEffect } from 'react';

function App() {
  const [selectedColor, setSelectedColor] = useState('gray');
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [dialerValue, setDialerValue] = useState(0);
  const [shirtDimensions, setShirtDimensions] = useState({ width: 48, height: 56 });
  const [dialerRotation, setDialerRotation] = useState(0);
  const [colorDialerRotation, setColorDialerRotation] = useState(0);

  const colors = [
    { name: 'gray', value: '#808080', displayName: 'Gray', image: 'https://pics.clipartpng.com/Red_T_Shirt_PNG_Clip_Art-3105.png' },
    { name: 'pink', value: '#FF69B4', displayName: 'Pink', image: 'https://img.favpng.com/25/23/12/t-shirt-crew-neck-clothing-polo-shirt-png-favpng-KNk6GdzsxSge5rru90pP00jqq.jpg' },
    { name: 'navy', value: '#000080', displayName: 'Navy', image: 'https://static.vecteezy.com/system/resources/thumbnails/044/813/150/small_2x/blank-navy-blue-t-shirt-mockup-isolated-on-transparent-background-png.png' },
    { name: 'brown', value: '#8B4513', displayName: 'Brown', image: 'https://image.pngaaa.com/813/2498813-middle.png' },
    { name: 'black', value: '#000000', displayName: 'Black', image: 'https://png.pngtree.com/png-vector/20201127/ourmid/pngtree-black-t-shirt-png-image_2454532.jpg' },
    { name: 'teal', value: '#008080', displayName: 'Teal', image: 'https://e7.pngegg.com/pngimages/69/65/png-clipart-t-shirt-sleeve-green-cotton-kaos-polos-tshirt-white-thumbnail.png' },
    { name: 'blue', value: '#0000FF', displayName: 'Blue', image: 'https://w7.pngwing.com/pngs/557/299/png-transparent-t-shirt-polo-shirt-clothing-sleeve-t-shirt-blue-tshirt-blue-active-shirt-thumbnail.png' },
    { name: 'red', value: '#FF0000', displayName: 'Red', image: 'https://pics.clipartpng.com/Red_T_Shirt_PNG_Clip_Art-3105.png' }
  ];

  const sizes = ['S', 'M', 'L', 'XL'];

  const sizeScaleMap = {
    'S': 0.9,
    'M': 1.0,
    'L': 1.05,
    'XL': 1.1
  };

  const features = [
    '100% Cotton',
    'Import Quality',
    'Machine Wash',
    'Short sleeve graphic tee'
  ];

  useEffect(() => {
    const baseWidth = 40;
    const baseHeight = 48;
    const scaleFactor = sizeScaleMap[selectedSize] || 1.0;
    
    const widthIncrement = 5;
    const heightIncrement = 5;
    
    const sizeIndex = sizes.indexOf(selectedSize);
    const width = baseWidth + (sizeIndex * widthIncrement);
    const height = baseHeight + (sizeIndex * heightIncrement);
    
    setShirtDimensions({
      width: width,
      height: height
    });
  }, [selectedSize]);


  useEffect(() => {
    const colorIndex = colors.findIndex(color => color.name === selectedColor);
    const totalColors = colors.length;
    const anglePerColor = 360 / totalColors; 
    const targetRotation = -(colorIndex * anglePerColor) + 270; 
    setColorDialerRotation(targetRotation);
  }, [selectedColor]); 

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleDialerChange = (newValue) => {
    setDialerValue(Math.max(0, Math.min(100, newValue)));
  };

  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
    const sizeIndex = sizes.findIndex(size => size === newSize);
    const totalSizes = sizes.length;
    const anglePerSize = 180 / (totalSizes - 1); 
    const targetRotation = -(sizeIndex * anglePerSize);
    setDialerRotation(targetRotation);
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
  };

  const handleBuy = () => {
    alert(`Added to cart: ${quantity}x SURF T-SHIRT in ${selectedColor} size ${selectedSize}`);
  };

  const getCurrentShirtImage = () => {
    const selectedColorObj = colors.find(color => color.name === selectedColor);
    return selectedColorObj ? selectedColorObj.image : colors[0].image;
  };

  return (
    <div className="min-h-screen bg-surf-orange flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
       
        <div className="bg-black text-white px-4 py-1 flex justify-between items-center text-xs">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <div className="w-4 h-2 border border-white rounded-sm">
              <div className="w-3 h-1 bg-white rounded-sm ml-0.5 mt-0.5"></div>
            </div>
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-5 h-2 bg-white rounded-sm ml-0.5 mt-0.5"></div>
            </div>
          </div>
        </div>

       
        <div className="px-4 py-3 flex items-center justify-between">
          <button className="text-surf-dark-gray">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-surf-light-gray rounded-full"></div>
            <div className="w-3 h-3 bg-surf-orange rounded-full"></div>
            <div className="w-2 h-2 bg-surf-light-gray rounded-full"></div>
          </div>
          <div className="w-6"></div>
        </div>

               
        <div className="px-4 pb-4">
          <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center" style={{ height: '300px' }}>
            <div className="relative w-full h-full">
             
              {Array.from({ length: quantity }, (_, index) => (
                <div 
                  key={index}
                  className="absolute transition-all duration-300 ease-in-out"
                  style={{ 
                    width: '160px',
                    height: '200px',
                    left: `${60 + (index * 20)}px`,
                    top: `${20 + (index * 10)}px`,
                    zIndex: quantity - index,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img 
                    src={getCurrentShirtImage()}
                    alt="SURF T-Shirt"
                    className="w-full h-full object-contain rounded-t-full"
                    style={{
                      transform: `scale(${sizeScaleMap[selectedSize] || 1.0})`,
                      transition: 'transform 0.3s ease-in-out',
                      opacity: 1
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

       
        <div className="px-4 pb-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-xl font-bold text-surf-dark-gray">SURF T-SHIRT</h1>
              <p className="text-sm text-surf-light-gray">Product No: TS4236987</p>
            </div>
            <div className="bg-surf-orange text-white px-4 py-2 rounded-full text-sm font-medium">
              $ 5.89
            </div>
          </div>

         
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-surf-orange rounded-full"></div>
                <span className="text-sm text-surf-gray">{feature}</span>
              </div>
            ))}
          </div>
        </div>

       
        <div className="px-4 pb-6 relative top-[150px]">
          <div className="relative w-80 h-80 mx-auto">
           
            <div className="absolute inset-0 rounded-full border-1 border-gray-300 bg-white"  style={{ boxShadow: '1px 1px 12px 1px rgba(0,0,0,0.45)' }}>
              <div className="absolute inset-4 rounded-full bg-white shadow-inner"></div>
              
             
              <div className="absolute w-3 h-3 bg-white rounded-full border-2 border-white shadow-lg" 
                   style={{ 
                     left: 'calc(50% + 100px)', 
                     top: 'calc(50% - 100px)',
                     transform: 'translate(-50%, -50%)'
                   }}>
              </div>
              
             
              <div 
                className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out"
                style={{ transform: `rotate(${colorDialerRotation}deg)` }}
              >
                <div className="relative w-80 h-80">
                  {colors.map((color, index) => {
                    const angle = (index / colors.length) * 360; 
                    const radius = 140;
                    const x = Math.cos(angle * Math.PI / 180) * radius;
                    const y = Math.sin(angle * Math.PI / 180) * radius;
                    
                    return (
                      <button
                        key={color.name}
                        onClick={() => handleColorChange(color.name)}
                        className={`absolute w-8 h-8 rounded-full border-1 border-gray-300 transition-all duration-200 ${
                          selectedColor === color.name
                            ? 'scale-125 border-surf-orange shadow-lg'
                            : 'border-gray-300'
                        }`}
                        style={{
                          backgroundColor: color.value,
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: `translate(-50%, -50%) rotate(${-colorDialerRotation}deg)`
                        }}
                        title={color.displayName}
                      ></button>
                    );
                  })}
                  

                  {selectedColor && (() => {
                    const colorIndex = colors.findIndex(c => c.name === selectedColor);
                    const angle = (colorIndex / colors.length) * 360;
                    const radius = 140;
                    const x = Math.cos(angle * Math.PI / 180) * radius;
                    const y = Math.sin(angle * Math.PI / 180) * radius;
                    
                    return (
                      <div 
                        className="absolute w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-surf-orange"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y - 20}px)`,
                          transform: `translate(-50%, -50%) rotate(${-colorDialerRotation}deg)`
                        }}
                      ></div>
                    );
                  })()}
                </div>
              </div>
            </div>

            
            <div className="absolute inset-12 rounded-full border-1 border-gray-300 bg-white" style={{ boxShadow: '1px 1px 12px 1px rgba(0,0,0,0.45)' }}>
              <div className="absolute inset-4 rounded-full bg-white shadow-inner"></div>
              
              
              <div 
                className="absolute inset-4 flex items-center justify-center transition-transform duration-500 ease-in-out"
                style={{ transform: `rotate(${dialerRotation}deg)` }}
              >
                <div className="relative w-48 h-48">
                  {sizes.map((size, index) => {
                    const angle = (index / (sizes.length - 1)) * 180 - 90; // 180 degree arc for 4 sizes
                    const radius = 90;
                    const x = Math.cos(angle * Math.PI / 180) * radius;
                    const y = Math.sin(angle * Math.PI / 180) * radius;
                    
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`absolute w-10 h-10 transition-all duration-200 flex items-center justify-center font-semibold ${
                          selectedSize === size
                            ? 'scale-125  text-black '
                            : 'border-gray-300 text-surf-dark-gray'
                        }`}
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: `translate(-50%, -50%) rotate(${-dialerRotation}deg)`
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
              
         
            </div>

     

            
            <div className="absolute inset-24 rounded-full border-1 border-gray-300 bg-white" style={{ boxShadow: '1px 1px 12px 1px rgba(0,0,0,0.45)' }}>
              <div className="absolute inset-4 rounded-full bg-white shadow-inner"></div>
              
                  
              <div 
                className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out"
                  
              >
                <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                 
                  <div className="w-8 h-6 bg-gray-100 rounded flex items-center justify-center font-semibold text-surf-dark-gray text-xs">
                    {quantity}
                  </div>
               
                </div>
                <div className='flex items-center justify-center space-x-2'>
                <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-6 h-6 flex items-center justify-center text-surf-dark-gray hover:border-surf-orange transition-colors text-xs"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                <button
                  onClick={handleBuy}
                  className="w-12 h-12 bg-surf-orange text-white rounded-full font-semibold text-xs hover:bg-orange-600 transition-colors duration-200 shadow-lg"
                >
                  BUY
                </button>
             
              <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-6 h-6 flex items-center justify-center text-surf-dark-gray hover:border-surf-orange transition-colors text-xs"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  
                </div>
                </div>
              </div>
              
         
            </div>
    
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;