interface RGB {
    r: number;
    g: number;
    b: number;
}

interface LAB {
    l: number;
    a: number;
    b: number;
}


// RGBをCIE-Labに変換するためのヘルパー関数
function rgbToLab(rgb: RGB): LAB {
    // RGBを[0,1]範囲にスケーリング
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    // RGB to XYZ
    let x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    let y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
    let z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;

    // XYZ to Lab
    x /= 0.95047;
    y /= 1.00000;
    z /= 1.08883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    return {
        l: Math.max(0, Math.min(100, 116 * y - 16)),
        a: 500 * (x - y),
        b: 200 * (y - z)
    };
}

// CIE-LabをRGBに変換するためのヘルパー関数
function labToRgb(lab: LAB): { r: number, g: number, b: number } {
    let y = (lab.l + 16) / 116;
    let x = lab.a / 500 + y;
    let z = y - lab.b / 200;

    const y2 = Math.pow(y, 3);
    const x2 = Math.pow(x, 3);
    const z2 = Math.pow(z, 3);

    y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

    // XYZ to RGB
    x *= 0.95047;
    y *= 1.00000;
    z *= 1.08883;

    const r = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
    const g = x * -0.9692660 + y * 1.8760108 + z * 0.0415560;
    const b = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

    // clamp and make integer
    return {
        r: Math.max(0, Math.min(255, Math.round(r * 255))),
        g: Math.max(0, Math.min(255, Math.round(g * 255))),
        b: Math.max(0, Math.min(255, Math.round(b * 255)))
    };
}

// HEXカラーコードをLabカラーに変換
function hexToLRGB(hex: string): RGB {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}


export function combinationColorOnCielab(lhs: string, rhs: string, left_coeff: number, right_coeff: number): string {
    const lhs_rgb = hexToLRGB(lhs);
    const rhs_rgb = hexToLRGB(rhs);
    const lhs_lab = rgbToLab(lhs_rgb);
    const rhs_lab = rgbToLab(rhs_rgb);
    const lab = {
        l: (lhs_lab.l * left_coeff + rhs_lab.l * right_coeff) / 2,
        a: (lhs_lab.a * left_coeff + rhs_lab.a * right_coeff) / 2,
        b: (lhs_lab.b * left_coeff + rhs_lab.b * right_coeff) / 2
    };
    const rgb = labToRgb(lab);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    return hex;
}