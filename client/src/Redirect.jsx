const { useEffect } = require("react");
const { useParams } = require("react-router-dom");

function Redirect() {
  const { shortCode } = useParams();
  const api_url = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    window.location.href = `${api_url}/${shortCode}`;
  }, []);

  return <p>Loading...</p>;
}

export default Redirect;
