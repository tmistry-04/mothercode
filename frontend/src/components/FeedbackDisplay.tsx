import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface FeedbackDisplayProps {
  feedback: string | null
  title?: string
}

function FeedbackDisplay({ feedback, title = '// The Mother speaks' }: FeedbackDisplayProps) {
  if (!feedback) {
    return null
  }

  return (
    <div className="feedback-section" role="region" aria-label="Feedback">
      <p className="feedback-title">{title}</p>
      <div className="feedback-text">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {feedback}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default FeedbackDisplay