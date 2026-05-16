interface ReviewButtonProps {
  onClick: () => void
  isLoading: boolean
}

function ReviewButton({ onClick, isLoading }: ReviewButtonProps) {
  return (
    <button className="review-button" onClick={onClick} disabled={isLoading}>
      {isLoading ? "The Mother is thinking..." : "Summon the Verdict"}
    </button>
  )
}

export default ReviewButton