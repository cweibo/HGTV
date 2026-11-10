export type IconName = "home" | "search" | "bookmark" | "arrow" | "back" | "play" | "settings" | "check";

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, string> = {
    home: "m3 10 9-7 9 7v10H7V11h10v9",
    search: "m21 21-4.5-4.5M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z",
    bookmark: "M6 3h12v18l-6-4-6 4Z",
    arrow: "M4 12h15m-6-6 6 6-6 6",
    back: "M20 12H5m6-6-6 6 6 6",
    play: "m8 5 11 7-11 7Z",
    settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1",
    check: "m5 12 4 4L19 6",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
