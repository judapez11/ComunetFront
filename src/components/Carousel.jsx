import { useState, useEffect, useCallback, useRef } from 'react'
import { Icon } from './Icon'

export default function Carousel({ slides = [], interval = 5000, height = 420 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef(null)

  const goTo = useCallback((i) => {
    setIndex(((i % slides.length) + slides.length) % slides.length)
  }, [slides.length])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const t = setInterval(next, interval)
    return () => clearInterval(t)
  }, [paused, slides.length, interval, next])

  if (!slides.length) return null

  return (
    <div
      style={{ ...styles.wrap, height }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) { dx > 0 ? prev() : next() }
        touchX.current = null
      }}
    >
      <div style={styles.track}>
        {slides.map((s, i) => (
          <div
            key={i}
            style={{
              ...styles.slide,
              transform: `translateX(${(i - index) * 100}%)`,
              opacity: i === index ? 1 : 0,
              zIndex: i === index ? 2 : 1,
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            {s.src && <img src={s.src} alt={s.title || `Slide ${i + 1}`} style={styles.image} />}
            {!s.src && <div style={{ ...styles.gradient, background: s.gradient || 'var(--gradient-primary)' }} />}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button style={styles.arrowL} onClick={prev} aria-label="Anterior">
            <Icon name="arrowLeft" size={22} color="#fff" />
          </button>
          <button style={styles.arrowR} onClick={next} aria-label="Siguiente">
            <Icon name="arrowLeft" size={22} color="#fff" style={{ transform: 'rotate(180deg)' }} />
          </button>
          <div style={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{ ...styles.dot, background: i === index ? '#fff' : 'rgba(255,255,255,0.4)', transform: i === index ? 'scale(1.2)' : 'scale(1)' }}
                aria-label={`Ir a slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  wrap: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 12,
    boxShadow: 'var(--shadow-lg)',
    background: 'var(--bg-alt)',
  },
  track: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  slide: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  arrowL: {
    position: 'absolute',
    top: '50%',
    left: 16,
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 5,
    transition: 'background 0.2s',
    backdropFilter: 'blur(4px)',
  },
  arrowR: {
    position: 'absolute',
    top: '50%',
    right: 16,
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 5,
    transition: 'background 0.2s',
    backdropFilter: 'blur(4px)',
  },
  dots: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 8,
    zIndex: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.2s',
  },
}
