import Terminal from "./terminal";

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
}

let width = 0;
let height = 0;

(window as any).api.handleSizeChange((e: Electron.IpcRendererEvent, arg: any) => {
  width = arg.width;
  height = arg.height;
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

const terminal = new Terminal(80, 30);

(window as any).api.handleData((e: Electron.IpcRendererEvent, arg: any) => {
  let lineNumber = 1;
  terminal.input(arg);
  wterm.ctx.fillStyle = "black";
  wterm.ctx.fillRect(0, 0, width, height);
  for (const line of terminal.getContent()) {
    wterm.ctx.fillStyle = "white";
    wterm.ctx.fillText(line, 0, 14 * lineNumber);
    lineNumber += 1;
  }
});

document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.code === 'KeyC') {
    (window as any).api.input("^C");
  }
});