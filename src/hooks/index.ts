import { useEffect } from "react";

export const useOutsideTriggered = (
  ref: any,
  setState: (state: boolean) => void
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        setState(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
