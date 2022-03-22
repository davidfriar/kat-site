import { useSpring, animated } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import { useState, useCallback, useRef } from "react"
import useResizeObserver from "use-resize-observer"
import mergeRefs from "react-merge-refs"

type RotatableProps = {} & React.HTMLAttributes<HTMLDivElement>
const Rotatable = ({ children, style, ...otherProps }: RotatableProps) => {
  const center = useRef({ x: 0, y: 0 })

  const { ref, width, height } = useResizeObserver<HTMLDivElement>()

  const measuredRef = useCallback(
    (node) => {
      if (node) {
        console.log(node.getBoundingClientRect())
        const rect: DOMRect = node.getBoundingClientRect()
        center.current = {
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height / 2,
        }
      }
    },
    [width, height]
  )

  const mergedRef = mergeRefs([ref, measuredRef])

  const [{ rotate }, api] = useSpring(() => ({
    to: { rotate: 0 },
    config: {},
  }))

  const normalise = (angle: number): number => {
    return ((angle % 360) + 360) % 360
  }

  const bind = useDrag(({ xy: [x, y], memo, event }) => {
    event?.preventDefault()

    const origin = center.current
    const local = { x: x - origin.x, y: y - origin.y }

    const angle = normalise(Math.atan2(local.y, local.x) * (180 / Math.PI))
    const initialRotation = memo ? memo.initialRotation : rotate.get()
    const angleOffset = memo ? memo.angleOffset : angle - initialRotation

    const newRotation = normalise(angle - angleOffset)

    const previousRotation = memo ? memo.previousRotation : initialRotation

    const diff = newRotation - previousRotation

    const from =
      Math.abs(diff) < 180
        ? undefined
        : diff > 0
        ? { rotate: rotate.get() + 360 }
        : { rotate: rotate.get() - 360 }

    api.start({
      from: from,
      to: { rotate: newRotation },
    })

    console.log(
      `initialRotation: ${initialRotation}, angle: ${angle}, angleOffset: ${angleOffset}, newRotation: ${newRotation}, diff: ${diff}, from: ${from?.rotate}`
    )
    return { initialRotation, angleOffset, previousRotation: newRotation }
  })

  const theStyle = {
    ...style,
    rotate,
    touchAction: "none",
  }

  return (
    <animated.div {...bind()} style={theStyle} ref={mergedRef} {...otherProps}>
      {children}
    </animated.div>
  )
}

export default Rotatable
