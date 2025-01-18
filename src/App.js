import React, { useState } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const menuSections = [
    {
      id: 1,
      name: 'All-Day Breakfast',
      images: [
        { id: 1, imgSrc: '/images/Breakfast/Breakfast1.jpg' },
        { id: 2, imgSrc: '/images/Breakfast/Breakfast2.jpg' },
      ],
    },
    {
      id: 2,
      name: 'Lunch',
      images: [
        { id: 1, imgSrc: '/images/Lunch/Lunch1.jpg' },
        { id: 2, imgSrc: '/images/Lunch/Lunch2.jpg' },
        { id: 3, imgSrc: '/images/Lunch/Lunch3.jpg' },
        { id: 4, imgSrc: '/images/Lunch/Lunch4.jpg' },
        { id: 5, imgSrc: '/images/Lunch/Lunch5.jpg' },
        { id: 6, imgSrc: '/images/Lunch/Lunch6.jpg' },
        { id: 7, imgSrc: '/images/Lunch/Lunch7.jpg' },
      ],
    },
    {
      id: 3,
      name: 'Afternoon Tea',
      images: [
        { id: 1, imgSrc: '/images/AfternoonTea/Afternoon1LQ.jpg' },      
      ],
    },
    {
      id: 4,
      name: 'Dinner',
      images: [
        { id: 1, imgSrc: '/images/Dinner/Dinner1.jpg' },
        { id: 2, imgSrc: '/images/Dinner/Dinner2.jpg' },
        { id: 3, imgSrc: '/images/Dinner/Dinner3.jpg' },
        { id: 4, imgSrc: '/images/Dinner/Dinner4.jpg' },
        { id: 5, imgSrc: '/images/Dinner/Dinner5.jpg' },
        { id: 6, imgSrc: '/images/Dinner/Dinner6.jpg' },
        { id: 7, imgSrc: '/images/Dinner/Dinner7.jpg' },
      ],
    },
    {
      id: 5,
      name: 'Specials',
      images: [
        { id: 1, imgSrc: '/images/Special/Special1.jpg' },
        { id: 2, imgSrc: '/images/Special/Special2.jpg' },
      ],
    },
    {
      id: 6,
      name: 'Drinks',
      images: [
        { id: 1, imgSrc: '/images/Drink/Drink1.jpg' },
        { id: 2, imgSrc: '/images/Drink/Drink2.jpg' },
      ],
    },
  ];

  const openModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  
    // This will handle clicks on the background and close the modal
    const handleBackgroundClick = (e) => {
      // Only close modal if the click was on the background and not the modal content
      if (e.target.classList.contains('modal')) {
        closeModal();
      }
    };

    return (
      <div className="App bg-gray-100 min-h-screen">
        <header className="text-center py-8 bg-black">
          <h1 className="text-9xl text-yellow-500 font-tempus">café de A</h1>
        </header>
        <main className="menu-gallery p-6">
          {menuSections.map((section) => (
            <div key={section.id} className="menu-section mb-12">
              <h2 className="text-3xl font-bold mb-4 font-tempus">{section.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
                {section.images.map((image) => (
                  <div
                    key={image.id}
                    className="menu-item text-center bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => openModal(image.imgSrc)}
                  >
                    <img
                      src={image.imgSrc}
                      alt={section.name}
                      className="menu-image w-full h-90 object-cover transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
    
        {isModalOpen && (
          <div
            className={`modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-500 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleBackgroundClick}
          >
            <div className="modal-content relative bg-white p-1 rounded-lg transition-all duration-500">
              <button
                className="absolute top-2 right-2 text-black text-2xl"
                onClick={closeModal}
              >
                &times;
              </button>
              <img
                src={selectedImage}
                alt="Full view"
                className="max-w-full max-h-[95vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    );    
}

export default App;
