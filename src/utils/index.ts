import { StudioColorValue } from '../components/ColorListInput'

export const isEqual = (a: StudioColorValue, b: StudioColorValue): boolean =>
  a?.value === b?.value && a?.title === b?.title

export const removeDuplicates = <T>(array: Array<T>): Array<T> => Array.from(new Set(array))
