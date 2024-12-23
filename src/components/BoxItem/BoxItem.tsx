import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Popover from '../Popover'
import { useContext, useEffect, useMemo, useState } from 'react'
import Tooltip from '../Tooltip'
import PATH from '~/constants/path'
import useGenerateLink from '~/hooks/useGenerateLink'
import { AppContext } from '~/contexts/app.context'
import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
import { getIdPlaylistFromLS, getSongFromLS, setIdPlaylistToLS, setPlaylistToLS, setSongToLS } from '~/utils/song'
import toast from 'react-hot-toast'
import useCopyLink from '~/hooks/useCopyLink'

interface Props {
  id: string
  srcImg?: string
  altImg?: string
  description?: string
  link?: string
  hideLike?: boolean
  hideOption?: boolean
  hideDesc?: boolean
  buttonSizeSmall?: boolean
  isLink?: boolean
  isLinkDesc?: boolean
  className?: string
  classNameDesc?: string
  classNameArtist?: string
  classNameImg?: string
  classNameFigure?: string
  effectActive?: boolean
  isAlbum?: boolean
  isClickAble?: boolean
}

export default function BoxItem({
  id,
  srcImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png',
  altImg = '',
  description = '',
  link = '',
  effectActive = false,
  hideLike = false,
  hideOption = false,
  buttonSizeSmall = false,
  hideDesc = false,
  isLink = true,
  isLinkDesc = false,
  isAlbum = false,
  className = 'flex-shrink-0 flex-1',
  classNameDesc = 'line-clamp-2 mt-3 text-[#ffffff80] text-[14px] font-normal whitespace-normal',
  classNameImg = 'absolute inset-0 object-contain rounded-[4px] w-full h-full group-hover:scale-110 duration-700 transition ease-in-out',
  classNameFigure = 'flex-shrink-0 flex-1 relative pt-[100%] rounded-[4px] group w-full overflow-hidden cursor-pointer',
  isClickAble = true
}: Props) {
  const classNameDescription = useMemo(
    () => (description === '' ? 'hidden' : classNameDesc),
    [classNameDesc, description]
  )
  const [active, setActive] = useState(false)
  const [idPlayPlaylist, setIdPlaylist] = useState('')
  const { idPlaylist, namePlaylist } = useGenerateLink(link)
  const { statePlaySong, stateIdSong, setStatePlaylist, setStateIdSong, setStatePlaySong, setStateIdPlaylist } =
    useContext(AppContext)
  const notify = () => toast('Chức năng đang phát triển.')
  const { copyToClipboard } = useCopyLink()

  const { data } = useQuery({
    queryKey: ['playlist', { id: idPlayPlaylist as string }],
    queryFn: () => zingmp3Api.getDetailPlaylist({ id: idPlayPlaylist as string }),
    keepPreviousData: false,
    staleTime: 3 * 60 * 1000,
    enabled: idPlayPlaylist !== ''
  })
  const dataAlbum = useMemo(() => data?.data.data, [data])

  useEffect(() => {
    if (dataAlbum) {
      const data = dataAlbum.song.items.filter((item) => item.streamingStatus !== 2)
      setSongToLS(data[0].encodeId)
      setStateIdSong(data[0].encodeId)
      setStatePlaylist(data)
      setPlaylistToLS(data)
    }
  }, [dataAlbum, setStateIdSong, setStatePlaylist])

  const handlePlayPlaylist = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('click box item')

    if (id === getIdPlaylistFromLS()) {
      setStatePlaySong((prev) => !prev)
    } else {
      setStateIdPlaylist(id)
      setIdPlaylistToLS(id)
      setIdPlaylist(id)
      statePlaySong &&
      dataAlbum &&
      dataAlbum.song.items.filter((item) => item.streamingStatus !== 2)[0].encodeId === getSongFromLS()
        ? setStatePlaySong(false)
        : setStatePlaySong(true)
      if (dataAlbum) {
        const data = dataAlbum.song.items.filter((item) => item.streamingStatus !== 2)
        setSongToLS(data[0].encodeId)
        setStateIdSong(data[0].encodeId)
        setStatePlaylist(data)
        setPlaylistToLS(data)
      }
    }
  }

  const handleReplacePlaylist = () => {
    if (id === getIdPlaylistFromLS()) {
      toast('Đã là danh sách phát.')
    } else {
      setStateIdPlaylist(id)
      setIdPlaylistToLS(id)
      setIdPlaylist(id)
      if (dataAlbum) {
        const data = dataAlbum.song.items.filter((item) => item.streamingStatus !== 2)
        setSongToLS(data[0].encodeId)
        setStateIdSong(data[0].encodeId)
        setStatePlaylist(data)
        setPlaylistToLS(data)
      }
      toast('Đã thay thế danh sách.', {
        style: {
          borderBottom: '4px solid #41f315de'
        }
      })
    }
  }

  const renderLinkElement = () => (
    <>
      <img className={classNameImg} src={srcImg} alt={altImg} />
      {active ? null : (
        <div
          className={classNames('absolute inset-0 h-full w-full bg-[#00000070]', {
            visible: effectActive,
            'invisible group-hover:visible': !effectActive
          })}
        />
      )}
      {active && <div className='absolute inset-0 h-full w-full bg-[#00000070]' />}
      {id === getIdPlaylistFromLS() && <div className='absolute inset-0 h-full w-full bg-[#00000070]' />}
      {stateIdSong === id && <div className='absolute inset-0 h-full w-full bg-[#00000070]' />}
      <div className='absolute inset-0'>
        <div
          aria-hidden
          className={classNames(
            'absolute bottom-auto left-[50%] right-auto top-[50%] z-[90] flex h-[50px] w-full -translate-x-1/2 -translate-y-1/2 items-center justify-evenly',
            {
              visible: active,
              'invisible group-hover:visible': !active && id !== getIdPlaylistFromLS()
            }
          )}
        >
          {!hideLike && (
            <Tooltip text='Thêm vào thư viện'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  notify()
                }}
                className='z-10 flex items-center justify-center rounded-full p-[6px] hover:bg-[#ffffff4d]'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='white'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                  />
                </svg>
              </button>
            </Tooltip>
          )}
          {buttonSizeSmall ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                if (isClickAble) {
                  handlePlayPlaylist(e)
                } else {
                  return
                }
              }}
              className='absolute inset-0 flex items-center justify-center'
            >
              {isAlbum ? (
                <>
                  {statePlaySong && getIdPlaylistFromLS() === id ? (
                    <img className='h-[16px] w-[16px]' src={'/icon-playing.gif'} alt='icon playing' />
                  ) : (
                    <svg
                      fill={'white'}
                      viewBox='0 0 24 24'
                      strokeWidth={1}
                      stroke={'white'}
                      className={classNames('h-6 w-6 hover:opacity-90', {
                        visible: effectActive,
                        'invisible group-hover:visible': !effectActive
                      })}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                      />
                    </svg>
                  )}
                </>
              ) : (
                <>
                  {stateIdSong === id && statePlaySong ? (
                    <img
                      className={classNames('h-[18px] w-[18px]', {
                        visible: effectActive,
                        'invisible group-hover:visible': !effectActive
                      })}
                      src={'/icon-playing.gif'}
                      alt='icon playing'
                    />
                  ) : (
                    <svg
                      fill={'white'}
                      viewBox='0 0 24 24'
                      strokeWidth={1}
                      stroke={'white'}
                      className={classNames('h-6 w-6 hover:opacity-90', {
                        visible: effectActive,
                        'invisible group-hover:visible': !effectActive
                      })}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                      />
                    </svg>
                  )}
                </>
              )}
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handlePlayPlaylist(e)
              }}
              className='flex h-[45px] w-[45px] items-center justify-center rounded-full border border-white hover:opacity-90'
            >
              {statePlaySong && getIdPlaylistFromLS() === id ? (
                <img className='h-[16px] w-[16px]' src={'/icon-playing.gif'} alt='icon playing' />
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='white'
                  viewBox='0 0 24 24'
                  strokeWidth={1}
                  stroke='white'
                  className='h-7 w-7 pb-[1px] pl-[3px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                  />
                </svg>
              )}
            </button>
          )}
          {!hideOption && (
            <Popover
              setActive={setActive}
              isClick={true}
              isHover={false}
              placement='top-start'
              renderPopover={
                <div className='w-[250px] rounded-lg bg-[#34224f] py-[10px] shadow-md'>
                  <ul className='pl-[1px]'>
                    <li>
                      <button
                        onClick={handleReplacePlaylist}
                        className='flex w-full items-center gap-[14px] px-[14px] py-2 text-[14px] text-[#dadada] hover:bg-[#ffffff1a]'
                      >
                        <svg
                          className='h-[18px] w-[18px]'
                          viewBox='0 0 24 24'
                          focusable='false'
                          stroke='currentColor'
                          fill='currentColor'
                          strokeWidth={1}
                        >
                          <path d='M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z' />
                        </svg>
                        <span>Thay thế danh sách phát</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => copyToClipboard(`${PATH.album}/${namePlaylist}/${idPlaylist}`)}
                        className='flex w-full items-center gap-[14px] px-[14px] py-2 text-[14px] text-[#dadada] hover:bg-[#ffffff1a]'
                      >
                        <svg
                          stroke='currentColor'
                          fill='currentColor'
                          strokeWidth={0}
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                          className='h-[18px] w-[18px]'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>Sao chép link</span>
                      </button>
                    </li>
                  </ul>
                </div>
              }
            >
              <Tooltip text='Khác'>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                  className='z-10 flex items-center justify-center rounded-full p-[3px] hover:bg-[#ffffff4d]'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='white'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke={'white'}
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                </button>
              </Tooltip>
            </Popover>
          )}
        </div>
      </div>
    </>
  )

  return (
    <div className={className}>
      <figure className={classNameFigure}>
        {isLink ? (
          <Link to={`${PATH.album}/${namePlaylist}/${idPlaylist}`} title={altImg}>
            {renderLinkElement()}
          </Link>
        ) : (
          <>{renderLinkElement()}</>
        )}
      </figure>
      {!hideDesc && (
        <>
          {isLinkDesc ? (
            <Link to={link.replace('.html', '')} className={classNameDescription + ' hover:text-[#c273ed]'}>
              {description}
            </Link>
          ) : (
            <h3 className={classNameDescription}>{description}</h3>
          )}
        </>
      )}
    </div>
  )
}
