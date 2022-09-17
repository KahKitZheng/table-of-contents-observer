import { useEffect, useState, useRef } from "react";

type TableItem = {
  id: string | number;
  text: string;
  level: number;
};

const useHeadingObserver = () => {
  const observer = useRef<IntersectionObserver>();

  const [activeId, setActiveId] = useState("");
  const [headings, setHeadings] = useState([] as TableItem[]);

  // Link each heading with an unique id to scroll to
  useEffect(() => {
    Array.from(
      document.querySelectorAll("h2, h3, h4") as NodeListOf<HTMLHeadingElement>
    ).map((elem) => (elem.id = elem.innerText));
  }, []);

  // Create a list of headings to observe to
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("h2, h3, h4") as NodeListOf<HTMLHeadingElement>
    ).map((elem, index) => ({
      id: elem.id !== "" ? elem.id : index,
      text: elem.innerText,
      level: Number(elem.nodeName.charAt(1)),
    }));

    setHeadings(elements);
  }, []);

  // Use the InersectionObserver API to check whether a heading is in view
  useEffect(() => {
    const handleObsever = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) setActiveId(entry.target.id);
      });
    };

    // Informs the observer which part of the screen should observe.
    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "0% 0px -50% 0px",
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach((elem) => {
      if (observer?.current) {
        observer?.current.observe(elem);
      } else {
        return;
      }
    });

    return () => observer.current?.disconnect();
  }, []);

  return { activeId, headings };
};

export default useHeadingObserver;
