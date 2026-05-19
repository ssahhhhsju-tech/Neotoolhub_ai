import { useState, useCallback } from 'react'

type GenerationType = 'text' | 'image'

interface GenerationState {
  isLoading: boolean
  result: string | null
  error: string | null
  errorCode: string | null
}

interface UseAIGenerationReturn extends GenerationState {
  generate: (prompt: string) => Promise<void>
  retry: () => Promise<void>
  reset: () => void
}

function getEdgeFunctionUrl(type: GenerationType): string | null {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL
  if (!baseUrl) return null
  const fn = type === 'text' ? 'generate-text' : 'generate-image'
  return `${baseUrl}/functions/v1/${fn}`
}

function getAnonKey(): string | null {
  return import.meta.env.VITE_SUPABASE_ANON_KEY || null
}

export function useAIGeneration(type: GenerationType): UseAIGenerationReturn {
  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    result: null,
    error: null,
    errorCode: null,
  })

  const [lastPrompt, setLastPrompt] = useState<string>('')

  const generate = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return

    const url = getEdgeFunctionUrl(type)
    const anonKey = getAnonKey()

    if (!url || !anonKey) {
      setState({
        isLoading: false,
        result: null,
        error: 'AI features are unavailable. Required environment variables are not configured.',
        errorCode: 'MISSING_CONFIG',
      })
      return
    }

    setLastPrompt(prompt)
    setState({ isLoading: true, result: null, error: null, errorCode: null })

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorCode = data?.code || 'SERVICE_ERROR'
        setState({
          isLoading: false,
          result: null,
          error: data?.error || `Request failed with status ${response.status}.`,
          errorCode,
        })
        return
      }

      if (data?.error) {
        setState({
          isLoading: false,
          result: null,
          error: data.error,
          errorCode: data.code || 'SERVICE_ERROR',
        })
        return
      }

      if (data?.result) {
        setState({ isLoading: false, result: data.result, error: null, errorCode: null })
      } else {
        setState({
          isLoading: false,
          result: null,
          error: 'No result was returned. Please try again.',
          errorCode: 'NO_RESULT',
        })
      }
    } catch {
      setState({
        isLoading: false,
        result: null,
        error: 'An unexpected error occurred. Please try again.',
        errorCode: 'CATCH_ERROR',
      })
    }
  }, [type])

  const retry = useCallback(async () => {
    if (lastPrompt) {
      await generate(lastPrompt)
    }
  }, [lastPrompt, generate])

  const reset = useCallback(() => {
    setState({ isLoading: false, result: null, error: null, errorCode: null })
    setLastPrompt('')
  }, [])

  return { ...state, generate, retry, reset }
}
