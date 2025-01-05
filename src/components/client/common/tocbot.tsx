import React from 'react'
import * as tocbot from 'tocbot'

const TOCBOT_OPTIONS = {
  tocSelector: '.js-toc',
  contentSelector: '.js-toc-content',
  headingSelector: 'h2, h3, h4, h5, h6',
  positionFixedSelector: '.js-toc',
  includeHtml: true,
  includeTitleTags: false,
  hasInnerContainers: true,
  headingsOffset: 40,
  scrollSmoothOffset: -40,
  enableUrlHashUpdateOnScroll: true,
  // skipRendering: true,
}

export default class Tocbot extends React.Component {
  componentDidMount () {
    if (tocbot) {
      tocbot.init(Object.assign({}, TOCBOT_OPTIONS, this.props))
    }
  }

  componentWillUnmount () {
    if (tocbot) {
      tocbot.destroy()
    }
  }

  render () {
    return null
  }
}
