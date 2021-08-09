import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgComponent (props) {
  return (
    <Svg
      width={8}
      height={14}
      viewBox='0 0 8 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Path
        d='M.19 6.42L6.516.19a.645.645 0 01.913 0l.382.38a.645.645 0 010 .914L2.317 6.876l5.488 5.391a.645.645 0 010 .914l-.381.38a.645.645 0 01-.913 0L.185 7.333a.65.65 0 01.005-.913z'
        fill='#555'
      />
    </Svg>
  )
}

export default SvgComponent
