import { describe, it, expect } from 'vitest'
import { isEqual } from '../index'

describe('isEqual', () => {
  it('should return equal for objects that have an equal value and title', () => {
    const a = { value: 'test', title: 'test' }
    const b = { value: 'test', title: 'test' }
    expect(isEqual(a, b)).toBeTruthy()
  })

  it('should return not equal for objects that have an equal title value', () => {
    const a = { value: 'test1', title: 'test' }
    const b = { value: 'test2', title: 'test' }
    expect(isEqual(a, b)).toBeFalsy()
  })
})
