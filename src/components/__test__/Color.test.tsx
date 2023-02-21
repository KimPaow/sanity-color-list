import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Color } from '../Color'
import { TinyColor } from '@ctrl/tinycolor'

describe('Color', () => {
  it('should call onClick with the new color value', async () => {
    const user = userEvent.setup()
    const color = new TinyColor()
    const onClick = vi.fn()
    render(
      <Color
        color={{ value: '#000000', title: 'Black', tc: color, decorator: color }}
        isActive={false}
        radius={{ outer: '0', inner: '0' }}
        onClick={onClick}
      />
    )
    await user.click(screen.getByRole('button', { name: /black/i }))
    expect(onClick).toHaveBeenCalledWith({ value: '#000000', title: 'Black' })
  })
})
