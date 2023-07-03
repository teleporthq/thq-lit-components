import { describe, expect, test } from 'vitest'
import { DateTimePrimitive } from './index'
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
global.document = dom.window.document

describe('DateTimePrimitive', () => {
  test('renders formatted date without shadow root', () => {
    const element = new DateTimePrimitive()
    element.date = '2023-07-01T12:34:56'
    element.format = 'YYYY-MM-DD HH:mm:ss'
    element.shadow = false

    const rendered = element.render()

    expect(rendered).toBe('2023-07-01 12:34:56')
  })

  test('renders formatted date with shadow root', () => {
    const element = new DateTimePrimitive()
    element.date = '2023-07-01T12:34:56'
    element.format = 'YYYY-MM-DD HH:mm:ss'
    element.shadow = true

    const rendered = element.render()

    expect(rendered).toBe('2023-07-01 12:34:56')
  })
})
