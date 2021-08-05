import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgComponent (props) {
  return (
    <Svg width={9} height={16} viewBox='0 0 9 16' fill='none' {...props}>
      <Path
        d='M8.53 8.498l-6.903 6.797a.704.704 0 01-.996 0l-.416-.416a.704.704 0 010-.996L6.209 8 .22 2.117a.704.704 0 010-.996L.636.705a.704.704 0 01.997 0l6.902 6.797a.71.71 0 01-.006.996z'
        fill='#444'
      />
    </Svg>
  )
}

export default SvgComponent
