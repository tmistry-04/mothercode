interface CodeInputProps {
  code: string
  onChange: (value: string) => void
}

function CodeInput({ code, onChange }: CodeInputProps) {
  return (
    <div className="input-section">
      <label className="input-label">// paste your code below</label>
      <textarea
        className="code-textarea"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your code here..."
        rows={15}
      />
    </div>
  )
}

export default CodeInput