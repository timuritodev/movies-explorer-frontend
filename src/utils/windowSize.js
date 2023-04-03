import { useState, useEffect } from "react";

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
