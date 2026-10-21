/** The 11-character id of a YouTube link (watch, youtu.be, shorts, embed, live), or null when it is not one. */
export function youtubeId(url: string): string | null {
  const valid = (id: string | null | undefined) => (id && /^[\w-]{11}$/.test(id) ? id : null)
  try {
    const parsed = new URL(url, 'https://example.invalid')
    const host = parsed.hostname.replace(/^(www|m)\./, '')
    if (host === 'youtu.be') return valid(parsed.pathname.slice(1).split('/')[0])
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname === '/watch') return valid(parsed.searchParams.get('v'))
      const match = parsed.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/)
      if (match) return valid(match[1])
    }
  } catch {
    // not a web address (for example a file in /videos/)
  }
  return null
}

/** YouTube's own cover picture for a video: 480 x 360, with the video itself in the 16:9 middle part (the frame crops to it). */
export function youtubeCover(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

/** The file type a browser needs to know to play a video file. */
export function videoMime(url: string): string {
  const extension = url.split(/[?#]/)[0].split('.').pop()?.toLowerCase()
  if (extension === 'webm') return 'video/webm'
  if (extension === 'ogv' || extension === 'ogg') return 'video/ogg'
  if (extension === 'mov') return 'video/quicktime'
  return 'video/mp4'
}
