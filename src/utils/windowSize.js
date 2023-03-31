import { useState, useEffect } from "react";

export const breakpoints = {
xs: {
width: 768,
moviesToRender: 5,
moviesToAdd: 1,
},
s: {
width: 990,
moviesToRender: 8,
moviesToAdd: 2,
},
m: {
width: 1024,
moviesToRender: 12,
moviesToAdd: 3,
},
l: {
width: 1280,
moviesToRender: 16,
moviesToAdd: 4,
}
}

const getWindowWidth = () => {
return document.documentElement.clientWidth;
}

function useWindowSize() {
const [windowSize, setWindowSize] = useState({
width: getWindowWidth(),
});

useEffect(() => {
let timeoutId = null;
const handleResize = () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    setWindowSize({
      width: getWindowWidth()
    });
  }, 150);
};

window.addEventListener('resize', handleResize);

return () => window.removeEventListener('resize', handleResize);
}, []);

return windowSize;
}

export default useWindowSize;
