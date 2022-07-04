import Spotify from "react-spotify-embed"
import "./playlist.css"

type PlaylistProps = {
  value: {
    url?: string
  }
}
export const Playlist = ({ value }: PlaylistProps) => {
  return (
    <div className="spotify-playlist">
      {value.url && <Spotify link={value.url} />}
    </div>
  )
}
