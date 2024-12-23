import toast from 'react-hot-toast'
import Search from '../Search'
import Tooltip from '../Tooltip'

export default function Header() {
  const notify = () => toast('Chức năng đang phát triển.')

  return (
    <div className='relative flex h-[70px] items-center justify-between'>
      <div className='flex items-center'>
        <button className='flex h-[24px] w-[44px] items-center justify-start'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke={'#595361'}
            className='h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
          </svg>
        </button>
        <button className='flex h-[24px] w-[44px] items-center justify-start'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke={'#595361'}
            className='h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
          </svg>
        </button>
        <Search />
      </div>
      <div className='flex items-center gap-[10px]'>
        <Tooltip text='Cài đặt'>
          <button
            onClick={notify}
            className='flex items-center justify-center rounded-full bg-[#2f2739] p-2 hover:opacity-90'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke={'#d8d8d8'}
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z'
              />
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
          </button>
        </Tooltip>
        <button onClick={notify} className='overflow-hidden rounded-full hover:opacity-90'>
          <img
            className='h-[38px] w-[38px] object-cover'
            src='https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.35/static/media/user-default.3ff115bb.png'
            alt='avatar'
          />
        </button>
      </div>
    </div>
  )
}
