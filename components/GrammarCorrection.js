import { useState } from "react";

export default function GrammarCorrection() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  async function handleCorrection() {
    const response = await fetch("/api/grammarCorrection", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
          'content-type': 'application/json'
      }
    });
    const json = await response.json();
    setResult(json.suggestion);
  }

  return (
    <>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleCorrection}>Correct Grammar</button>
      <div>{result}</div>
    </>
  );
}
