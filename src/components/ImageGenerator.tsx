import { useState } from 'react'
import { useAIGeneration } from '../hooks/useAIGeneration'

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const { isLoading, result, error, errorCode, generate, retry, reset } = useAIGeneration('image')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generate(prompt)
  }

  const isConfigError = errorCode === 'MISSING_API_KEY'

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.iconWrapper}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <h3 style={styles.title}>AI Image Generator</h3>
      </div>
      <p style={styles.description}>Create stunning images from text descriptions using AI.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          disabled={isLoading}
          style={styles.input}
        />
        <div style={styles.buttonRow}>
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            style={{
              ...styles.button,
              ...(isLoading || !prompt.trim() ? styles.buttonDisabled : styles.buttonActive),
            }}
          >
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
          {result && (
            <button type="button" onClick={reset} style={styles.secondaryButton}>
              New Generation
            </button>
          )}
        </div>
      </form>

      {isLoading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Creating your image...</p>
          <p style={styles.loadingHint}>This may take up to 30 seconds</p>
        </div>
      )}

      {error && (
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>!</div>
          <div style={styles.errorContent}>
            <p style={styles.errorText}>{error}</p>
            {isConfigError && (
              <p style={styles.errorHint}>
                The AI service needs to be configured by an administrator before use.
              </p>
            )}
          </div>
          {!isConfigError && (
            <button onClick={retry} style={styles.retryButton}>
              Retry
            </button>
          )}
        </div>
      )}

      {result && !isLoading && (
        <div style={styles.resultContainer}>
          <div style={styles.resultHeader}>
            <span style={styles.resultLabel}>Generated Image</span>
            <a
              href={result}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.openButton}
            >
              Open Full Size
            </a>
          </div>
          <div style={styles.imageWrapper}>
            <img
              src={result}
              alt="AI generated image"
              style={styles.image}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '24px',
    borderRadius: '12px',
    background: 'white',
    border: '1px solid var(--color-neutral-200)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  iconWrapper: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: 'var(--color-primary-50)',
    color: 'var(--color-primary-600)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-neutral-900)',
  },
  description: {
    fontSize: '14px',
    color: 'var(--color-neutral-500)',
    marginBottom: '20px',
    lineHeight: 1.5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid var(--color-neutral-300)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  },
  buttonRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  buttonActive: {
    background: 'var(--color-primary-600)',
    color: 'white',
  },
  buttonDisabled: {
    background: 'var(--color-neutral-200)',
    color: 'var(--color-neutral-400)',
    cursor: 'not-allowed',
  },
  secondaryButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid var(--color-neutral-300)',
    background: 'white',
    color: 'var(--color-neutral-700)',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '32px 0',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid var(--color-neutral-200)',
    borderTopColor: 'var(--color-primary-600)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    fontSize: '14px',
    color: 'var(--color-neutral-500)',
  },
  loadingHint: {
    fontSize: '12px',
    color: 'var(--color-neutral-400)',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px',
    borderRadius: '8px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    marginTop: '16px',
  },
  errorIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'var(--color-error-500)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 700,
    flexShrink: 0,
  },
  errorContent: {
    flex: 1,
    minWidth: 0,
  },
  errorText: {
    fontSize: '14px',
    color: '#991b1b',
    lineHeight: 1.5,
  },
  errorHint: {
    fontSize: '13px',
    color: '#b91c1c',
    marginTop: '4px',
    lineHeight: 1.5,
  },
  retryButton: {
    padding: '6px 14px',
    borderRadius: '6px',
    border: '1px solid #fca5a5',
    background: 'white',
    color: '#991b1b',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
  },
  resultContainer: {
    marginTop: '20px',
    borderRadius: '8px',
    border: '1px solid var(--color-neutral-200)',
    overflow: 'hidden',
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
    background: 'var(--color-neutral-50)',
    borderBottom: '1px solid var(--color-neutral-200)',
  },
  resultLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-neutral-500)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  openButton: {
    padding: '4px 10px',
    borderRadius: '4px',
    border: '1px solid var(--color-neutral-300)',
    background: 'white',
    color: 'var(--color-neutral-600)',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  imageWrapper: {
    padding: '16px',
    background: 'var(--color-neutral-50)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
    display: 'block',
  },
}
