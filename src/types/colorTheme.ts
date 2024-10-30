export class ColorTheme {
  public color: string;
  public backgroundColor: string;

  constructor(color: string, backgroundColor: string) {
    this.color = color;
    this.backgroundColor = backgroundColor;
  }

  public asHtmlStyle(): string {
    return `color: ${this.color}; background-color: ${this.backgroundColor};`;
  }
  public colorAsHtmlStyle(): string {
    return `color: ${this.color};`;
  }
  public backgroundColorAsHtmlStyle(): string {
    return `background-color: ${this.backgroundColor};`;
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
