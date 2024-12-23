import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { NavLink, useParams } from 'react-router-dom'
import zingmp3Api from '~/apis/zingmp3Api'
import CardItem from '~/components/CardItem'
import PATH from '~/constants/path'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import usePlayMusic from '~/hooks/usePlayMusic'
import { ItemSections } from '~/types/home'
import { Helmet } from 'react-helmet-async'

const ZingWeek = () => {
  const { type } = useParams()
  const [id, setId] = useState<string>('IWZ9Z08I')
  useEffect(() => {
    if (type === 'vn') {
      setId('IWZ9Z08I')
    } else if (type === 'us') {
      setId('IWZ9Z0BW')
    } else if (type === 'kr') {
      setId('IWZ9Z0BO')
    }
  }, [type])

  const { handleHookPlayMusic } = usePlayMusic()
  const { data: dataWeek } = useQuery({
    queryKey: ['zingWeek', id],
    queryFn: () =>
      zingmp3Api.getWeekChart({
        id: id || 'IWZ9Z08I'
      }),
    staleTime: 3 * 60 * 1000
  })
  const [currentWeek, setCurrentWeek] = useState<number>(1)
  const [currentYear, setCurrentYear] = useState<number>(1)

  useEffect(() => {
    if (dataWeek) {
      setCurrentWeek(dataWeek.data.data.week)
      setCurrentYear(dataWeek.data.data.year)
    }
  }, [dataWeek])

  const { data } = useQuery({
    queryKey: ['zingWeek', id, currentWeek],
    queryFn: () =>
      zingmp3Api.getWeekChart({
        id: id || 'IWZ9Z08I',
        week: currentWeek,
        year: currentYear
      }),
    staleTime: 3 * 60 * 1000,
    enabled: dataWeek !== undefined
  })
  const dataWeekChart = data?.data.data
  const handlePrevWeek = () => {
    currentWeek !== 1 && setCurrentWeek((prev) => prev - 1)
  }

  const handleNextWeek = () => {
    dataWeek && currentWeek < dataWeek.data.data.week && setCurrentWeek((prev) => prev + 1)
  }

  return (
    <>
      <Helmet>
        <title>#zingchart tuần, #zingchart Zing - Bài hát</title>
      </Helmet>
      <main className='mx-[-2px] py-10'>
        <div className='mb-[30px] flex items-center gap-1'>
          <h2 className='w-fit text-[40px] font-extrabold capitalize text-white'>Bảng Xếp Hạng Tuần</h2>
          <button
            onClick={() =>
              handleHookPlayMusic({
                songId: (dataWeekChart &&
                  dataWeekChart.items.filter((item) => item.streamingStatus !== 2)[0].encodeId) as string,
                data: (dataWeekChart && dataWeekChart.items) as ItemSections[],
                dataItem: (dataWeekChart &&
                  dataWeekChart.items.filter((item) => item.streamingStatus !== 2)[0]) as ItemSections,
                playlistId: (dataWeekChart &&
                  dataWeekChart.items.filter((item) => item.streamingStatus !== 2)[0].encodeId) as string
              })
            }
            className='flex items-center justify-center hover:opacity-90'
          >
            <svg width={56} height={56} viewBox='0 0 44 44' fill='none'>
              <g filter='url(#filter0_d_3141_46346)'>
                <circle cx={22} cy={21} r={18} fill='#9b4de0' />
              </g>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18.8449 13.5557C18.1011 13.14 17.7292 12.9322 17.4248 12.9672C17.1591 12.9977 16.9187 13.1388 16.7624 13.3558C16.5833 13.6045 16.5833 14.0305 16.5833 14.8825V27.1179C16.5833 27.9698 16.5833 28.3958 16.7624 28.6445C16.9186 28.8615 17.1591 29.0026 17.4247 29.0331C17.7292 29.0681 18.101 28.8604 18.8447 28.4448L29.7922 22.3277C30.568 21.8942 30.9559 21.6775 31.0849 21.3922C31.1973 21.1434 31.1973 20.8584 31.0849 20.6096C30.956 20.3243 30.5681 20.1076 29.7923 19.674L18.8449 13.5557Z'
                fill='white'
              />
            </svg>
          </button>
        </div>
        <nav className='mb-7'>
          <ul className='flex items-center gap-10 text-[24px] font-bold uppercase'>
            <li>
              <NavLink
                to={`${PATH.zingWeek}/vn`}
                className={({ isActive }) =>
                  `border-b-[3px] ${
                    isActive ? 'border-[#9b4de0] text-white' : 'border-transparent text-white/60'
                  } inline-block py-[15px]`
                }
              >
                VIỆT NAM
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${PATH.zingWeek}/us`}
                className={({ isActive }) =>
                  `border-b-[3px] ${
                    isActive ? 'border-[#9b4de0] text-white' : 'border-transparent text-white/60'
                  } inline-block py-[15px]`
                }
              >
                US-UK
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${PATH.zingWeek}/kr`}
                className={({ isActive }) =>
                  `border-b-[3px] ${
                    isActive ? 'border-[#9b4de0] text-white' : 'border-transparent text-white/60'
                  } inline-block py-[15px]`
                }
              >
                K-POP
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className='flex w-fit items-center rounded-full bg-[#ffffff1a] p-2 text-[14px] text-white'>
          <button onClick={handlePrevWeek} className='px-2 hover:text-white/80'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </button>
          <p className=''>{`Tuần ${currentWeek.toString().padStart(2, '0')} (${dataWeekChart?.startDate || '00/00'} - ${
            dataWeekChart?.endDate || '00/00'
          })`}</p>
          <button onClick={handleNextWeek} className='px-2 hover:text-white/80'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </button>
        </div>
        <div className='mt-[15px] h-[670px] overflow-auto '>
          {dataWeekChart ? (
            dataWeekChart.items &&
            dataWeekChart.items.map((item, index) => (
              <CardItem
                key={item.encodeId}
                dataItem={item}
                classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                className='group relative flex items-center gap-x-[10px] overflow-hidden rounded border-b border-[#ffffff0d] p-[10px] hover:bg-[#ffffff1a]'
                isDate={false}
                number={index + 1}
                hideLike={false}
                hideAlbum={false}
                dataPlaylist={dataWeekChart.items}
              />
            ))
          ) : (
            <div className='ml-10 grid w-full grid-cols-1 gap-3'>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className='flex w-full gap-2'>
                    <Skeleton width={40} height={40} />
                    <div className='w-[40%]'>
                      <Skeleton width={'80%'} height={10} />
                      <Skeleton width={'60%'} height={10} />
                    </div>
                    <div className='w-[40%]'>
                      <Skeleton width={'60%'} height={10} />
                    </div>
                    <Skeleton width={'40px'} height={10} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default ZingWeek
