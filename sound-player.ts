export interface SoundPlayerOptions {
  onEnd?: () => void;
}

export class SoundPlayer {
  audioElement: HTMLAudioElement;

  constructor(audioElement: HTMLAudioElement, options: SoundPlayerOptions) {
    this.audioElement = audioElement;

    // TODO check this
    this.audioElement.addEventListener("ended", () => {
      if (options.onEnd) {
        options.onEnd();
      }
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
}
