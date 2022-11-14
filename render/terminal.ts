type Cursor = { row: number, col: number };

export default class Terminal {
  private w: number;
  private h: number;
  private content: string[];
  private cursor: Cursor;

  constructor(width: number, height: number) {
    this.w = width;
    this.h = height;
    this.cursor = { row: 0, col: 0 };
    this.content = [];
  }

  input(text: string) {
    const lines = text.split("\r\n");
    lines
      .map(line => this.escape(line))
      .forEach(line => this.content.push(line));
  }

  getContent(): string[] {
    return this.content;
  }

  private escape(line: string): string {
    return line;
  }
}