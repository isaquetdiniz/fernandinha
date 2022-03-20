import player from "play-sound";
import path from "path";

import { ISpeaker } from "../interfaces/speaker";

export class PlaySoundSpeaker implements ISpeaker {
  play(): void {
    const soundPlayer = player({});

    const soundPath = path.join(
      __dirname,
      "../../",
      "./static/notification.mp3"
    );

    soundPlayer.play(soundPath, function (err) {
      if (err) throw err;
    });
  }
}
