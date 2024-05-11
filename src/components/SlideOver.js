import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

const SlideOver = ({ isOpen, onClose }) => {
  const duration = 300; // Transition duration in milliseconds
  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: 'translateX(-100%)',
  };

  const transitionStyles = {
    entering: { transform: 'translateX(-100%)' },
    entered:  { transform: 'translateX(0%)' },
    exiting:  { transform: 'translateX(-100%)' },
    exited:  { transform: 'translateX(-100%)' },
  };

  return (
    <Transition in={isOpen} timeout={duration} unmountOnExit>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
          className="fixed top-0 left-0 z-50 w-64 h-full overflow-auto bg-white shadow-xl"
        >
          <button onClick={onClose} className="p-4">Close</button>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Entries Table</h2>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="text-left">ID</th>
                  <th className="text-left">Name</th>
                </tr>
              </thead>
              <tbody>
                {/* Populate table rows here */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Transition>
  );
};
export default SlideOver;
