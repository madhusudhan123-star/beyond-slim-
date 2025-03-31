class VideoManager {
    constructor() {
        this.videos = new Map();
        this.youtubePlayer = null;
    }

    registerYoutube(player) {
        this.youtubePlayer = player;
    }

    register(video) {
        this.videos.set(video, { muted: true });
    }

    unregister(video) {
        this.videos.delete(video);
    }

    handleVideoUnmute(activeVideo, setMutedState) {
        // Stop YouTube if playing
        if (this.youtubePlayer) {
            this.youtubePlayer.pauseVideo();
            this.youtubePlayer.mute();
        }

        // Mute all other HTML5 videos
        this.videos.forEach((state, video) => {
            if (video !== activeVideo) {
                video.muted = true;
                video.pause();
                const videoStateUpdater = this.videos.get(video).setMutedState;
                if (videoStateUpdater) {
                    videoStateUpdater(true);
                }
            }
        });

        this.videos.set(activeVideo, { muted: false, setMutedState });
    }

    handleYoutubeUnmute() {
        // Stop all HTML5 videos
        this.videos.forEach((state, video) => {
            video.muted = true;
            video.pause();
            if (state.setMutedState) {
                state.setMutedState(true);
            }
        });
    }
}

export default new VideoManager();
