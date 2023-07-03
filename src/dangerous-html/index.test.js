import { describe, expect, test } from 'vitest'
import { DangerouslySetInnerHtmlContent } from './index'
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
global.document = dom.window.document

describe('HTML-Embed test', () => {
  test('renders HTML content without shadow root', async () => {
    const element = new DangerouslySetInnerHtmlContent()
    element.setAttribute('html', '<div>Hello, World!</div>')
    element.shadow = false

    document.body.appendChild(element)

    const loadEvent = new Event('load')
    window.dispatchEvent(loadEvent)
    await Promise.resolve()

    expect(element.shadow).toBeFalsy()
    expect(element.createRenderRoot()).toEqual(element)
    expect(element.innerHTML).toBe('<div>Hello, World!</div><!---->')
    element.remove()
  })

  test('renders HTML content with shadow root', async () => {
    const element = new DangerouslySetInnerHtmlContent()
    element.html = '<div>Hello, World!</div>'
    element.shadow = true

    document.body.appendChild(element)

    const loadEvent = new Event('load')
    window.dispatchEvent(loadEvent)

    await Promise.resolve()

    expect(element.shadowRoot.innerHTML).toBe('<div>Hello, World!</div><!---->')
    element.remove()
  })
})
