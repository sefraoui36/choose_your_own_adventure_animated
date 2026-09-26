function LoadingStatus({ theme }) {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <h2>Generating Your {theme} Story</h2>
        <div className="loading-animation">
          <div className="spinner"></div>
        </div>
        <p className="loading-info">
          Please wait while we craft your adventure...
        </p>
      </div>
    </div>
  );
}

export default LoadingStatus;