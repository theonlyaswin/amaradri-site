import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const touchStartRef = useRef(null);



  useEffect(() => {
    const handleScroll = (event) => {
      if (event.deltaY > 0) {
        // Scroll down
        setPage((prev) => Math.min(prev + 1, pages.length - 1));
      } else if (event.deltaY < 0) {
        // Scroll up
        setPage((prev) => Math.max(prev - 1, 0));
      }
    };

    const handleTouchStart = (event) => {
      touchStartRef.current = event.touches[0].clientY; // Store the initial touch position
    };

    const handleTouchMove = (event) => {
      if (touchStartRef.current !== null) {
        const touchEndY = event.touches[0].clientY;
        const touchDiff = touchStartRef.current - touchEndY;

        if (touchDiff > 30) {
          // Swipe down
          setPage((prev) => Math.min(prev + 1, pages.length - 1));
          touchStartRef.current = null; // Reset after swipe
        } else if (touchDiff < -30) {
          // Swipe up
          setPage((prev) => Math.max(prev - 1, 0));
          touchStartRef.current = null; // Reset after swipe
        }
      }
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [setPage]);

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <div className="w-full pointer-events-auto flex justify-center">

        </div>
      </main>
    </>
  );
};
