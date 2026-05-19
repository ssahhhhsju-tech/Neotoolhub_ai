import { useState, useCallback } from 'react'
import { supabase, isConfigured } from '../lib/supabase'

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

    if (!isConfigured) {
      setState({
        isLoading: false,
        result: null,
        error: 'AI features are not available. Supabase is not configured for this deployment.',
        errorCode: 'MISSING_CONFIG',
      })
      return
    }

    setLastPrompt(prompt)
    setState({ isLoading: true, result: null, error: null, errorCode: null })

    try {
      const functionName = type === 'text' ? 'generate-text' : 'generate-image'
      const { data, error: invokeError } = await supabase.functions.invoke(functionName, {
        body: { prompt: prompt.trim() },
      })

      if (invokeError) {
        const status = invokeError.context?.status
        if (status === 401 || status === 403) {
          setState({
            isLoading: false,
            result: null,
            error: 'Authentication required. Please sign in to use AI features.',
            errorCode: 'AUTH_REQUIRED',
          })
        } else {
          setState({
            isLoading: false,
            result: null,
            error: 'Failed to connect to AI service. Please try again.',
            errorCode: 'INVOKE_ERROR',
          })
        }
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
