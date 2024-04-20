import { useEffect, useState } from "react";
const CONTENT_LENGTH = 200;

const useTrimContent = content => {
  const [trimmedContent, setTrimmedContent] = useState(content);
  useEffect(() => {
    let result = trimmedContent.length > CONTENT_LENGTH ? (trimmedContent.slice(0, CONTENT_LENGTH) + '...') : trimmedContent;
    if(result === trimmedContent) return;
    setTrimmedContent(result);
  }, [trimmedContent]);

  return [trimmedContent, setTrimmedContent];
};


export default useTrimContent;