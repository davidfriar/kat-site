import { TikTok as T } from "react-tiktok"
import "./tiktok.css"

type TiktokProps = {
  value: {
    url?: string
  }
}
export const Tiktok = ({ value }: TiktokProps) => {
  if (typeof window !== "undefined") {
    return <div className="tiktok">{value.url && <T url={value.url} />}</div>
  } else {
    return null
  }
}
