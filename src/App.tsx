import { useState } from 'react'

const features = [
  {
    title: 'AI-Powered Tools',
    description: 'Intelligent automation and analysis tools powered by cutting-edge AI models.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Smart Workflows',
    description: 'Streamline your processes with customizable, automated workflows.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Analytics',
    description: 'Monitor performance and gain insights with live dashboards and reports.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Secure Platform',
    description: 'Enterprise-grade security with end-to-end encryption and access controls.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
]

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-neutral-200)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
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
              }}
            >
              N
            </div>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--color-neutral-900)',
                letterSpacing: '-0.02em',
              }}
            >
              Neotoolhub
            </span>
          </div>
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a
              href="#features"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--color-neutral-600)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
            >
              Features
            </a>
            <a
              href="#cta"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--color-neutral-600)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--color-primary-50) 0%, var(--color-neutral-50) 100%)',
          padding: '96px 24px 80px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'var(--color-primary-100)',
              color: 'var(--color-primary-700)',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '24px',
            }}
          >
            Now in Public Beta
          </div>
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--color-neutral-900)',
              marginBottom: '20px',
            }}
          >
            AI Tools That
            <br />
            <span style={{ color: 'var(--color-primary-600)' }}>Accelerate</span> Your Work
          </h1>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--color-neutral-500)',
              maxWidth: '600px',
              margin: '0 auto 40px',
            }}
          >
            Neotoolhub brings together intelligent automation, smart workflows, and real-time
            analytics in one powerful platform.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 28px',
                borderRadius: '8px',
                background: 'var(--color-primary-600)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.15s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.25)',
              }}
            >
              Get Started Free
            </a>
            <a
              href="#features"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 28px',
                borderRadius: '8px',
                border: '1px solid var(--color-neutral-300)',
                background: 'white',
                color: 'var(--color-neutral-700)',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'border-color 0.15s',
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{ padding: '80px 24px', background: 'var(--color-neutral-50)' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-neutral-900)',
                marginBottom: '12px',
              }}
            >
              Everything You Need
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--color-neutral-500)',
                maxWidth: '500px',
                margin: '0 auto',
              }}
            >
              A comprehensive suite of tools designed to supercharge your productivity.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                style={{
                  padding: '32px',
                  borderRadius: '12px',
                  background: 'white',
                  border: '1px solid var(--color-neutral-200)',
                  transition: 'box-shadow 0.2s, border-color 0.2s',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: 'var(--color-primary-50)',
                    color: 'var(--color-primary-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--color-neutral-900)',
                    marginBottom: '8px',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'var(--color-neutral-500)',
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '12px',
            }}
          >
            Start Building Today
          </h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.6,
              opacity: 0.85,
              marginBottom: '32px',
            }}
          >
            Join the waitlist to get early access to Neotoolhub AI tools and workflows.
          </p>
          {submitted ? (
            <div
              style={{
                padding: '16px 24px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.15)',
                fontSize: '15px',
                fontWeight: 500,
              }}
            >
              Thanks for signing up! We'll be in touch soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                gap: '8px',
                maxWidth: '440px',
                margin: '0 auto',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'white',
                  color: 'var(--color-primary-700)',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '32px 24px',
          background: 'var(--color-neutral-900)',
          color: 'var(--color-neutral-400)',
          textAlign: 'center',
          fontSize: '14px',
        }}
      >
        <p>&copy; {new Date().getFullYear()} Neotoolhub AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
