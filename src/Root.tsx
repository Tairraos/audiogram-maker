import { Composition, staticFile } from "remotion";
import { Audiogram } from "./Audiogram/Main";
import { audiogramSchema } from "./Audiogram/schema";
import { getSubtitles } from "./helpers/fetch-captions";
import { FPS } from "./helpers/ms-to-frame";
import { parseMedia } from "@remotion/media-parser";
import {
  COVER_IMAGE_URL,
  TITLE_COLOR,
  TITLE_TEXT,
  AUDIO_FILE_URL,
  CAPTIONS_FILE_NAME,
  CAPTIONS_TEXT_COLOR,
} from "./constants";
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Audiogram"
        component={Audiogram}
        width={1080}
        height={1080}
        schema={audiogramSchema}
        defaultProps={{
          // audio settings
          audioOffsetInSeconds: 0,
          audioFileUrl: staticFile(AUDIO_FILE_URL),
          // podcast data
          coverImageUrl: staticFile(COVER_IMAGE_URL),
          titleText: TITLE_TEXT,
          titleColor: TITLE_COLOR,
          // captions settings
          captions: null,
          captionsFileName: staticFile(CAPTIONS_FILE_NAME),
          onlyDisplayCurrentSentence: true,
          captionsTextColor: CAPTIONS_TEXT_COLOR,
          // visualizer settings
          visualizer: {
            type: "oscilloscope",
            color: "#F4B941",
            numberOfSamples: "64" as const,
            windowInSeconds: 0.1,
            posterization: 3,
            amplitude: 4,
            padding: 100,
          },
        }}
        // Determine the length of the video based on the duration of the audio file
        calculateMetadata={async ({ props }) => {
          const captions = await getSubtitles(props.captionsFileName);
          const { slowDurationInSeconds } = await parseMedia({
            src: props.audioFileUrl,
            acknowledgeRemotionLicense: true,
            fields: {
              slowDurationInSeconds: true,
            },
          });

          return {
            durationInFrames: Math.floor(
              (slowDurationInSeconds - props.audioOffsetInSeconds) * FPS,
            ),
            props: {
              ...props,
              captions,
            },
            fps: FPS,
          };
        }}
      />
    </>
  );
};
