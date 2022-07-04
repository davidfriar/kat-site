import { TikTok as T } from "react-tiktok"
import './tiktok.css'

type TiktokProps = {
  value: {
    url?: string
  }
}
export const Tiktok = ({ value }: TiktokProps) => {
  return <div className="tiktok">{value.url && <T url={value.url} />}</div>
}
