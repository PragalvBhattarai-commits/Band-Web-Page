// Initialize all Lottie animations
document.addEventListener("DOMContentLoaded", function () {
  // Helper function to format time display
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // Helper function to set up animations and controls
  function setupAnimation(index) {
    const animation = lottie.loadAnimation({
      container: document.getElementById(`animation${index}`),
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: `/animations/Scenario-0${index}.json`,
    });

    const toggleBtn = document.getElementById(`toggle${index}`);
    const progressBar = document.getElementById(`progress-bar${index}`);
    const progressContainer = document.getElementById(`progress${index}`);
    const scrubber = document.getElementById(`scrubber${index}`);
    const timeDisplay = document.getElementById(`time-display${index}`);

    let isPlaying = false;
    let isDragging = false;

    // Initialize animation properties
    animation.addEventListener("DOMLoaded", () => {
      const totalDuration = animation.totalFrames / animation.frameRate;
      timeDisplay.textContent = `0:00 / ${formatTime(totalDuration)}`;
    });

    // Update progress bar and time display during playback
    animation.addEventListener("enterFrame", () => {
      if (!isDragging) {
        const progress = (animation.currentFrame / animation.totalFrames) * 100;
        progressBar.style.width = `${progress}%`;
        scrubber.style.left = `${progress}%`;

        const currentTime = animation.currentFrame / animation.frameRate;
        const totalTime = animation.totalFrames / animation.frameRate;
        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(
          totalTime
        )}`;
      }
    });

    // Toggle play/pause
    toggleBtn.addEventListener("click", () => {
      if (isPlaying) {
        animation.pause();
        toggleBtn.textContent = "▶";
      } else {
        animation.play();
        toggleBtn.textContent = "⏸";
      }
      isPlaying = !isPlaying;
    });

    // Handle animation completion
    animation.addEventListener("complete", () => {
      // This will only trigger if loop is false
      toggleBtn.textContent = "▶";
      isPlaying = false;
    });

    // Progress bar click handler
    progressContainer.addEventListener("click", (e) => {
      if (isDragging) return;

      const rect = progressContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const frame = (percentage / 100) * animation.totalFrames;

      animation.goToAndStop(frame, true);
      progressBar.style.width = `${percentage}%`;
      scrubber.style.left = `${percentage}%`;

      const currentTime = frame / animation.frameRate;
      const totalTime = animation.totalFrames / animation.frameRate;
      timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(
        totalTime
      )}`;
    });

    // Scrubber drag functionality
    scrubber.addEventListener("mousedown", (e) => {
      isDragging = true;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      e.preventDefault(); // Prevent text selection during drag
    });

    // Touch support for mobile
    scrubber.addEventListener("touchstart", (e) => {
      isDragging = true;
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
      e.preventDefault();
    });

    function handleMouseMove(e) {
      if (!isDragging) return;

      const rect = progressContainer.getBoundingClientRect();
      let x = e.clientX - rect.left;

      // Constrain x to the bounds of the progress bar
      x = Math.max(0, Math.min(x, rect.width));

      const percentage = (x / rect.width) * 100;
      const frame = (percentage / 100) * animation.totalFrames;

      animation.goToAndStop(frame, true);
      progressBar.style.width = `${percentage}%`;
      scrubber.style.left = `${percentage}%`;

      const currentTime = frame / animation.frameRate;
      const totalTime = animation.totalFrames / animation.frameRate;
      timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(
        totalTime
      )}`;
    }

    function handleTouchMove(e) {
      if (!isDragging || !e.touches[0]) return;

      const rect = progressContainer.getBoundingClientRect();
      let x = e.touches[0].clientX - rect.left;

      // Constrain x to the bounds of the progress bar
      x = Math.max(0, Math.min(x, rect.width));

      const percentage = (x / rect.width) * 100;
      const frame = (percentage / 100) * animation.totalFrames;

      animation.goToAndStop(frame, true);
      progressBar.style.width = `${percentage}%`;
      scrubber.style.left = `${percentage}%`;

      const currentTime = frame / animation.frameRate;
      const totalTime = animation.totalFrames / animation.frameRate;
      timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(
        totalTime
      )}`;
    }

    function handleMouseUp() {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    function handleTouchEnd() {
      isDragging = false;
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    }

    return animation;
  }

  // Set up all 6 animations
  for (let i = 1; i <= 6; i++) {
    setupAnimation(i);
  }
});
