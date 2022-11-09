class WTerm {
  readonly el: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  constructor(el: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.el = el;
    this.ctx = ctx;
  }
}

const init = (): WTerm => {
  const el = document.getElementById("canvas");
  if (el instanceof HTMLCanvasElement) {
    const ctx = el.getContext('2d');
    if (ctx !== null) {
      return new WTerm(el, ctx);
    }
  }
  throw new Error("Fail to initialize!");
}

const wterm = init();

const render = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "white";
  ctx.font = "14px Consolas";
  ctx.fillText("Hello World", 0, 14);
}

(window as any).api.handleSizeChange((e: Electron.IpcRendererEvent, arg: any) => {
  const { width, height }: { width: number, height: number } = arg;
  const dpr = window.devicePixelRatio;
  wterm.el.width = width;
  wterm.el.height = height;
  wterm.el.width = wterm.el.clientWidth * dpr;
  wterm.el.height = wterm.el.clientHeight * dpr;
  wterm.el.style.widows = `${width}px`;
  wterm.el.style.height = `${height}px`;
  wterm.ctx.scale(dpr, dpr);
  render(wterm.ctx, width, height);
});