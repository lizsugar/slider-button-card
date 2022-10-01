import { tinycolor, TinyColor } from '@ctrl/tinycolor';
import { computeDomain } from 'custom-card-helpers';
import copy from 'fast-copy';
import { Domain, SliderConfig, SliderConfigDefault, SliderConfigDefaultDomain } from './types';

export function getEnumValues(enumeration): string[] {
  return Object.keys(enumeration).map(key => enumeration[key]).filter(value => typeof value === 'string');
}

export const applyPatch = (data, path, value): void => {
  if (path.length === 1) {
    data[path[0]] = value;
    return;
  }
  if (!data[path[0]]) {
    data[path[0]] = {};
  }
  // eslint-disable-next-line consistent-return
  return applyPatch(data[path[0]], path.slice(1), value);
};

export function getSliderDefaultForEntity(entity: string): SliderConfig {
  const domain = computeDomain(entity) || Domain.LIGHT;
  const cfg = SliderConfigDefaultDomain.get(domain) || SliderConfigDefault;
  return copy(cfg);
}

export function getLightColorBasedOnTemperature(current: number, min: number, max: number): string {
  const high = new TinyColor('rgb(255, 160, 0)'); // orange-ish
  const low = new TinyColor('rgb(166, 209, 255)'); // blue-ish
  const middle = new TinyColor('white');
  const mixAmount = ((current - min) / (max - min)) * 100;
  if (mixAmount < 50) {
    return tinycolor(low)
      .mix(middle, mixAmount * 2)
      .toRgbString();
  } else {
    return tinycolor(middle)
      .mix(high, (mixAmount - 50) * 2)
      .toRgbString();
  }
}
export function round(number: number, precision: number): number {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export function toPercentage(value: number, min: number, max: number): number {
  return round((((value - min) / max) * 100), 1);
  // return ((value - min) * 100) / (max - min);
}

export function percentageToValue(percent: number, min: number, max: number): number {
  return round(((percent * (max - min) / 100) + min), 1);
}

export const normalize = (value: number, min: number, max: number): number => {
  if (isNaN(value) || isNaN(min) || isNaN(max)) {
    // Not a number, return 0
    return 0;
  }
  if (value > max) return max;
  if (value < min) return min;
  return value;
};

export function applyStep(value: number, step: number): number {
    const rounded = Math.round(value / step) * step;
    return rounded;
}

export function stepToPrecision(step: number): number {
	return Math.ceil(Math.log(step)) * -1;
}

export const capitalizeFirst = (s): string => (s && s[0].toUpperCase() + s.slice(1)) || "";
