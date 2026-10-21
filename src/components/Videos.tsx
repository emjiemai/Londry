import { useState } from 'react'
import { dictionaries } from '../i18n'
import { useI18n } from '../i18n/context'
import type { Locale } from '../routes'
import { site, type SiteVideo } from '../site'
import { videoMime, youtubeCover, youtubeId } from '../video'

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
 * A YouTube video plays in place after a tap. Until then no YouTube player or script is loaded (no tracking, no weight): the
 * frame shows YouTube's cover picture (one small image, loaded when the row comes near the screen), and without JavaScript the
 * cover is simply a link to the video on YouTube.
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
      <img src={poster ?? youtubeCover(id)} alt="" width={480} height={360} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
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

function VideoGrid({ videos }: { videos: SiteVideo[] }) {
  return (
    <div className="videos" data-count={videos.length}>
      {videos.map((video) => (
        <Video key={video.id} video={video} />
      ))}
    </div>
  )
}

/**
 * The Videos section: the owner's videos (site.videos), the how-to videos first, then a "Reviews" row with the customer videos.
 * Nothing is written above the first row (the owner does not want words added). With no videos the section is left out.
 */
export function Videos() {
  const { t } = useI18n()
  const general = site.videos.filter((video) => video.group !== 'review')
  const reviews = site.videos.filter((video) => video.group === 'review')
  if (general.length + reviews.length === 0) return null

  return (
    <section id="videos" className="section section--joined" aria-label={t.videos.label}>
      <div className="container">
        {general.length > 0 && <VideoGrid videos={general} />}
        {reviews.length > 0 && (
          <>
            <h2 className="h2 videos__heading">{t.videos.reviewsTitle}</h2>
            <VideoGrid videos={reviews} />
          </>
        )}
      </div>
    </section>
  )
}
