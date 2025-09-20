import React from "react";
import { AbsoluteFill, Audio, Sequence, useVideoConfig } from "remotion";

import { PaginatedCaptions } from "./Captions";
import { Spectrum } from "./Spectrum";
import {
  CAPTIONS_FONT_SIZE,
  CAPTIONS_FONT_WEIGHT,
  LINE_HEIGHT,
  LINES_PER_PAGE,
  TITLE_FONT,
  CAPTION_FONT,
} from "../constants";
import { Oscilloscope } from "./Oscilloscope";
import { AudiogramCompositionSchemaType } from "./schema";

export const Audiogram: React.FC<AudiogramCompositionSchemaType> = ({
  visualizer,
  audioFileUrl,
  coverImageUrl,
  titleText,
  titleColor,
  captionsTextColor,
  onlyDisplayCurrentSentence,
  audioOffsetInSeconds,
  captions,
}) => {
  const { durationInFrames, fps, width } = useVideoConfig();

  if (!captions) {
    throw new Error(
      "subtitles should have been provided through calculateMetadata",
    );
  }

  const audioOffsetInFrames = Math.round(audioOffsetInSeconds * fps);
  const baseNumberOfSamples = Number(visualizer.numberOfSamples);

  const textBoxWidth = width - 200;

  return (
    <AbsoluteFill>
      <Sequence from={-audioOffsetInFrames}>
        <Audio pauseWhenBuffering src={audioFileUrl} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            color: "white",
            padding: "96px",
            background: `no-repeat center/100% url(${coverImageUrl})`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 160px",
            }}
          >
            <div
              style={{
                lineHeight: 1.25,
                fontWeight: 800,
                color: titleColor,
                fontSize: "48px",
                height: "140px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                fontFamily: TITLE_FONT,
                textShadow: "3px 3px 5px rgba(0,0,0,0.67)",
              }}
            >
              {titleText}
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: `0 2px`,
            }}
          >
            {visualizer.type === "oscilloscope" ? (
              <Oscilloscope
                waveColor={visualizer.color}
                padding={visualizer.padding}
                audioSrc={audioFileUrl}
                numberOfSamples={baseNumberOfSamples}
                windowInSeconds={visualizer.windowInSeconds}
                posterization={visualizer.posterization}
                amplitude={visualizer.amplitude}
              />
            ) : visualizer.type === "spectrum" ? (
              <Spectrum
                barColor={visualizer.color}
                audioSrc={audioFileUrl}
                mirrorWave={visualizer.mirrorWave}
                numberOfSamples={baseNumberOfSamples * 4} // since fft is used, we need to increase the number of samples to get a better resolution
                freqRangeStartIndex={visualizer.freqRangeStartIndex}
                waveLinesToDisplay={visualizer.linesToDisplay}
              />
            ) : null}
          </div>
          <div
            style={{
              lineHeight: `${LINE_HEIGHT}px`,
              width: textBoxWidth,
              fontWeight: CAPTIONS_FONT_WEIGHT,
              fontSize: CAPTIONS_FONT_SIZE,
              marginTop: 20,
              fontFamily: CAPTION_FONT,
            }}
          >
            <PaginatedCaptions
              captions={captions}
              startFrame={audioOffsetInFrames}
              endFrame={audioOffsetInFrames + durationInFrames}
              linesPerPage={LINES_PER_PAGE}
              subtitlesTextColor={captionsTextColor}
              onlyDisplayCurrentSentence={onlyDisplayCurrentSentence}
              textBoxWidth={textBoxWidth}
            />
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
