import { useState, useCallback } from 'react'
import { TextGenerator } from './components/TextGenerator'
import { ImageGenerator } from './components/ImageGenerator'
import { isConfigured } from './lib/supabase'

type Tab = 'text' | 'image'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('text')

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logoGroup}>
            <div style={styles.logo}>N</div>
            <span style={styles.brandName}>Neotoolhub</span>
          </div>
          <nav style={styles.nav}>
            <button onClick={() => scrollTo('tools')} style={styles.navButton}>
              Tools
            </button>
            <button onClick={() => scrollTo('about')} style={styles.navButton}>
              About
            </button>
          </nav>
        </div>
      </header>

      {/* Config Warning */}
      {!isConfigured && (
        <div style={styles.configBanner}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>AI features are unavailable -- Supabase is not configured for this deployment.</span>
        </div>
      )}

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.badge}>AI-Powered Platform</div>
          <h1 style={styles.heroTitle}>
            Generate Text & Images
            <br />
            <span style={styles.heroAccent}>with AI</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Harness the power of artificial intelligence to generate creative text and stunning
            images. Enter a prompt and let AI do the rest.
          </p>
          <button onClick={() => scrollTo('tools')} style={styles.heroButton}>
            Get Started
          </button>
        </div>
      </section>

      {/* AI Tools Section */}
      <section id="tools" style={styles.toolsSection}>
        <div style={styles.toolsInner}>
          {/* Tab Switcher */}
          <div style={styles.tabBar}>
            <button
              onClick={() => setActiveTab('text')}
              style={{
                ...styles.tab,
                ...(activeTab === 'text' ? styles.tabActive : styles.tabInactive),
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Text Generation
            </button>
            <button
              onClick={() => setActiveTab('image')}
              style={{
                ...styles.tab,
                ...(activeTab === 'image' ? styles.tabActive : styles.tabInactive),
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Image Generation
            </button>
          </div>

          {/* Tab Content */}
          <div style={styles.tabContent}>
            {activeTab === 'text' ? <TextGenerator /> : <ImageGenerator />}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutInner}>
          <h2 style={styles.aboutTitle}>How It Works</h2>
          <div style={styles.stepsGrid}>
            <div style={styles.step}>
              <div style={styles.stepNumber}>1</div>
              <h3 style={styles.stepTitle}>Enter a Prompt</h3>
              <p style={styles.stepText}>Describe what you want to generate in plain language.</p>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNumber}>2</div>
              <h3 style={styles.stepTitle}>AI Processes</h3>
              <p style={styles.stepText}>Our AI models analyze your prompt and generate content.</p>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNumber}>3</div>
              <h3 style={styles.stepTitle}>Get Results</h3>
              <p style={styles.stepText}>View, copy, or download your AI-generated content instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Neotoolhub AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--color-neutral-50)',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--color-neutral-200)',
  },
  headerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 700,
    fontSize: '16px',
  },
  brandName: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--color-neutral-900)',
    letterSpacing: '-0.02em',
  },
  nav: {
    display: 'flex',
    gap: '8px',
  },
  navButton: {
    padding: '6px 14px',
    borderRadius: '6px',
    border: 'none',
    background: 'transparent',
    color: 'var(--color-neutral-600)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  configBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    background: '#fffbeb',
    borderBottom: '1px solid #fde68a',
    color: '#92400e',
    fontSize: '13px',
    fontWeight: 500,
    textAlign: 'center',
    justifyContent: 'center',
  },
  hero: {
    background: 'linear-gradient(180deg, var(--color-primary-50) 0%, var(--color-neutral-50) 100%)',
    padding: '64px 24px 48px',
    textAlign: 'center',
  },
  heroInner: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  badge: {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '9999px',
    background: 'var(--color-primary-100)',
    color: 'var(--color-primary-700)',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    color: 'var(--color-neutral-900)',
    marginBottom: '16px',
  },
  heroAccent: {
    color: 'var(--color-primary-600)',
  },
  heroSubtitle: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: 'var(--color-neutral-500)',
    maxWidth: '540px',
    margin: '0 auto 28px',
  },
  heroButton: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '12px 28px',
    borderRadius: '8px',
    border: 'none',
    background: 'var(--color-primary-600)',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.25)',
  },
  toolsSection: {
    padding: '0 24px 64px',
  },
  toolsInner: {
    maxWidth: '720px',
    margin: '0 auto',
  },
  tabBar: {
    display: 'flex',
    gap: '4px',
    padding: '4px',
    borderRadius: '10px',
    background: 'var(--color-neutral-100)',
    marginBottom: '20px',
  },
  tab: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  tabActive: {
    background: 'white',
    color: 'var(--color-primary-700)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  tabInactive: {
    background: 'transparent',
    color: 'var(--color-neutral-500)',
  },
  tabContent: {
    minHeight: '200px',
  },
  aboutSection: {
    padding: '64px 24px',
    background: 'white',
    borderTop: '1px solid var(--color-neutral-200)',
  },
  aboutInner: {
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
  },
  aboutTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--color-neutral-900)',
    letterSpacing: '-0.02em',
    marginBottom: '40px',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '32px',
  },
  step: {
    textAlign: 'center',
  },
  stepNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--color-primary-100)',
    color: 'var(--color-primary-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 700,
    margin: '0 auto 16px',
  },
  stepTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-neutral-900)',
    marginBottom: '8px',
  },
  stepText: {
    fontSize: '14px',
    lineHeight: 1.5,
    color: 'var(--color-neutral-500)',
  },
  footer: {
    padding: '32px 24px',
    background: 'var(--color-neutral-900)',
    color: 'var(--color-neutral-400)',
    textAlign: 'center',
    fontSize: '14px',
    marginTop: 'auto',
  },
}

export default App
