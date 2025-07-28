import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MoreHorizontal, Minus, Plus, Star, Shirt } from 'lucide-react';

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
  { id: 'navy', name: 'Navy', color: '#1E3A8A' },
  { id: 'pink', name: 'Pink', color: '#EC4899' },
  { id: 'teal', name: 'Teal', color: '#0D9488' },
  { id: 'orange', name: 'Orange', color: '#F97316' },
];

const sizeOptions: SizeOption[] = [
  { id: 'xs', name: 'XS', available: true },
  { id: 's', name: 'S', available: true },
  { id: 'm', name: 'M', available: true },
  { id: 'l', name: 'L', available: true },
  { id: 'xl', name: 'XL', available: true },
  { id: 'xxl', name: 'XXL', available: true },
  { id: 'xxxl', name: 'XXXL', available: true },

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
  const colorDialerRef = useRef<HTMLDivElement>(null);
  const sizeDialerRef = useRef<HTMLDivElement>(null);

  // Array rotation state for smooth scrolling
  const [currentColors, setCurrentColors] = useState<ColorOption[]>([...colorOptions]);
  const [currentSizes, setCurrentSizes] = useState<SizeOption[]>([...sizeOptions]);

  // Mouse drag state for scrolling
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    dialer: 'color' | 'size' | null;
    startX: number;
  }>({
    isDragging: false,
    dialer: null,
    startX: 0
  });

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleBuy = () => {
    setCartItems(prev => prev + quantity);
    setShowCart(true);
    setCartAnimation(true);

    // Reset animation after it completes
    setTimeout(() => {
      setCartAnimation(false);
    }, 1000);
  };

  // Handle color dialer scroll with array rotation
  const handleColorScroll = (direction: 'left' | 'right') => {
    setCurrentColors(prev => {
      const newColors = [...prev];
      if (direction === 'right') {
        newColors.unshift(newColors.pop()!);
      } else {
        newColors.push(newColors.shift()!);
      }
      return newColors;
    });

    // Update selected color based on center position
    setTimeout(() => {
      const centerIndex = Math.floor(colorOptions.length / 2);
      const centerColor = currentColors[centerIndex];
      if (centerColor) {
        setSelectedColor(centerColor.id);
      }
    }, 0);
  };

  // Center specific color to the marker position
  const centerColorToMarker = (colorId: string) => {
    setCurrentColors(prev => {
      const newColors = [...prev];
      let attempts = 0;
      const maxAttempts = newColors.length;

      while (attempts < maxAttempts) {
        const centerIndex = Math.floor(newColors.length / 2);
        if (newColors[centerIndex]?.id === colorId) {
          break;
        }
        newColors.unshift(newColors.pop()!);
        attempts++;
      }

      return newColors;
    });

    setSelectedColor(colorId);
  };

  // Handle size dialer scroll with array rotation
  const handleSizeScroll = (direction: 'left' | 'right') => {
    setCurrentSizes(prev => {
      const newSizes = [...prev];
      if (direction === 'right') {
        newSizes.unshift(newSizes.pop()!);
      } else {
        newSizes.push(newSizes.shift()!);
      }
      return newSizes;
    });

    // Update selected size based on center position
    setTimeout(() => {
      const centerIndex = Math.floor(sizeOptions.length / 2);
      const centerSize = currentSizes[centerIndex];
      if (centerSize) {
        setSelectedSize(centerSize.id);
      }
    }, 0);
  };

  // Center specific size to the marker position
  const centerSizeToMarker = (sizeId: string) => {
    setCurrentSizes(prev => {
      const newSizes = [...prev];
      let attempts = 0;
      const maxAttempts = newSizes.length;

      while (attempts < maxAttempts) {
        const centerIndex = Math.floor(newSizes.length / 2);
        if (newSizes[centerIndex]?.id === sizeId) {
          break;
        }
        newSizes.unshift(newSizes.pop()!);
        attempts++;
      }

      return newSizes;
    });

    setSelectedSize(sizeId);
  };

  // Mouse drag handlers for scrolling
  const handleDragStart = (dialer: 'color' | 'size', event: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    setDragState({
      isDragging: true,
      dialer,
      startX: clientX
    });
  };

  const handleDragMove = (event: MouseEvent | TouchEvent) => {
    if (!dragState.isDragging) return;

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - dragState.startX;
    const dragThreshold = 40;

    if (Math.abs(deltaX) > dragThreshold) {
      if (dragState.dialer === 'color') {
        handleColorScroll(deltaX > 0 ? 'right' : 'left');
      } else if (dragState.dialer === 'size') {
        handleSizeScroll(deltaX > 0 ? 'right' : 'left');
      }

      setDragState(prev => ({
        ...prev,
        startX: clientX
      }));
    }
  };

  const handleDragEnd = () => {
    setDragState({
      isDragging: false,
      dialer: null,
      startX: 0
    });
  };

  // Add global event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove as any, { passive: false });
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
    document.addEventListener('mouseleave', handleDragEnd);

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('touchmove', handleDragMove as any);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
      document.removeEventListener('mouseleave', handleDragEnd);
    };
  }, [dragState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400">
      {/* Responsive Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-2 sm:p-4">
        {/* Mobile Frame */}
        <div className="w-full max-w-sm mx-auto lg:mx-0">
          {/* Phone Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div className="flex space-x-1">
                {Array.from({ length: Math.max(quantity, 3) }, (_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index < quantity ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>
              <div className="relative">
                {/* <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-700" />
                </button> */}
                {/* Cart Shirt Image with Badge */}
                {showCart && (
                  <div className={`absolute -top-2 -right-2 transition-all duration-500 ${cartAnimation ? 'scale-110' : 'scale-100'}`}>
                    <div className="relative">
                      <img
                        src="https://pics.clipartpng.com/midle/Male_White_Shirt_PNG_Clipart-942.png"
                        alt="Cart Shirt"
                        className="w-8 h-8 object-contain"
                        style={{
                          filter: selectedColor === 'white' ? 'brightness(1.1) saturate(0.9)' :
                            selectedColor === 'black' ? 'brightness(0.4) saturate(0.6)' :
                              selectedColor === 'gray' ? 'brightness(0.7) saturate(0.7) grayscale(0.4)' :
                                selectedColor === 'navy' ? 'brightness(0.6) saturate(1.3) hue-rotate(240deg)' :
                                  selectedColor === 'pink' ? 'brightness(1.0) saturate(1.6) hue-rotate(320deg)' :
                                    selectedColor === 'teal' ? 'brightness(0.8) saturate(1.4) hue-rotate(180deg)' :
                                      selectedColor === 'orange' ? 'brightness(1.0) saturate(1.5) hue-rotate(30deg)' :
                                        selectedColor === 'yellow' ? 'brightness(1.2) saturate(1.3) hue-rotate(60deg)' :
                                          selectedColor === 'red' ? 'brightness(0.9) saturate(1.6) hue-rotate(0deg)' :
                                            selectedColor === 'green' ? 'brightness(0.8) saturate(1.4) hue-rotate(120deg)' :
                                              selectedColor === 'purple' ? 'brightness(0.7) saturate(1.5) hue-rotate(280deg)' :
                                                'none'
                        }}
                      />
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                        {cartItems}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Image */}
            <div className="px-4 sm:px-6 py-6 sm:py-8 bg-gray-50">
              <div className="relative">
                <div className="w-full h-48 relative ">
                  {/* Base shirt image */}
                  <div className="relative w-full h-full">
                    {/* SVG Filter Definitions */}
                    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                      <defs>
                        <filter id="colorFilter">
                          <feColorMatrix
                            type="matrix"
                            values={selectedColor === 'white' ? '1 0 0 0 0.2 0 1 0 0 0.2 0 0 1 0 0.2 0 0 0 1 0' :
                              selectedColor === 'black' ? '0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 1 0' :
                                selectedColor === 'gray' ? '0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0' :
                                  selectedColor === 'navy' ? '0.1 0.1 0.4 0 0 0.1 0.1 0.4 0 0 0.1 0.1 0.4 0 0 0 0 0 1 0' :
                                    selectedColor === 'pink' ? '0.8 0.2 0.8 0 0 0.2 0.1 0.4 0 0 0.2 0.1 0.4 0 0 0 0 0 1 0' :
                                      selectedColor === 'teal' ? '0.1 0.4 0.4 0 0 0.1 0.4 0.4 0 0 0.1 0.4 0.4 0 0 0 0 0 1 0' :
                                        selectedColor === 'orange' ? '0.8 0.4 0.1 0 0 0.4 0.2 0.1 0 0 0.1 0.1 0.1 0 0 0 0 0 1 0' :
                                          selectedColor === 'yellow' ? '0.8 0.8 0.1 0 0 0.8 0.8 0.1 0 0 0.1 0.1 0.1 0 0 0 0 0 1 0' :
                                            selectedColor === 'red' ? '0.8 0.1 0.1 0 0 0.1 0.1 0.1 0 0 0.1 0.1 0.1 0 0 0 0 0 1 0' :
                                              selectedColor === 'green' ? '0.1 0.6 0.1 0 0 0.1 0.6 0.1 0 0 0.1 0.1 0.1 0 0 0 0 0 1 0' :
                                                selectedColor === 'purple' ? '0.4 0.1 0.6 0 0 0.1 0.1 0.4 0 0 0.1 0.1 0.4 0 0 0 0 0 1 0' :
                                                  '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'}
                          />
                        </filter>
                      </defs>
                    </svg>

                    {/* Multiple Shirts Based on Quantity */}
                    {Array.from({ length: quantity }, (_, index) => (
                      <img
                        key={index}
                        src="https://pics.clipartpng.com/midle/Male_White_Shirt_PNG_Clipart-942.png"
                        alt={`Surf T-Shirt ${index + 1}`}
                        className="absolute w-full h-full object-contain hover:scale-105 transition-all duration-300"
                        style={{
                          transform: `scale(${selectedSize === 'xs' ? 0.7 :
                            selectedSize === 's' ? 0.8 :
                              selectedSize === 'm' ? 0.9 :
                                selectedSize === 'l' ? 1.0 :
                                  selectedSize === 'xl' ? 1.1 :
                                    selectedSize === 'xxl' ? 1.2 : 1.0
                            }) translate(${index * 15}px, ${index * 10}px)`,
                          filter: 'url(#colorFilter)',
                          zIndex: index + 1
                        }}
                      />
                    ))}
                  </div>

                  {/* Size indicator */}
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {selectedSize.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="py-4 sm:py-6 rounded-t-lg inset-shadow-sm">
              <div className="flex justify-between items-start mb-4 px-4 sm:px-6">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">SURF T-SHIRT</h1>
                <span className="bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  $ 5.89
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 mb-4 px-4 sm:px-6">Product No: TS4236987</p>

              {/* Product Features */}
              <div className="px-4 sm:px-6 space-y-2 mb-20 sm:mb-28">
                {productFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Nested Semicircle Selection Interface */}
              <div className="relative w-full h-40 sm:h-20 flex justify-center items-center">
                {/* Container for nested semicircles */}
                <div className="relative h-32 sm:h-44 w-full max-w-sm sm:max-w-none">
                  
                  {/* Dialer Marker - Top Center */}
                  <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-gray-800"></div>
                  </div>

                  {/* First Semicircle (Outermost) - Colors */}
                  <div className="absolute inset-0 flex justify-center items-end">
                    <div className="w-72 h-36 sm:w-[28rem] sm:h-48 rounded-t-full border-2 flex justify-center items-center relative" style={{ backgroundColor: '#f7f7f7' }}>
                      {/* Color options positioned in a semicircle shape */}
                      {currentColors.map((color, index) => {
                        const total = currentColors.length;
                        // Semicircle: 180 degrees from 0 to 180, positioned along the arc
                        const angle = (index * 180) / (total - 1);
                        const radian = (angle * Math.PI) / 180;
                        const radius = window.innerWidth < 640 ? 120 : 165; // Smaller radius for mobile
                        const x = Math.cos(radian) * radius;
                        const y = Math.sin(radian) * radius;
                        const isSelected = selectedColor === color.id;

                        return (
                          <button
                            key={`${color.id}-${index}`}
                            onClick={() => centerColorToMarker(color.id)}
                            className={`absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-30000 shadow-lg focus:outline-none cursor-pointer ${isSelected
                              ? ' scale-110'
                              : ' hover:scale-110'
                              }`}
                            style={{
                              backgroundColor: color.color,
                              left: `calc(50% + ${x}px - ${window.innerWidth < 640 ? 12 : 16}px)`,
                              top: `calc(50% - ${Math.abs(y)}px - ${window.innerWidth < 640 ? -55 : -75}px)`,
                              boxShadow: color.color === '#FFFFFF' ? 'inset 0 0 0 1px #e5e7eb' : 'none',
                              zIndex: isSelected ? 30 : 20,
                            }}
                            title={color.name}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Second Semicircle - Sizes */}
                  <div className="absolute inset-0 flex justify-center items-end">
                    <div className="w-56 h-28 sm:w-72 sm:h-36 rounded-t-full border-2 flex justify-center items-center relative" style={{ backgroundColor: '#f7f7f7' }}>
                      {/* Size options positioned around the semicircle */}
                      {currentSizes.map((size, index) => {
                        const total = currentSizes.length;
                        // Semicircle: 180 degrees from 0 to 180, positioned in the middle of the semicircle
                        const angle = (index * 180) / (total - 1);
                        const radian = (angle * Math.PI) / 180;
                        const radius = window.innerWidth < 640 ? 85 : 115; // Smaller radius for mobile
                        const x = Math.cos(radian) * radius;
                        const y = Math.sin(radian) * radius;
                        const isSelected = selectedSize === size.id;

                        return (
                          <button
                            key={`${size.id}-${index}`}
                            onClick={() => {
                              if (size.available) {
                                centerSizeToMarker(size.id);
                              }
                            }}
                            disabled={!size.available}
                            className={`absolute w-6 h-6 sm:w-8 sm:h-8 text-xs font-medium transition-all duration-300 cursor-pointer ${isSelected
                              ? 'scale-110'
                              : size.available
                                ? ''
                                : 'cursor-not-allowed'
                              }`}
                            style={{
                              left: `calc(50% + ${x}px - ${window.innerWidth < 640 ? 12 : 16}px)`,
                              top: `calc(50% - ${Math.abs(y)}px - ${window.innerWidth < 640 ? -40 : -50}px)`,
                              zIndex: isSelected ? 25 : 15,
                              color: isSelected ? '#000000' : '#6B7280',
                            }}
                          >
                            {size.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Third Semicircle - Quantities */}
                  <div className="absolute inset-0 flex justify-center items-end">
                    <div className="w-36 h-18 sm:w-48 sm:h-24 rounded-t-full border-2 flex justify-center items-center relative" style={{ backgroundColor: '#f7f7f7' }}>
                      {/* Quantity controls in center */}
                      <div className="flex flex-col items-center">
                        {/* Quantity Display */}
                        <span className="text-black font-bold text-base sm:text-lg mb-4 sm:mb-6 select-none">{quantity}</span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-16 sm:space-x-24">
                          {/* Decrease Button */}
                          <button
                            onClick={decrementQuantity}
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-sm sm:text-base transition disabled:opacity-50 z-40"
                            disabled={quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            –
                          </button>
                          
                          {/* Increase Button */}
                          <button
                            onClick={incrementQuantity}
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-sm sm:text-base transition z-40"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fourth Semicircle (Innermost) - Buy Button */}
                  <div className="absolute inset-0 flex justify-center items-end">
                    <div className="w-16 h-8 sm:w-28 sm:h-16 flex justify-center items-center relative">
                      <button
                        onClick={handleBuy}
                        className="w-12 h-12 sm:w-12 sm:h-12 bg-orange-500 text-white font-bold text-xs sm:text-sm rounded-full flex items-center justify-center shadow-xl transition-all duration-300 focus:outline-none z-35"
                      >
                        BUY
                      </button>
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
    </div>
  );
}

export default App;