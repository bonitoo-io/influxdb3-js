import {expect} from 'chai'
import {throwReturn} from '../../../src/util/common'
import {replaceURLProtocolWithPort} from '../../../src/util/fixUrl'

describe('utils', () => {
  it('throwReturn throws given message', () => {
    const message = 'this is error message'
    expect(() => throwReturn(new Error(message))).to.throw(message)
  })

  it('fixUrl adds port if not present', () => {
    expect(replaceURLProtocolWithPort('http://example.com')).to.deep.equal({
      safe: false,
      url: 'example.com:80',
    })
    expect(replaceURLProtocolWithPort('https://example.com')).to.deep.equal({
      safe: true,
      url: 'example.com:443',
    })
    expect(replaceURLProtocolWithPort('http://example.com:3000')).to.deep.equal(
      {safe: false, url: 'example.com:3000'}
    )
    expect(
      replaceURLProtocolWithPort('https://example.com:5000')
    ).to.deep.equal({safe: true, url: 'example.com:5000'})
  })
})
