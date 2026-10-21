import { describe, expect, it } from 'vitest'
import { site } from './site'
import { videoMime, youtubeCover, youtubeId } from './video'

describe('youtubeId', () => {
  const id = 'dQw4w9WgXcQ'

  it('finds the id in every common kind of YouTube link', () => {
    expect(youtubeId(`https://www.youtube.com/watch?v=${id}`)).toBe(id)
    expect(youtubeId(`https://youtube.com/watch?v=${id}&t=30s`)).toBe(id)
    expect(youtubeId(`https://m.youtube.com/watch?v=${id}`)).toBe(id)
    expect(youtubeId(`https://youtu.be/${id}?si=abc`)).toBe(id)
    expect(youtubeId(`https://www.youtube.com/shorts/${id}`)).toBe(id)
    expect(youtubeId(`https://www.youtube.com/embed/${id}`)).toBe(id)
    expect(youtubeId(`https://www.youtube-nocookie.com/embed/${id}`)).toBe(id)
  })

  it('says null for anything else, so it is played as a file or opened as a link', () => {
    expect(youtubeId('/videos/how-it-works.mp4')).toBeNull()
    expect(youtubeId('https://www.instagram.com/reel/abc123/')).toBeNull()
    expect(youtubeId('https://www.youtube.com/watch?v=short')).toBeNull()
    expect(youtubeId('https://evil.example/watch?v=dQw4w9WgXcQ')).toBeNull()
    expect(youtubeId('')).toBeNull()
  })
})

describe('youtubeCover', () => {
  it('points at the cover picture YouTube keeps for every video', () => {
    expect(youtubeCover('dQw4w9WgXcQ')).toBe('https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg')
  })
})

describe('site.videos', () => {
  it('lists playable videos with a title in every language and no repeated id', () => {
    const ids = new Set<string>()
    for (const video of site.videos) {
      expect(ids.has(video.id), `repeated id ${video.id}`).toBe(false)
      ids.add(video.id)
      expect(Boolean(youtubeId(video.url)) || video.url.startsWith('/videos/'), `${video.id} is neither a YouTube link nor a file in /videos/`).toBe(true)
      for (const locale of ['uz', 'ru', 'en'] as const) expect(video.title[locale].trim(), `${video.id} title ${locale}`).not.toBe('')
    }
  })
})

describe('videoMime', () => {
  it('maps the common video file types', () => {
    expect(videoMime('/videos/a.mp4')).toBe('video/mp4')
    expect(videoMime('/videos/a.webm?v=2')).toBe('video/webm')
    expect(videoMime('/videos/a.mov')).toBe('video/quicktime')
    expect(videoMime('/videos/a')).toBe('video/mp4')
  })
})
