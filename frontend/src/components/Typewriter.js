import { useState, useEffect, useRef } from "react";

const useTypewriter = (text, speed = 10) => {
  const [displayText, setDisplayText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayText("");
    indexRef.current = 0;

    const typingInterval = setInterval(() => {
      if (indexRef.current < text.length) {
        const nextChar = text.charAt(indexRef.current);

        setDisplayText((prev) => prev + nextChar);
        indexRef.current++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayText;
};

const Typewriter = ({ text, speed = 10 }) => {
  const displayText = useTypewriter(text, speed);

  return <p className="whitespace-pre-line">{displayText}</p>;
};

export default Typewriter;