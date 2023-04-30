import styled from '@emotion/styled';

const LoadingWave = styled.div`
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  .loading-bar {
    width: 16px;
    height: 8px;
    margin: 0 5px;
    background-color: #10B981;
    border-radius: 5px;
    animation: loading-wave-animation 1s ease-in-out infinite;
  }

  .loading-bar:nth-of-type(2) {
    animation-delay: 0.1s;
  }

  .loading-bar:nth-of-type(3) {
    animation-delay: 0.2s;
  }

  .loading-bar:nth-of-type(4) {
    animation-delay: 0.3s;
  }
  
  @keyframes loading-wave-animation {
    0% {
      height: 10px;
    }
  
    50% {
      height: 50px;
    }
  
    100% {
      height: 10px;
    }
  }
`;

const LoadingWaveComponent = () => (
  <LoadingWave>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
  </LoadingWave>
);

export default LoadingWaveComponent;
