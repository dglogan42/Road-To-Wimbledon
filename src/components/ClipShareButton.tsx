interface ClipShareButtonProps {
  text: string;
  announcerName?: string;
  announcer?: string;
  className?: string;
}

export function ClipShareButton({
  text,
  announcerName = 'McEnroe Watch',
  announcer = 'mcenroe',
  className = 'clip-studio-btn',
}: ClipShareButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cs = (window as Window & { ClipStudio?: { open: (l: object) => void; makeLine: (t: string, n: string, a: string) => object } }).ClipStudio;
    if (!cs) return;
    cs.open(cs.makeLine(text, announcerName, announcer));
  };

  return (
    <button type="button" className={className} onClick={handleClick} title="Clip & share" aria-label="Clip audio">
      ✂️
    </button>
  );
}