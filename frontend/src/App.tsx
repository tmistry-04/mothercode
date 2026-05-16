// We are importing the useState "hook" from the React library
// A hook is a special React function that lets us add features to our components
// useState specifically lets us create and manage state (our whiteboard)
// Without this import, we can't use useState below
import { useState } from 'react'
import './App.css'

// We are importing the CodeInput component we built in CodeInput.tsx
// The './' means "look in the current folder"
// The './components/CodeInput' means "go into the components folder and find CodeInput"
// This is how React knows to use OUR component and not some random one
import CodeInput from './components/CodeInput'

// Same thing — importing our ReviewButton component
import ReviewButton from './components/ReviewButton'
import FeedbackDisplay from './components/FeedbackDisplay'

// This is our main App component — it's just a JavaScript function
// Every React component is a function that returns JSX (the HTML-looking stuff)
// This is the "parent" component — it owns everything
function App() {

  // useState creates a "whiteboard" to track the user's code
  // const [code, setCode] means:
  //   - "code" is the current value written on the whiteboard (starts as "" empty string)
  //   - "setCode" is the marker — the ONLY way to update the whiteboard
  // useState("") means the whiteboard starts with an empty string written on it
  // Every time setCode is called, React re-renders the UI to reflect the new value
  const [code, setCode] = useState("")

  // A second whiteboard — this one tracks whether we are waiting for the API response
  // It's a boolean (true/false) and starts as false because when the app loads
  // we are NOT currently waiting for anything
  // We will set this to true when the button is clicked and back to false when the response arrives
  const [isLoading, setIsLoading] = useState(false)

  const [feedback, setFeedback] = useState<string | null>(null)

  

  // This is the function that will run when the user clicks the "Roast My Code" button
  // Right now it just logs to the console so we can confirm everything is connected
  // Later we will replace console.log with the actual API call to our FastAPI backend
  // const handleReview = () => {} is an "arrow function" — same as def handleReview(): in Python
  const handleReview = async () => {
    // Don't make the API call if the textarea is empty or just whitespace
    if (!code.trim()) {
      setFeedback("Please paste some code first.")
      return
    }
    // Set isLoading to true — this disables the button and shows "Analyzing..."
    setIsLoading(true)
    
    // Clear any previous feedback
    setFeedback(null)

    try {
      // fetch is the browser's built-in way to make HTTP requests
      // We're sending a POST request to our FastAPI backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/review`, {
        method: "POST",
        headers: {
          // Tell the backend we're sending JSON
          "Content-Type": "application/json"
        },
        // Send the code as JSON — this is what FastAPI receives as CodeRequest
        body: JSON.stringify({ code: code })
      })

      // Check if the server returned an error status (4xx, 5xx)
      // fetch only rejects on network failure, NOT on server errors
      // so we need to manually check response.ok
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      // Parse the JSON response from FastAPI
      // Update the feedback whiteboard with Claude's response
      // This will trigger FeedbackDisplay to show the feedback
      const data = await response.json()
      setFeedback(data.feedback)

    } catch (error) {
      // Check if it's a network error (backend not running)
      // or a server error (backend crashed)
      if (error instanceof TypeError) {
        setFeedback("Network error — is the backend running?")
      } else if (error instanceof Error) {
        setFeedback(`Error: ${error.message}`)
      } else {
        setFeedback("Something went wrong. Please try again.")
      }
    } finally {
      // Whether it succeeded or failed, stop the loading state
      setIsLoading(false)
    }
  }

  // Everything inside return() is what actually gets displayed on the screen
  // This is JSX — it looks like HTML but it's actually JavaScript under the hood
  // React takes this and turns it into real HTML in the browser
  return (
    <div className="app-container">
      <div className="header">
        <h1>MotherCode</h1>
        <p>Submit your code. Receive the verdict.</p>
      </div>
      <CodeInput code={code} onChange={setCode} />
      <ReviewButton onClick={handleReview} isLoading={isLoading} />
      <FeedbackDisplay feedback={feedback} />
    </div>
  )
  }

// This line makes the App component available to be imported by other files
// main.tsx imports App and renders it into the page
// Without this line, nothing would show up
export default App