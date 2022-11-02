<div class="demo-container">
  <div class="progress-bar">
    <div class="progress-bar-value"></div>
  </div>
</div>

<style>
  .demo-container {
    width: 300px;
    margin: auto;
  }

  .progress-bar {
    height: 0.5rem;
    background-color: var(--main-blue);
    width: 100%;
    overflow: hidden;
    border-radius: 1rem;
  }

  .progress-bar-value {
    width: 100%;
    height: 100%;
    background-color: var(--main-orange);
    animation: indeterminateAnimation 1s infinite linear;
    transform-origin: 0% 50%;
    border-radius: 1rem;
  }

  @keyframes indeterminateAnimation {
    0% {
      transform:  translateX(0) scaleX(0);
    }
    40% {
      transform:  translateX(0) scaleX(0.4);
    }
    100% {
      transform:  translateX(100%) scaleX(0.5);
    }
  }
</style>