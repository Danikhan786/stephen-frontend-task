import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, Minus, Plus, Star, Shirt } from 'lucide-react';

interface ColorOption {
  id: string;
  name: string;
  color: string;
}

interface SizeOption {
  id: string;
  name: string;
  available: boolean;
}

const colorOptions: ColorOption[] = [
  { id: 'white', name: 'White', color: '#FFFFFF' },
  { id: 'black', name: 'Black', color: '#000000' },
  { id: 'gray', name: 'Gray', color: '#6B7280' },
  { id: 'pink', name: 'Pink', color: '#EC4899' },
  { id: 'orange', name: 'Orange', color: '#F97316' },
  { id: 'yellow', name: 'Yellow', color: '#FACC15' },
  { id: 'red', name: 'Red', color: '#EF4444' },
  { id: 'green', name: 'Green', color: '#10B981' },
  { id: 'brown', name: 'Brown', color: '#854D0E' },
  { id: 'indigo', name: 'Indigo', color: '#f9afaf' },
  { id: 'lime', name: 'Lime', color: '#84CC16' },
  { id: 'rose', name: 'Rose', color: '#c27ba0' },

];

const sizeOptions: SizeOption[] = [
  { id: 'xxl', name: 'XXL', available: true },
  { id: 'xl', name: 'XL', available: true },
  { id: 'l', name: 'L', available: true },
  { id: 'm', name: 'M', available: true },
  { id: 's', name: 'S', available: true },
  // { id: 'xs', name: 'XS', available: true },

];

const productFeatures = [
  '100% Cotton',
  'Import Quality',
  'Machine Wash',
  'Short sleeve graphic tee'
];

function App() {
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [selectedSize, setSelectedSize] = useState<string>('l');
  const [quantity, setQuantity] = useState<number>(2);
  const [colorRotation, setColorRotation] = useState<number>(0);
  const [sizeRotation, setSizeRotation] = useState<number>(0);
  const [cartItems, setCartItems] = useState<number>(0);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartAnimation, setCartAnimation] = useState<boolean>(false);



  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Calculate color rotation based on selected color
  useEffect(() => {
    const colorIndex = colorOptions.findIndex(color => color.id === selectedColor);
    const totalColors = colorOptions.length;
    const anglePerColor = 360 / totalColors; // 360 degrees for full circle
    const targetRotation = -(colorIndex * anglePerColor) + 270; // Start from top (270 degrees)
    setColorRotation(targetRotation);
  }, [selectedColor]);

  // Calculate size rotation based on selected size
  useEffect(() => {
    const sizeIndex = sizeOptions.findIndex(size => size.id === selectedSize);
    const totalSizes = sizeOptions.length;
    const anglePerSize = 180 / (totalSizes - 1); // 180 degrees for semicircle
    const targetRotation = -(sizeIndex * anglePerSize);
    setSizeRotation(targetRotation);
  }, [selectedSize]);

  const handleBuy = () => {
    setCartItems(prev => prev + quantity);
    setShowCart(true);
    setCartAnimation(true);

    // Reset animation after it completes
    setTimeout(() => {
      setCartAnimation(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen min-[427px]:bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400">
      {/* Responsive Container */}
      <div className=":flex-col items-center max-[426px]:justify-center max-[426px]:min-h-screen  min-[427px]:flex min-[427px]:flex-col min-[427px]:lg:flex-row min-[427px]:items-center min-[427px]:justify-center min-[427px]:min-h-screen min-[426px]:p-2 min-[426px]:sm:p-4">
        {/* Phone Container */}
        <div className="bg-white shadow-2xl overflow-hidden" style={{ height: window.innerWidth <= 426 ? '845px' : '700px', borderRadius: window.innerWidth <= 426 ? '0px' : '35px' }}>

          {/* Header */}
          <div className="flex justify-between items-center px-4 sm:px-9 py-3 sm:py-4  -ms-6">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-7 h-7 text-gray-700" style={{ marginLeft: window.innerWidth <= 426 ? '0px' : '-15px' }} />
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index < quantity ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
            <div className="relative">
              {/* Cart Shirt Image with Badge */}
              {showCart && (
                <div className={`absolute -top-6 -right-5  transition-all duration-500 ${cartAnimation ? 'scale-110' : 'scale-100'}`}>
                  <div className="relative">
                    <img
                      src="https://pics.clipartpng.com/midle/Male_White_Shirt_PNG_Clipart-942.png"
                      alt="Cart Shirt"
                      className="w-12 h-12 object-contain"
                      style={{
                        filter: selectedColor === 'white' ? 'brightness(1.1) saturate(0.9)' :
                          selectedColor === 'black' ? 'brightness(0.4) saturate(0.6)' :
                            selectedColor === 'gray' ? 'brightness(0.7) saturate(0.7) grayscale(0.4)' :
                              selectedColor === 'pink' ? 'brightness(1.0) saturate(1.6) hue-rotate(320deg)' :
                                selectedColor === 'orange' ? 'brightness(1.0) saturate(1.5) hue-rotate(30deg)' :
                                  selectedColor === 'yellow' ? 'brightness(1.2) saturate(1.3) hue-rotate(60deg)' :
                                    selectedColor === 'red' ? 'brightness(0.9) saturate(1.6) hue-rotate(0deg)' :
                                      selectedColor === 'green' ? 'brightness(0.8) saturate(1.4) hue-rotate(120deg)' :
                                        selectedColor === 'brown' ? 'brightness(0.6) saturate(1.2) hue-rotate(30deg)' :
                                          selectedColor === 'indigo' ? 'brightness(0.6) saturate(1.5) hue-rotate(240deg)' :
                                            selectedColor === 'lime' ? 'brightness(0.9) saturate(1.3) hue-rotate(90deg)' :
                                              selectedColor === 'blue' ? 'brightness(0.8) saturate(1.4) hue-rotate(210deg)' :
                                                selectedColor === 'rose' ? 'brightness(0.8) saturate(1.3) hue-rotate(330deg)' :
                                                  'none', marginLeft: window.innerWidth <= 425 ? '-15px' : '0px'
                      }} />
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center max-[425px]:-top-0 max-[425px]:right-2">
                      {cartItems}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Image */}
          <div className="px-4 sm:px-6 py-6 sm:py-8 ">
            <div className="relative">
              <div className="w-full h-48 relative max-[426px]:top-[60px]">
                {/* Base shirt image */}
                <div className="relative w-full h-full">
                  {/* SVG Filter Definitions */}
                  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <defs>
                      <filter id="colorFilter">
                        <feColorMatrix
                          type="matrix"
                          values={
                            selectedColor === 'white' ? '1 0 0 0 0.2 0 1 0 0 0.2 0 0 1 0 0.2 0 0 0 1 0' :
                              selectedColor === 'black' ? '0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 1 0' :
                                selectedColor === 'gray' ? '0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0' :
                                  selectedColor === 'pink' ? '0.8 0.2 0.8 0 0 0.2 0.1 0.4 0 0 0.2 0.1 0.4 0 0 0 0 0 1 0' :
                                    selectedColor === 'orange' ? '0.8 0.4 0.1 0 0 0.4 0.2 0.1 0 0 0.1 0.1 0.1 0 0 0 0 0 1 0' :
                                      selectedColor === 'yellow' ? '0.8 0.8 0.1 0 0 0.8 0.8 0.1 0 0 0.1 0.1 0.1 0 0 0 0 0 1 0' :
                                        selectedColor === 'red' ? '0.8 0.1 0.1 0 0 0.1 0.1 0.1 0 0 0.1 0.1 0.1 0 0 0 0 0 1 0' :
                                          selectedColor === 'green' ? '0.1 0.6 0.1 0 0 0.1 0.6 0.1 0 0 0.1 0.1 0.1 0 0 0 0 0 1 0' :
                                            selectedColor === 'brown' ? '0.3 0.15 0.05 0 0 0.15 0.08 0.02 0 0 0.05 0.02 0.01 0 0 0 0 0 1 0' :
                                              selectedColor === 'indigo' ? '0.2 0.1 0.7 0 0 0.1 0.05 0.3 0 0 0.1 0.05 0.3 0 0 0 0 0 1 0' :
                                                selectedColor === 'lime' ? '0.4 0.8 0.1 0 0 0.4 0.8 0.1 0 0 0.1 0.1 0.1 0 0 0 0 0 1 0' :
                                                  selectedColor === 'rose' ? '0.6 0.3 0.5 0 0 0.3 0.2 0.3 0 0 0.3 0.2 0.3 0 0 0 0 0 1 0' :
                                                    '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'
                          }
                        />
                      </filter>
                    </defs>
                  </svg>

                  {/* Multiple Shirts Based on Quantity */}
                  {Array.from({ length: Math.min(quantity, 4) }, (_, index) => (
                    <img
                      key={index}
                      src="https://pics.clipartpng.com/midle/Male_White_Shirt_PNG_Clipart-942.png"
                      alt={`Surf T-Shirt ${index + 1}`}
                      className="absolute w-full h-full object-contain hover:scale-105 transition-all pt-3 duration-300"
                      style={{
                        transform: `scale(${window.innerWidth <= 426 ?
                          (selectedSize === 'xs' ? 0.7 :
                            selectedSize === 's' ? 1.7 :
                              selectedSize === 'm' ? 1.8 :
                                selectedSize === 'l' ? 1.9 :
                                  selectedSize === 'xl' ? 2.0 :
                                    selectedSize === 'xxl' ? 2.1 : 1.0) :
                          (selectedSize === 'xs' ? 0.7 :
                            selectedSize === 's' ? 1.0 :
                              selectedSize === 'm' ? 1.1 :
                                selectedSize === 'l' ? 1.2 :
                                  selectedSize === 'xl' ? 1.3 :
                                    selectedSize === 'xxl' ? 1.5 : 1.0)
                          }) translate(${index * 10}px, ${-index * 4}px)`,
                        filter: 'url(#colorFilter)',
                        zIndex: quantity - index
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="relative top-[30px] max-[426px]:top-[175px] rounded-t-lg inset-shadow-sm" style={{ boxShadow: '1px 1px 12px 1px rgba(0,0,0,0.45)', borderRadius: '30px' }}>
            <div className="flex justify-between items-start px-4 sm:px-6 pt-5 max-[426px]:pt-10">
              <h1 className="text-lg  font-bold text-gray-900" style={{ fontSize: '21px' }}>SURF T-SHIRT</h1>
              <span className="bg-orange-500 text-white px-2 sm:px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
                <span className='bg-yellow-500' style={{ borderRadius: '100%', padding: '2px 4px 1px' }}>$</span>  5.89
              </span>
            </div>

            <p className="text-xs text-gray-500 px-4 sm:px-6" style={{ fontSize: '13px' }}>Product No: TS4236987</p>


            {/* Circular Dialer Selection Interface */}
            <div className="relative top-[87px] max-[426px]:top-[50px]">
              <div className="relative w-80 h-80  mx-auto  max-[426px]:w-[100%] max-[426px]:h-[400px] ">

                {/* Dialer Marker - Top Center */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-orange-500"></div>
                </div>

                {/* Outer Circle - Colors */}
                <div className="absolute inset-0 rounded-full border-1 border-gray-300 bg-white" style={{ boxShadow: '1px 1px 12px 1px rgba(0,0,0,0.45)' }}>
                  <div className="absolute inset-4 rounded-full bg-white"></div>

                  {/* Color Selection Marker */}
                  <div className="absolute w-3 h-3 bg-white rounded-full border-2 border-white shadow-lg"
                    style={{
                      left: 'calc(50% + 100px)',
                      top: 'calc(50% - 100px)',
                      transform: 'translate(-50%, -50%)'
                    }}>
                  </div>

                  {/* Color Dialer Container */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-in-out"
                    style={{ transform: `rotate(${colorRotation}deg)` }}
                  >
                    <div className="relative w-80 h-80">
                      {colorOptions.map((color, index) => {
                        const angle = (index / colorOptions.length) * 360;
                        const radius = window.innerWidth <= 426 ? 174 : 140;
                        const x = Math.cos(angle * Math.PI / 180) * radius;
                        const y = Math.sin(angle * Math.PI / 180) * radius;

                        return (
                          <button
                            key={color.id}
                            onClick={() => setSelectedColor(color.id)}
                            className={`absolute w-6 h-6 rounded-full border-1 border-gray-300 transition-all duration-200 ${selectedColor === color.id
                              ? 'scale-125 border-orange-500 shadow-lg'
                              : 'border-gray-300'
                              }`}
                            style={{
                              backgroundColor: color.color,
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`,
                              transform: `translate(-50%, -50%) rotate(${-colorRotation}deg)`,
                              boxShadow: color.color === '#FFFFFF' ? 'inset 0 0 0 1px #e5e7eb' : 'none',
                            }}
                          ></button>
                        );
                      })}

                      {/* Color Selection Indicator */}
                      {selectedColor && (() => {
                        const colorIndex = colorOptions.findIndex(c => c.id === selectedColor);
                        const angle = (colorIndex / colorOptions.length) * 360;
                        const radius = window.innerWidth <= 426 ? 174 : 140;
                        const x = Math.cos(angle * Math.PI / 180) * radius;
                        const y = Math.sin(angle * Math.PI / 180) * radius;

                        return (
                          <div
                            className="absolute w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-orange-500"
                            style={{
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y - 20}px)`,
                              transform: `translate(-50%, -50%) rotate(${-colorRotation}deg)`
                            }}
                          ></div>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Middle Circle - Sizes */}
                <div className="absolute inset-12 rounded-full border-1 border-gray-300 bg-white" style={{ boxShadow: '1px 1px 12px 1px rgba(0,0,0,0.45)' }}>
                  <div className="absolute inset-4 rounded-full bg-white "></div>

                  {/* Size Dialer Container */}
                  <div
                    className="absolute inset-4 flex items-center justify-center transition-transform duration-200 ease-in-out"
                    style={{ transform: `rotate(${sizeRotation}deg)` }}
                  >
                    <div className="relative w-48 h-48">
                      {sizeOptions.map((size, index) => {
                        const angle = (index / (sizeOptions.length - 1)) * 180 - 90; // 180 degree arc for sizes
                        const radius = window.innerWidth <= 426 ? 125 : 90;

                        const x = Math.cos(angle * Math.PI / 180) * radius;
                        const y = Math.sin(angle * Math.PI / 180) * radius;

                        return (
                          <button
                            key={size.id}
                            onClick={() => {
                              if (size.available) {
                                setSelectedSize(size.id);
                              }
                            }}
                            disabled={!size.available}
                            className={`absolute w-10 h-10 transition-all duration-200 flex items-center justify-center font-semibold ${selectedSize === size.id
                              ? 'scale-125 text-black'
                              : size.available
                                ? 'text-gray-600'
                                : 'text-gray-400 cursor-not-allowed'
                              }`}
                            style={{
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`,
                              transform: `translate(-50%, -50%) rotate(${-sizeRotation}deg)`
                            }}
                          >
                            {size.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Inner Circle - Quantity and Buy */}
                <div className="absolute inset-24 rounded-full border-1 border-gray-300 bg-white" style={{ boxShadow: '1px 1px 12px 1px rgba(0,0,0,0.45)' }}>
                  <div className="absolute inset-4 rounded-full bg-white "></div>

                  {/* Quantity and Buy Controls */}
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out">
                    <div className="text-center relative -top-[10px] max-[426px]:-top-[18px]">
                      {/* Quantity Display */}
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <div className="w-6 h-6  flex items-center justify-center font-semibold text-gray-700 text-s">
                          {quantity}
                        </div>
                      </div>

                      {/* Quantity Controls and Buy Button */}
                      <div className='flex items-center justify-center space-x-2'>
                        <button
                          onClick={decrementQuantity}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-orange-500 transition-colors text-xs"
                          disabled={quantity <= 1}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>

                        <button
                          onClick={handleBuy}
                          className="w-16 h-16 bg-orange-500 text-white rounded-full font-extrabold text-xs hover:bg-orange-600 transition-colors duration-200 shadow-lg we"
                        >
                          BUY
                        </button>

                        <button
                          onClick={incrementQuantity}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-orange-500 transition-colors text-xs"
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

          {/* Bottom Safe Area */}
          <div className="h-6 bg-white"></div>
        </div>
      </div>
    </div>
  );
}

export default App;