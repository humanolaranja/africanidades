import React, { useCallback, useEffect, useState } from "react";
import useGoogleSheets from "use-google-sheets";
import { apiKey, sheetId } from "./config";
import "./App.css";

export const App = () => {
  const [videoId, setVideoId] = useState("");
  const [videos, setVideos] = useState([]);
  const { data, loading, error } = useGoogleSheets({ apiKey, sheetId });
  const handleKeyUp = useCallback((event) => closeModal(event), []);

  useEffect(() => {
    if (!loading && !error) {
      setVideos(data[0].data);
    }
  }, [data, error, loading]);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  const playVideo = (e, id) => {
    e.preventDefault();
    document.body.classList.add("show-video-modal");
    document.body.classList.add("noscroll");
    setVideoId(`https://www.youtube.com/embed/${id}?autoplay=1`);
  };

  const closeModal = (e) => {
    e.preventDefault();
    document.body.classList.remove("show-video-modal");
    document.body.classList.remove("noscroll");
    setVideoId("");
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="uil-ring-css">
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main>
        <section className="column left banner">
          <a
            href={`https://www.youtube.com/watch?v=${videos[0]?.id}`}
            className="video-banner js-trigger-video-modal"
            onClick={(event) => playVideo(event, videos[0]?.id)}
          >
            <img
              alt="video-thumb"
              className="video-banner-img"
              src={`https://img.youtube.com/vi/${videos[0]?.id}/hqdefault.jpg`}
            />
            <span className="video-banner-headline">{videos[0]?.name}</span>
            <img
              className="video-banner-icon-play"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyAKCXZlcnNpb249IjEuMSIgCgl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIAoJeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCgl4PSIwIgoJeT0iMCIKCXZpZXdCb3g9IjAgMCA3MiA3MiIgCglzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA3MiA3MjsiIAoJeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgCgl3aWR0aD0iIiAKCWhlaWdodD0iIiAKPgogICAgICAgIDxwYXRoIGQ9Ik0zNiw3MiBDNTUuOSw3MiA3Miw1NS45IDcyLDM2IEM3MiwxNi4xIDU1LjksMCAzNiwwIEMxNi4xLDAgMCwxNi4xIDAsMzYgQzAsNTUuOSAxNi4xLDcyIDM2LDcyIFogTTM2LDggQzUxLjQsOCA2NCwyMC42IDY0LDM2IEM2NCw1MS40IDUxLjQsNjQgMzYsNjQgQzIwLjYsNjQgOCw1MS40IDgsMzYgQzgsMjAuNiAyMC42LDggMzYsOCBaIiBpZD0iU2hhcGUiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik0yNiw1MS43IEMyNi4zLDUxLjkgMjYuNyw1MiAyNyw1MiBDMjcuMyw1MiAyNy43LDUxLjkgMjgsNTEuNyBMNTIsMzcuNyBDNTIuNiwzNy4zIDUzLDM2LjcgNTMsMzYgQzUzLDM1LjMgNTIuNiwzNC42IDUyLDM0LjMgTDI4LDIwLjMgQzI3LjQsMTkuOSAyNi42LDE5LjkgMjYsMjAuMyBDMjUuNCwyMC43IDI1LDIxLjMgMjUsMjIgTDI1LDUwIEMyNSw1MC43IDI1LjQsNTEuNCAyNiw1MS43IFoiIGlkPSJTaGFwZSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+Cjwvc3ZnPg=="
              alt="Play Video"
            />
          </a>
        </section>
        <section className="column right">
          <article className="content">
            <h1>Outros vídeos produzidos em Africanidades</h1>
            <h3>Unicamp</h3>
            <div className="video-thumb-grid">
              {videos.slice(1).map((video, i) => (
                <a
                  key={i}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  data-tooltip={video.name}
                  className="video-thumb js-trigger-video-modal"
                  onClick={(event) => playVideo(event, video.id)}
                >
                  <img
                    className="video-banner-img"
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.name}
                  />
                  <div className="overlayText">
                    <div className="text">{video.name}</div>
                  </div>
                </a>
              ))}
            </div>
          </article>
        </section>
      </main>
      <section className="video-modal">
        <div id="video-modal-content" className="video-modal-content">
          <iframe
            title="video"
            id="youtube"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
            src={videoId}
          ></iframe>
          <button
            className="close-video-modal"
            onClick={(event) => closeModal(event)}
          ></button>
        </div>
        <div className="overlay" onClick={(event) => closeModal(event)}></div>
      </section>
    </>
  );
};

export default App;
