import type { RgbColor } from "colord";
import { colord, extend } from "colord";
import labPlugin from "colord/plugins/lab";
extend([labPlugin]);

export class ColorTheme {
  public color: string;
  public backgroundColor: string;
  public intermediateColor: string;

  constructor(color: string, backgroundColor: string) {
    this.color = color;
    this.backgroundColor = backgroundColor;
    const color_lab = colord(color).toLab();
    const backgroundColor_lab = colord(backgroundColor).toLab();
    const ratio = 0.2;
    const intermediate_lab = {
      l: color_lab.l * ratio + backgroundColor_lab.l * (1 - ratio),
      a: color_lab.a * ratio + backgroundColor_lab.a * (1 - ratio),
      b: color_lab.b * ratio + backgroundColor_lab.b * (1 - ratio),
    };
    this.intermediateColor = colord(intermediate_lab).toHex();
    console.log(this.color);
    console.log(this.backgroundColor);
    console.log(this.intermediateColor);
  }

  public asHtmlStyle(): string {
    return this.colorAsHtmlStyle() + this.backgroundColorAsHtmlStyle();
  }
  public colorAsHtmlStyle(): string {
    return `color: ${this.color}; --link-color: ${this.color};`;
  }
  public backgroundColorAsHtmlStyle(): string {
    return `background-color: ${this.backgroundColor}; --link-background-color: ${this.intermediateColor};`;
  }
}


export class ColorThemes {
  private primary: ColorTheme;
  private secondary: ColorTheme;
  private accent: ColorTheme;

  constructor(primary: ColorTheme, secondary: ColorTheme, accent: ColorTheme) {
    this.primary = primary;
    this.secondary = secondary;
    this.accent = accent;
  }

  public getPrimary(): ColorTheme {
    return this.primary;
  }

  public getSecondary(): ColorTheme {
    return this.secondary;
  }

  public getAccent(): ColorTheme {
    return this.accent;
  }
}
