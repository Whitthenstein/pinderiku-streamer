export class SoundPlayer {
  audioElement: HTMLAudioElement;
  urls: string[];
  activeUrl: string | null;

  constructor(audioElement: HTMLAudioElement) {
    this.audioElement = audioElement;
    this.urls = [];
    this.activeUrl = null;

    // TODO check this
    this.audioElement.addEventListener("ended", () => {
      this.pause();
      this.playNext();
    });

    this.audioElement.ontimeupdate = () => {
      console.log("progressing...");
    };
  }

  setSongUrl(newUrl: string) {
    this.audioElement.src = newUrl;
  }

  play(url: string | null = null) {
    if (url) {
      this.setSongUrl(url);
    }
    this.audioElement.play();
  }

  pause() {
    this.audioElement.pause();
  }

  setUrls(urls: string[]) {
    this.urls = urls;
  }

  setUrl(url: string | null) {
    if (!url) {
      return;
    }
    this.activeUrl = url;
    this.setSongUrl(url);
  }

  reset() {
    this.setUrls([]);
    this.setUrl(null);
  }

  // TODO not working
  playNext() {
    if (this.urls.length === 0) {
      return;
    }

    const currentIndex = this.urls.findIndex((url) => url === this.activeUrl);
    const nextSong = this.urls[currentIndex ? currentIndex : 0 + 1];

    if (!nextSong) {
      return this.setUrl(this.urls[0]);
    }

    this.setUrl(nextSong);
  }

  // TODO not working
  playPrevious() {
    if (this.urls.length === 0) {
      return;
    }

    const currentIndex = this.urls.findIndex((url) => url === this.activeUrl);
    const previousSong = this.urls[currentIndex - 1];

    if (!previousSong) {
      return this.setUrl(this.urls[this.urls.length - 1]);
    }

    this.setUrl(previousSong);
  }
}
