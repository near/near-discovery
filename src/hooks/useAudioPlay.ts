import { useCallback, useState, useRef, useEffect } from 'react';

export default function useAudioPlay() {
  const [playing, setPlaying] = useState(false);
  const [playingUrl, setPlayingUrl] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>();

  const play = useCallback(
    (url: string) => {
      if (audioRef.current && playingUrl === url) {
        if (playing) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setPlaying(!playing);
        return;
      }
      if (audioRef.current && playingUrl !== url) {
        audioRef.current.pause();
      }

      audioRef.current = new Audio(url);
      audioRef.current.play();
      setPlayingUrl(url);
      setPlaying(true);
      audioRef.current.onended = () => {
        setPlaying(false);
        audioRef.current = null;
      };
    },
    [playing, playingUrl],
  );

  useEffect(
    () => () => {
      if (audioRef.current) audioRef.current.pause();
    },
    [],
  );

  return { playing, playingUrl, play };
}
