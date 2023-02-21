import * as React from 'react'
import { describe, vi, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ColorListInput, ColorListSchemaType } from '../ColorListInput'
import { ThemeProvider, studioTheme } from '@sanity/ui'
import { PatchEvent, set, unset } from 'sanity'

describe('ColorListInput', () => {
  const red = { title: 'Red', value: '#FF0000' }
  const green = { title: 'Green', value: '#00FF00' }
  const blue = { title: 'Blue', value: '#0000FF' }

  const type: ColorListSchemaType = {
    name: 'Color List',
    jsonType: 'object',
    fields: [
      // @ts-expect-error - these aren't really important to the test
      { name: 'title', type: 'string' },
      // @ts-expect-error - these aren't really important to the test
      { name: 'value', type: 'string' },
    ],
  }
  const schemaType = {
    name: 'Color List',
    type,
    jsonType: 'object',
    fields: [],
    // eslint-disable-next-line camelcase
    __experimental_search: [],
    readOnly: false,
    options: { list: [red, green, blue] },
  }

  it('should return a color list', () => {
    render(
      <ThemeProvider theme={studioTheme}>
        <ColorListInput
          value={red}
          // @ts-expect-error
          schemaType={schemaType}
        />
      </ThemeProvider>
    )
    // Breaking the usual testing-library rules here to check the css background color
    const redStyle = getInnerStyle(red.title)
    const greenStyle = getInnerStyle(green.title)
    const blueStyle = getInnerStyle(blue.title)
    expect(redStyle.backgroundColor).toBe('rgb(255, 0, 0)')
    expect(greenStyle.backgroundColor).toBe('rgb(0, 255, 0)')
    expect(blueStyle.backgroundColor).toBe('rgb(0, 0, 255)')
    expect(screen.getByRole('button', { name: /red/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /green/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /blue/i })).toBeInTheDocument()
  })

  it('should set the value as the current color', () => {
    render(
      <ThemeProvider theme={studioTheme}>
        <ColorListInput
          value={red}
          // @ts-expect-error
          schemaType={schemaType}
        />
      </ThemeProvider>
    )
    expect(screen.getByRole('button', { name: /red is selected/i })).toBeInTheDocument()
  })

  it('should call onChange with a new color when a color is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ThemeProvider theme={studioTheme}>
        <ColorListInput
          value={red}
          onChange={onChange}
          // @ts-expect-error
          schemaType={schemaType}
        />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: /green/i }))
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(PatchEvent.from(set(green)))
  })

  it('should call onChange with unset when a color is deselected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ThemeProvider theme={studioTheme}>
        <ColorListInput
          value={red}
          onChange={onChange}
          // @ts-expect-error
          schemaType={schemaType}
        />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: /red is selected/i }))
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(PatchEvent.from(unset()))
  })

  it('should show an error when the list is not set', () => {
    render(
      <ThemeProvider theme={studioTheme}>
        <ColorListInput
          value={red}
          // @ts-expect-error
          schemaType={{ type, options: { list: undefined } }}
        />
      </ThemeProvider>
    )
    expect(screen.getByText(/"list" option is not an array/i)).toBeInTheDocument()
  })

  it('should show an error if the color has no value', () => {
    render(
      <ThemeProvider theme={studioTheme}>
        <ColorListInput
          value={red}
          // @ts-expect-error - this is an intentionally invalid color
          schemaType={{ type, options: { list: [{ title: 'Red' }] } }}
        />
      </ThemeProvider>
    )
    expect(screen.getByText(/Could not find a color value/i)).toBeInTheDocument()
  })

  it('should show an error if the color is in an invalid format', () => {
    render(
      <ThemeProvider theme={studioTheme}>
        <ColorListInput
          value={red}
          // @ts-expect-error
          schemaType={{
            type,
            options: { list: [{ title: 'Red', value: 'invalid' }] },
          }}
        />
      </ThemeProvider>
    )
    expect(screen.getByText(/Could not process the format of invalid/i)).toBeInTheDocument()
  })

  function getInnerStyle(color: string): CSSStyleDeclaration {
    const inner = screen.getByTestId(`color-${color}`)
    return window.getComputedStyle(inner)
  }
})
