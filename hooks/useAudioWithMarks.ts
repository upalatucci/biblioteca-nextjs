import { useEffect, useRef, useState } from "react";

export type MarkType = {
  time: number;
  type: string;
  start: number;
  end: number;
  value: string;
};

const useAudioWithMarks = (postSlug: string) => {
  const [marks, setMarks] = useState<MarkType[]>();
  const audioRef = useRef<HTMLAudioElement>();
  const [currentMark, setCurrentMark] = useState<MarkType>();

  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      const currentTime = audioRef.current.currentTime;
      const markIndex = marks?.findIndex(
        (mark) => currentTime * 1000 < mark.time
      );

      const mark = marks[markIndex - 1];

      if (!mark || mark?.time === currentMark?.time) return;

      setCurrentMark(mark);
      const activeLi = document.querySelector(`[data-id="${mark.value}"]`);

      if (!activeLi) return;

      activeLi.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    };

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    () => audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
  }, [audioRef.current]);

  useEffect(() => {
    if (!postSlug) return;

    import(`@audio/marks/${postSlug}.json`)
      .then((module) => setMarks(module.default))
      .catch(console.info);
  }, [postSlug]);

  return { audioRef, currentMark };
};

export default useAudioWithMarks;
