import { useEffect } from "react";

function ClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    }

    // binding the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleaning up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
export default ClickOutside;
