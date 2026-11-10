export interface Rail {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  tone: string;
}

export const rails: Rail[] = [
  { id: "featured", title: "为你推荐", subtitle: "发现下一部好剧", count: 8, tone: "lime" },
  { id: "trending", title: "正在热播", subtitle: "热门内容，一屏尽览", count: 8, tone: "amber" },
  { id: "continue", title: "继续观看", subtitle: "从上次的位置继续", count: 6, tone: "blue" },
];

export type View = "home" | "search" | "library" | "detail" | "player";

export const viewNames: Record<View, string> = {
  home: "首页",
  search: "搜索",
  library: "我的片单",
  detail: "剧集详情",
  player: "播放",
};
