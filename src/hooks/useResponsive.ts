import { useState, useEffect } from "react";

function useResponsive() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallMobile = screenSize <= 400;
  const isMobile = screenSize <= 500;
  const isTablet = screenSize <= 991;
  const isDesktop = screenSize > 1024;

  return {
    isMobile,
    isSmallMobile,
    isTablet,
    isDesktop,
    screenSize,
  };
}

export default useResponsive;
