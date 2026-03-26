import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortendUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const api_url = import.meta.env.VITE_API_BASE_URL;
  const frontend_url = import.meta.env.VITE_FRONTEND_URL;

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

      if (data.message === "URL already exists in database") {
        setShortenedUrl(`${frontend_url}/${data.existingUrl.shortCode}`);
      } else {
        setShortenedUrl(`${frontend_url}/${data.shortCode}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortendUrl);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2 * 1000);
    } catch (error) {
      console.error("failed to copy link", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 text-black flex flex-col items-center justify-start p-6 gap-6">
      <h1 className="text-5xl text-shadow-lg text-shadow-white mt-20 font-extrabold tracking-wider select-none">
        Xitly
      </h1>
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
      {shortendUrl && (
        <div className="flex items-center justify-center gap-6">
          <h1 className="text-2xl font-bold">{shortendUrl}</h1>
          <button
            onClick={handleCopy}
            disabled={isCopied}
            className="px-4 py-2 bg-blue-400 disabled:bg-blue-300 active:scale-98 hover:bg-blue-500 cursor-pointer text-white"
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
