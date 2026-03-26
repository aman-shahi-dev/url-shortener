import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortendUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const api_url = import.meta.env.VITE_API_BASE_URL;

  const handleGenerate = async () => {
    if (!url) return;

    setLoading(true);

    try {
      const res = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      if (!res.ok) {
        setError("Something went wrong on the server");
      }
      const data = await res.json();

      setShortenedUrl(`${api_url}/${data.shortCode}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 text-black flex flex-col items-center justify-start p-6 gap-6">
      <h1 className="text-4xl mt-20">URL Shortener</h1>
      <div className="flex gap-6 items-center justify-center w-full rounded-md p-6 ">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          name="url"
          type="text"
          placeholder="paste your url"
          className="px-4 py-2 text-xl outline-none max-w-xl w-full  bg-white shadow-xl"
        />
        <button
          onClick={handleGenerate}
          className="px-4 py-2 text-xl bg-blue-400 text-white hover:bg-blue-500 cursor-pointer flex items-center justify-center active:scale-98"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      {error && <p className="text-red-500 text-xl">{error}</p>}
      {shortendUrl}
    </div>
  );
}

export default App;
