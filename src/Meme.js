import { useState, useEffect } from "react";

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage:
      "https://marqueex.com/wp-content/uploads/2020/11/0f5e891d-f984-49e6-8c64-1d24b83cb7df.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes))
      .catch((err) => setError(err.message));
  }, []);

  function getRandomImage() {
    if (allMemes.length === 0) {
      console.log("Meme data not available yet");
      return;
    }

    const memeImg = allMemes[Math.floor(Math.random() * allMemes.length)];
    let url = memeImg.url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-6 border-end">
            <div className="position-relative">
              <img
                src={meme.randomImage}
                className="card-img"
                alt="Card image"
              />
              <div
                className="top-text position-absolute start-0 end-0 text-center"
                style={{ top: 0, zIndex: 1 }}
              >
                <h1 className="meme-text fw-bold text-uppercase">
                  {meme.topText}
                </h1>
              </div>
              <div
                className="bottom-text position-absolute start-0 end-0 text-center"
                style={{ bottom: 0, zIndex: 1 }}
              >
                <h1 className="meme-text fw-bold text-uppercase">
                  {meme.bottomText}
                </h1>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="top_text" className="form-label fw-semibold">
                    Top Text
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-1"
                    name="topText"
                    id="top_text"
                    value={meme.topText}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label
                    htmlFor="bottom_text"
                    className="form-label fw-semibold"
                  >
                    Bottom Text
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-1"
                    name="bottomText"
                    id="bottom_text"
                    value={meme.bottomText}
                    onChange={handleChange}
                  />
                </div>
                {error && <p>Error: {error}</p>}
                <div className="form-group mb-3">
                  <button
                    type="button"
                    className="btn btn-dark w-100 rounded-1 p-2"
                    onClick={getRandomImage}
                    disabled={allMemes.length === 0}
                  >
                    New Meme Image 🖼️
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meme;
