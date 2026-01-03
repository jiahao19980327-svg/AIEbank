import { Button } from 'antd'
import './SuggestionButtons.css'

interface SuggestionButtonsProps {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
}

const SuggestionButtons = ({
  suggestions,
  onSuggestionClick,
}: SuggestionButtonsProps) => {
  if (suggestions.length === 0) return null

  return (
    <div className="suggestion-buttons">
      <div className="suggestion-label">建议问题：</div>
      <div className="suggestion-list">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            type="default"
            ghost
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion-button"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default SuggestionButtons

