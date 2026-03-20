import React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

type SignalLogoProps = {
  size?: number;
};

export default function SignalLogo({ size = 22 }: SignalLogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <Defs>
        <LinearGradient id="sg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#E8E8E8" />
          <Stop offset="45%" stopColor="#DDDDD0" />
          <Stop offset="100%" stopColor="#888888" />
        </LinearGradient>
      </Defs>
      <Path
        d="M 100,18 H 20 V 60 H 100 V 102 H 20"
        stroke="url(#sg_grad)"
        strokeWidth="18"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </Svg>
  );
}
