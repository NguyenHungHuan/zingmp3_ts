import { artist, TopAlbum } from './artist'

export type InfoSong = {
  encodeId: string
  title: string
  alias: string
  isOffical: boolean
  artistsNames: string
  artists: Array<
    Pick<artist, 'id' | 'name' | 'alias' | 'spotlight' | 'thumbnail' | 'thumbnailM' | 'playlistId' | 'totalFollow'>
  >
  isWorldWide: true
  thumbnailM: string
  thumbnail: string
  duration: number
  zingChoice: boolean
  isPrivate: boolean
  preRelease: boolean
  releaseDate: number
  genreIds: Array<string>
  distributor: string
  radioId: number
  isIndie: boolean
  allowAudioAds: boolean
  hasLyric: boolean
  userid: number
  genres: [
    {
      id: string
      name: string
      title: string
      alias: string
    }
  ]
  composers: [
    {
      id: string
      name: string
      spotlight: boolean
      alias: string
      cover: string
      thumbnail: string
      totalFollow: number
    }
  ]
  album: Pick<
    TopAlbum,
    | 'encodeId'
    | 'title'
    | 'thumbnail'
    | 'isoffical'
    | 'isIndie'
    | 'releaseDate'
    | 'releasedAt'
    | 'artistsNames'
    | 'genreIds'
    | 'link'
  > & {
    sortDescription: string
    artists: Array<
      Pick<artist, 'id' | 'name' | 'alias' | 'spotlight' | 'thumbnail' | 'thumbnailM' | 'playlistId' | 'totalFollow'>
    >
  }
  isRBT: boolean
  like: number
  listen: number
  liked: boolean
  comment: number
  streamingStatus: number
}

export type lyric = {
  BGMode: number
  defaultIBGUrls: [string]
  enabledVideoBG: boolean
  file: string
  sentences: [
    {
      words: [
        {
          data: string
          endTime: number
          startTime: number
        }
      ]
    }
  ]
  streamingUrl: string
}

export type audioSong = {
  128: string
  320: string
}
