import { useState } from 'react'
import { dictionaries } from '../i18n'
import { useI18n } from '../i18n/context'
import type { Locale } from '../routes'
import { site, type SiteVideo } from '../site'
import { videoMime, youtubeId } from '../video'

/** The round play button: white disc, red triangle. Drawn, so it costs nothing to download. */
function PlayButton() {
  return (
    <span className="video__play" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M9 6.6v10.8a.8.8 0 0 0 1.2.7l8.6-5.4a.8.8 0 0 0 0-1.4L10.2 5.9A.8.8 0 0 0 9 6.6z" fill="currentColor" />
      </svg>
    </span>
  )
}

/**
 * A YouTube video plays in place after a tap. Until then nothing from YouTube is loaded (no tracking, no weight); without
 * JavaScript the cover is simply a link to the video on YouTube.
 */
function YouTubeVideo({ id, title, poster }: { id: string; title: string; poster?: string }) {
  const { t } = useI18n()
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        className="video__fill"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    )
  }
  return (
    <a
      className="video__fill video__cover"
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener"
      aria-label={`${t.videos.play}: ${title}`}
      onClick={(event) => {
        event.preventDefault()
        setPlaying(true)
      }}
    >
      {poster && <img src={poster} alt="" loading="lazy" decoding="async" />}
      <PlayButton />
    </a>
  )
}

function Video({ video }: { video: SiteVideo }) {
  const { locale } = useI18n()
  const title = video.title[locale]
  const youtube = youtubeId(video.url)

  return (
    <figure className="video">
      <div className="video__frame">
        {youtube ? (
          <YouTubeVideo id={youtube} title={title} poster={video.poster} />
        ) : (
          // A file you host: the browser's own player, and nothing is downloaded until someone presses play.
          // Captions are optional (site.ts: captions), so the lint rule that asks for a <track> is switched off here.
          // oxlint-disable-next-line jsx-a11y/media-has-caption
          <video className="video__fill" controls preload="none" playsInline poster={video.poster} aria-label={title}>
            <source src={video.url} type={videoMime(video.url)} />
            {(Object.entries(video.captions ?? {}) as Array<[Locale, string]>).map(([language, src]) => (
              <track key={language} kind="captions" srcLang={language} label={dictionaries[language].languageName} src={src} default={language === locale} />
            ))}
          </video>
        )}
      </div>
      <figcaption className="video__title">{title}</figcaption>
    </figure>
  )
}

/** The Videos section. Until the owner supplies videos (site.videos) it shows three empty frames, like the other placeholders. */
export function Videos() {
  const { t } = useI18n()
  const videos = site.videos

  return (
    <section id="videos" className="section section--joined" aria-labelledby="videos-title">
      <div className="container">
        <header className="section__head section__head--center">
          <p className="eyebrow">{t.videos.eyebrow}</p>
          <h2 id="videos-title" className="h2">
            {t.videos.title}
          </h2>
        </header>

        {videos.length > 0 ? (
          <div className="videos" data-count={videos.length}>
            {videos.map((video) => (
              <Video key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="videos" data-count="3" aria-hidden="true">
            {[1, 2, 3].map((number) => (
              <div key={number} className="video">
                <div className="video__frame video__frame--empty">
                  <PlayButton />
                  <span>[VIDEO {number}]</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
