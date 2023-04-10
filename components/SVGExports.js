import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const UpsideDown = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" {...props}>
    <Path
      d="M0 .37h296v361.84L0 .37Z"
      style={{
        fill: "#e0925c",
      }}
    />
    <Path
      d="M289.03 337.57 111.52 0 0 .37l296 361.84-6.97-24.64Z"
      style={{
        fill: "#c18053",
      }}
    />
  </Svg>
)

