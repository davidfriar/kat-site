import Path from "react-svg-path"
import { useUniqueId } from "@byteclaw/use-unique-id"

const DEFAULT_ANGLE = 60

type SVGCardProps = {
  title: string
  subtitle: string
  summary?: string
  width: number
  height: number
  className?: string
  radius?: number
  angle?: number
}
const SVGCard = ({
  title,
  subtitle,
  summary,
  height,
  width,
  className,
  radius,
  angle = DEFAULT_ANGLE,
}: SVGCardProps) => {
  const baseRadius = radius ? radius : width / 2
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="<http://www.w3.org/2000/svg>"
      className={className}
    >
      <ArcCard
        outerRadius={baseRadius}
        innerRadius={baseRadius * 0.4}
        angle={angle}
      />
      <ArcText
        cx={baseRadius}
        cy={baseRadius}
        radius={baseRadius * 0.8}
        className={`${className}-title`}
        angle={angle}
      >
        {title}
      </ArcText>
      <ArcText
        cx={baseRadius}
        cy={baseRadius}
        radius={baseRadius * 0.7}
        className={`${className}-subtitle`}
        angle={angle}
      >
        {subtitle}
      </ArcText>
      <ArcText
        cx={baseRadius}
        cy={baseRadius}
        radius={baseRadius * 0.6}
        className={`${className}-summary`}
        angle={angle}
      >
        {summary}
      </ArcText>
    </svg>
  )
}

type ArcCardProps = {
  outerRadius: number
  innerRadius: number
  angle?: number
}

const ArcCard = ({
  outerRadius,
  innerRadius,
  angle = DEFAULT_ANGLE,
}: ArcCardProps) => {
  const radians = Path.angleInRadians(angle)
  const end = {
    x: Math.cos(radians),
    y: Math.sin(radians),
  }
  const outerEnd = {
    x: outerRadius - end.x * outerRadius,
    y: outerRadius - end.y * outerRadius,
  }
  const innerStart = {
    x: outerRadius - end.x * innerRadius,
    y: outerRadius - end.y * innerRadius,
  }

  const innerEnd = {
    x: outerRadius - innerRadius,
    y: outerRadius,
  }

  const path = new Path()
  path
    .moveTo(0, outerRadius)
    .arc(outerRadius, outerRadius, 0, 0, 1, outerEnd.x, outerEnd.y)
    .lineTo(innerStart.x, innerStart.y)
    .arc(innerRadius, innerRadius, 0, 0, 0, innerEnd.x, innerEnd.y)
    .close()

  return path.toComponent({
    // fill: "none",
    // stroke: "black",
    transform: `rotate(${90 - angle / 2}, ${outerRadius}, ${outerRadius})`,
  })
}

type ArcTextProps = {
  cx: number
  cy: number
  radius: number
  angle?: number
  children: string
  className?: string
} & JSX.IntrinsicAttributes
const ArcText = ({
  cx,
  cy,
  radius,
  angle = DEFAULT_ANGLE,
  className,
  children,
}: ArcTextProps) => {
  const radians = Path.angleInRadians(angle)
  const start = {
    x: cx - radius,
    y: cy,
  }
  const end = {
    x: cx - Math.cos(radians) * radius,
    y: cy - Math.sin(radians) * radius,
  }

  const path: Path = new Path()
  path.moveTo(start.x, start.y)
  path.arc(radius, radius, 0, 0, 1, end.x, end.y)
  const id = useUniqueId()
  return (
    <g>
      {path.toComponent({
        fill: "none",
        stroke: "none",
        id: id,
        transform: `rotate(${90 - angle / 2}, ${cx}, ${cy})`,
      })}
      <text text-anchor="middle" className={className}>
        <textPath startOffset="50%" href={`#${id}`}>
          {children}
        </textPath>
      </text>
    </g>
  )
}

export default SVGCard
