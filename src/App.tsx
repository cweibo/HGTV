import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";
import { rails, viewNames } from "./content";
import type { View } from "./content";

const directions: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1],
};

export function moveFocus(direction: string) {
  const delta = directions[direction];
  if (!delta) return false;
  const current = document.activeElement?.closest<HTMLElement>("[data-focusable]");
  const items = [...document.querySelectorAll<HTMLElement>("[data-focusable]:not([disabled])")]
    .filter((element) => element.getClientRects().length && element.tabIndex >= 0);
  if (!items.length) return false;
  if (!current || !items.includes(current)) {
    items[0].focus();
    return true;
  }
  const a = current.getBoundingClientRect();
  const origin = { x: a.left + a.width / 2, y: a.top + a.height / 2 };
  const candidates = items.filter((item) => item !== current).map((item) => {
    const b = item.getBoundingClientRect();
    const target = { x: b.left + b.width / 2, y: b.top + b.height / 2 };
    const primary = (target.x - origin.x) * delta[0] + (target.y - origin.y) * delta[1];
    const cross = Math.abs((target.x - origin.x) * delta[1] + (target.y - origin.y) * delta[0]);
    return { item, primary, score: primary + cross * 2.5 };
  }).filter(({ primary }) => primary > 4).sort((a, b) => a.score - b.score);
  candidates[0]?.item.focus();
  return true;
}

export function Poster({ index, tone, large = false }: { index: number; tone: string; large?: boolean }) {
  return (
    <div className={`poster poster-${tone} ${large ? "poster-large" : ""}`} aria-hidden="true">
      <span className="poster-number">{String(index + 1).padStart(2, "0")}</span>
      <span className="poster-orbit" />
      <span className="poster-caption">A STORY<br />ON THE BIG SCREEN</span>
      <Icon name="play" size={large ? 32 : 22} />
    </div>
  );
}

function App() {
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const first = view === "search"
      ? document.querySelector<HTMLElement>("#search-input")
      : document.querySelector<HTMLElement>("main [data-autofocus]")
        ?? document.querySelector<HTMLElement>("[data-autofocus]");
    first?.focus({ preventScroll: true });
  }, [view]);

  useEffect(() => {
    const scrollFocusedElement = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement && event.target.matches("[data-focusable]")) {
        event.target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
      }
    };
    document.addEventListener("focusin", scrollFocusedElement);
    return () => document.removeEventListener("focusin", scrollFocusedElement);
  }, []);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (directions[event.key] && !(event.target instanceof HTMLInputElement)) {
        if (moveFocus(event.key)) event.preventDefault();
      } else if (event.key === "Escape" || (event.key === "Backspace" && !(event.target instanceof HTMLInputElement))) {
        event.preventDefault();
        setView("home");
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  const open = (next: View) => setView(next);
  const nav = (id: string) => { if (id === "home" || id === "search" || id === "library") open(id); };
  const integrationNotice = () => setNotice("内容接口将在下一阶段接入 HGhub。当前为界面骨架，不含真实片源。");

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="主导航">
        <button className="brand" onClick={() => open("home")} data-focusable data-autofocus aria-label="HGTV 首页">
          <span className="brand-mark">H</span><span className="brand-name">HGTV<span>大屏短剧</span></span>
        </button>
        <div className="nav-items">
          {([{ id: "home", icon: "home", label: "首页" }, { id: "search", icon: "search", label: "搜索" }, { id: "library", icon: "bookmark", label: "我的片单" }] as { id: View; icon: IconName; label: string }[]).map((item) => (
            <button key={item.id} className={`nav-item ${view === item.id ? "active" : ""}`} data-focusable onClick={() => nav(item.id)}>
              <Icon name={item.icon} /><span>{item.label}</span>{view === item.id && <i />}
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="build-status"><span />开发预览 · v0.1</div>
          <div className="remote-hint"><kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd><span>移动</span><kbd>↵</kbd><span>确认</span></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumbs"><span>HGTV</span><span className="slash">/</span>{viewNames[view]}</div>
          <span className="prototype-label">UI FOUNDATION <span>01</span></span>
        </header>

        {view === "home" && <>
          <section className="hero">
            <div><p className="eyebrow">DESIGNED FOR THE DISTANCE</p><h1>好故事，<br /><em>大屏相见。</em></h1></div>
            <div className="hero-note"><span className="live-dot" />为电视与遥控器而生<p>横屏浏览。清晰焦点。无需触屏。</p></div>
          </section>
          {rails.map((rail) => <section className="rail" key={rail.id} aria-label={rail.title}>
            <div className="section-heading"><h2>{rail.title}<span>{rail.subtitle}</span></h2><button className="text-button" data-focusable onClick={integrationNotice}>查看全部<Icon name="arrow" size={19} /></button></div>
            <div className="card-row">{Array.from({ length: rail.count }, (_, index) => (
              <button className="show-card" data-focusable key={index} onClick={() => open("detail")} aria-label={`${rail.title}，内容位 ${index + 1}，待接入`}>
                <Poster index={index} tone={rail.tone} /><span className="card-title">精彩内容，即将呈现</span><span className="card-meta">HGhub 内容接口 · 待接入</span>
              </button>
            ))}</div>
          </section>)}
        </>}

        {view === "search" && <section className="page-section"><p className="eyebrow">FIND YOUR NEXT STORY</p><h1>搜索</h1><p className="page-description">按剧名搜索。电视端将使用屏幕键盘输入。</p>
          <form className="search-form" onSubmit={(event) => { event.preventDefault(); integrationNotice(); }}>
            <Icon name="search" size={28} /><input ref={inputRef} id="search-input" data-focusable data-autofocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="输入剧名…" aria-label="搜索剧名" />
            <button data-focusable className="primary-button" type="submit">搜索<Icon name="arrow" /></button>
          </form>
          <div className="empty-state"><Icon name="search" size={40} /><h2>{query ? "搜索功能将在下一阶段接入" : "想找什么剧？"}</h2><p>内容检索、分页与结果焦点恢复，将复用 HGhub 的接口层。</p></div>
        </section>}

        {view === "library" && <section className="page-section"><p className="eyebrow">YOUR PERSONAL SPACE</p><h1>我的片单</h1><div className="empty-state"><Icon name="bookmark" size={42} /><h2>收藏与观看记录，留在这里</h2><p>后续接入本地收藏、断点续播和观看历史。数据仅保存在你的设备上。</p><button className="primary-button" data-focusable data-autofocus onClick={() => open("home")}>返回首页<Icon name="arrow" /></button></div></section>}

        {view === "detail" && <section className="detail-page"><button className="back-button" data-focusable data-autofocus onClick={() => open("home")}><Icon name="back" />返回</button><div className="detail-layout"><Poster index={0} tone="lime" large /><div className="detail-copy"><p className="eyebrow">DETAIL EXPERIENCE</p><h1>为电视端，<br />重新组织每一部剧。</h1><p>这里是剧集简介、选集与续播的展示区域。当前不显示虚构的剧名或剧情。</p><div className="detail-tags"><span>横屏详情</span><span>焦点选集</span><span>断点续播</span></div><button className="primary-button" data-focusable onClick={() => open("player")}><Icon name="play" />播放界面预览</button></div></div></section>}

        {view === "player" && <section className="player-page"><div className="player-stage"><div className="player-wordmark">HG<span>TV</span></div><p>原生播放器适配位</p><span>Media3 / ExoPlayer · 待实机验证</span><div className="player-controls"><button data-focusable onClick={integrationNotice}><Icon name="back" />快退</button><button data-focusable data-autofocus className="play-button" onClick={integrationNotice}><Icon name="play" size={34} /></button><button data-focusable onClick={integrationNotice}>快进<Icon name="arrow" /></button></div></div><button className="back-button" data-focusable onClick={() => open("detail")}><Icon name="back" />返回剧集</button></section>}

        {notice && <div className="toast" role="status"><Icon name="check" /><span>{notice}</span><button data-focusable onClick={() => setNotice("")} aria-label="关闭提示">×</button></div>}
      </main>
    </div>
  );
}

export default App;
