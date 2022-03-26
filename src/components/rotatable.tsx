import { useSpring, animated } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import { useCallback, useRef } from "react"
import useResizeObserver from "use-resize-observer"
import mergeRefs from "react-merge-refs"

type RotatableProps = {
  onRotate?: (angle: number) => void
} & React.HTMLAttributes<HTMLDivElement>
const Rotatable = ({
  children,
  style,
  onRotate,
  ...otherProps
}: RotatableProps) => {
  const center = useRef({ x: 0, y: 0 })

  const { ref, width, height } = useResizeObserver<HTMLDivElement>()

  const measuredRef = useCallback(
    (node) => {
      if (node) {
        // console.log(node.getBoundingClientRect())
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

  const fireEvent = (angle: number, previousAngle: number) => {
    const diff = angle - previousAngle
    const adjustedDiff =
      Math.abs(diff) < 180 ? diff : diff < 0 ? diff + 360 : diff - 360
    // console.log(
    //   `angle: ${angle} previousAngle: ${previousAngle}diff: ${diff} adjustedDiff: ${adjustedDiff}`
    // )
    if (onRotate) {
      onRotate(adjustedDiff)
    }
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

    const previousAngle = memo ? memo.previousAngle : angle

    fireEvent(angle, previousAngle)

    // console.log(
    //   `initialRotation: ${initialRotation}, angle: ${angle}, angleOffset: ${angleOffset}, newRotation: ${newRotation}, diff: ${diff}, from: ${from?.rotate}`
    // )
    return {
      initialRotation,
      angleOffset,
      previousRotation: newRotation,
      previousAngle: angle,
    }
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
