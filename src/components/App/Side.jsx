import { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'

import Spotlight from '../Module/Spotlight'
import data from '../../../package.json'
import UserModule from '../Module/UserModule'
import { UserAuth } from '../../context/AuthContext'

import '../../styles/app.scss'

export default function Side({ handleSide }) {
  const [ userModule, setUserModule ] = useState(false)
  const [ filter, setFilter ] = useState(0)
  const [ sort, setSort ] = useState(true)
  const [ spot, isSpot ] = useState(false)
  const { user, notes, onAdd, active, setActive } = UserAuth()
  
  let sorted
  let sortedActive = notes.filter((note) => note.stats.includes('#E8E7E3'))
  let sortedDelayed = notes.filter((note) => note.stats.includes('#FFBD44'))
  let sortedCompleted = notes.filter((note) => note.stats.includes('#89CA00'))
  let sortedDropped = notes.filter((note) => note.stats.includes('#FF605C'))
  
  function sortedNotes() {
    if (filter == 1) {return sortedActive}
    if (filter == 2) {return sortedDelayed}
    if (filter == 3) {return sortedCompleted}
    if (filter == 4) {return sortedDropped}

    return sorted
  }

  useEffect(() => {
    document.addEventListener('keyup', handleShortcut)
    
    return () => {
      document.removeEventListener('keyup', handleShortcut)
    }
  }, [handleShortcut])

  sort ? 
  sorted = notes.sort((a, b) => b.lastModified - a.lastModified) :
  sorted = notes.sort((a, b) => {
    if(a.title.toLowerCase() < b.title.toLowerCase()) return -1
    if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
    return 0
  }) 

  function handleTitle(e) {
    if (e.length > 22) {
      return e.slice(0, 22) + '...'
    } 

    return e
  }

  function handleShortcut(e) {
    if (e.ctrlKey === true && e.altKey === true && e.keyCode === 70) { 
      isSpot(!spot) 
    }
  }

  return (
    <>
      {spot && <Spotlight isSpot={isSpot} />}
      <section className='side'>
        <div className='side__header'>
          <div className='side__header-logo'>
            <svg width='18' height='18' viewBox='0 0 152 152' fill='none' xmlns='https://www.w3.org/2000/svg'>
              <rect x='1' y='1' width='150' height='150' rx='20' fill='black'/>
              <path d='M131.655 55.4545L118.615 134H104.271L78.3835 84.5639H77.7699L69.5241 134H52.9176L65.9574 55.4545H80.5312L106.304 104.852H106.956L115.125 55.4545H131.655Z' fill='#BDBDBD'/>
              <path d='M114.655 32.4545L101.615 111H87.2713L61.3835 61.5639H60.7699L52.5241 111H35.9176L48.9574 32.4545H63.5312L89.304 81.8523H89.956L98.125 32.4545H114.655Z' fill='#E1DFE1'/>
              <path d='M96.6548 18.4545L83.6151 97H69.2713L43.3835 47.5639H42.7699L34.5241 97H17.9176L30.9574 18.4545H45.5312L71.304 67.8523H71.956L80.125 18.4545H96.6548Z' fill='#F5F5F5'/>
              <rect x='1' y='1' width='150' height='150' rx='20' stroke='#B1B1B1'/>
            </svg>
            <p>Notebucket <span>{data.version}</span></p>
          </div>
          <button type='button' aria-label='Toggle sidebar' onClick={handleSide} data-tip data-for='sideTip'>
            <svg width='22' height='22' viewBox='0 0 28 28' fill='none' xmlns='https://www.w3.org/2000/svg'>
              <path d='M14 6.85156C13.2266 5.9375 11.5039 5.12012 9.48242 5.12012C6.78418 5.12012 4.60449 6.51758 4.02441 7.84473V21.0371C4.02441 21.8984 4.58691 22.2324 5.21094 22.2324C5.67676 22.2324 5.94043 22.0918 6.23926 21.8721C6.83691 21.3887 7.8125 20.8262 9.48242 20.8262C11.1611 20.8262 12.3037 21.3887 12.8135 21.8193C13.0947 22.0303 13.4199 22.2324 14 22.2324C14.5801 22.2324 14.8965 22.0127 15.1865 21.8193C15.7314 21.415 16.8389 20.8262 18.5176 20.8262C20.1875 20.8262 21.1807 21.3975 21.7607 21.8721C22.0596 22.0918 22.3232 22.2324 22.7891 22.2324C23.4131 22.2324 23.9756 21.8984 23.9756 21.0371V7.84473C23.3955 6.51758 21.2246 5.12012 18.5176 5.12012C16.4961 5.12012 14.7822 5.9375 14 6.85156ZM5.93164 8.45117C6.16895 7.87109 7.46973 6.88672 9.48242 6.88672C11.4951 6.88672 12.8398 7.87988 13.0508 8.45117V20.0439C12.1455 19.3936 10.8535 19.042 9.48242 19.042C8.10254 19.042 6.81934 19.3936 5.93164 20.0703V8.45117ZM22.0684 8.45117V20.0703C21.1807 19.3936 19.8975 19.042 18.5176 19.042C17.1465 19.042 15.8545 19.3936 14.9492 20.0439V8.45117C15.1602 7.87988 16.5049 6.88672 18.5176 6.88672C20.5303 6.88672 21.8311 7.87109 22.0684 8.45117Z' fill='currentColor'/>
            </svg>
          </button>
          <ReactTooltip id='sideTip' effect='solid' type='dark' place='bottom' className='tooltip' backgroundColor='#000' arrowColor='transparent'>
            <span>Toggle Sidebar</span>
          </ReactTooltip>   
        </div>
        <div className='side__actions'>
          <div className='side__actions-user'>
            <svg width="14" height="15" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.00879 8.5752C9.9248 8.5752 11.5508 6.87012 11.5508 4.66406C11.5508 2.51074 9.91602 0.858398 8.00879 0.858398C6.09277 0.858398 4.44922 2.53711 4.45801 4.68164C4.45801 6.87012 6.08398 8.5752 8.00879 8.5752ZM2.52441 16.749H13.4756C14.9258 16.749 15.4268 16.3096 15.4268 15.501C15.4268 13.2422 12.5615 10.1309 8 10.1309C3.44727 10.1309 0.573242 13.2422 0.573242 15.501C0.573242 16.3096 1.07422 16.749 2.52441 16.749Z" fill="currentColor"/>
            </svg>
            <button className='user__name' onClick={() => setUserModule(!userModule)}>{user.displayName}</button>
            {userModule && <UserModule setUserModule={setUserModule}/>}
          </div>
          <button type='button' onClick={() => isSpot(!spot)} data-tip data-for='findTip'>
            <svg width='14' height='14' viewBox='0 0 18 18' fill='none' xmlns='https://www.w3.org/2000/svg'>
              <path d='M7.53223 14.0332C8.92969 14.0332 10.2393 13.6113 11.3291 12.8906L15.1787 16.749C15.4336 16.9951 15.7588 17.1182 16.1104 17.1182C16.8398 17.1182 17.376 16.5469 17.376 15.8262C17.376 15.4922 17.2617 15.167 17.0156 14.9209L13.1924 11.0801C13.9834 9.95508 14.4492 8.59277 14.4492 7.11621C14.4492 3.31055 11.3379 0.199219 7.53223 0.199219C3.73535 0.199219 0.615234 3.31055 0.615234 7.11621C0.615234 10.9219 3.72656 14.0332 7.53223 14.0332ZM7.53223 12.1875C4.74609 12.1875 2.46094 9.90234 2.46094 7.11621C2.46094 4.33008 4.74609 2.04492 7.53223 2.04492C10.3184 2.04492 12.6035 4.33008 12.6035 7.11621C12.6035 9.90234 10.3184 12.1875 7.53223 12.1875Z' fill='currentColor'/>
            </svg>
            Find note
          </button>
          <ReactTooltip id='findTip' effect='solid' type='dark' place='right' className='tooltip' backgroundColor='#000' arrowColor='transparent'>
            <span>Find note</span>
          </ReactTooltip>
          <button type='button' onClick={() => setSort(!sort)} data-tip data-for='sortTip'>
            <svg width='14' height='13' viewBox='0 0 18 17' fill='none' xmlns='https://www.w3.org/2000/svg'>
              <path d='M9 16.2744C9.46582 16.2744 9.84375 15.9053 9.84375 15.4395V7.73145C10.6787 7.39746 11.2764 6.57129 11.2764 5.62207C11.2764 4.67285 10.6787 3.84668 9.84375 3.5127V1.07812C9.84375 0.638672 9.46582 0.269531 9 0.269531C8.54297 0.269531 8.15625 0.638672 8.15625 1.07812V3.5127C7.32129 3.84668 6.72363 4.66406 6.72363 5.62207C6.72363 6.57129 7.32129 7.39746 8.15625 7.73145V15.4395C8.15625 15.9053 8.53418 16.2744 9 16.2744ZM12.8057 10.8252C12.8057 11.7744 13.3945 12.5918 14.2295 12.9346V15.4658C14.2295 15.9053 14.6074 16.2744 15.0732 16.2744C15.5479 16.2744 15.917 15.9053 15.917 15.4658V12.9346C16.7607 12.6006 17.3496 11.7744 17.3496 10.8252C17.3496 9.86719 16.7607 9.0498 15.917 8.70703V1.10449C15.917 0.638672 15.5391 0.269531 15.0732 0.269531C14.6162 0.269531 14.2295 0.638672 14.2295 1.10449V8.71582C13.3945 9.0498 12.8057 9.86719 12.8057 10.8252ZM2.92676 16.2744C3.39258 16.2744 3.77051 15.9053 3.77051 15.4658V12.9346C4.60547 12.5918 5.19434 11.7744 5.19434 10.8252C5.19434 9.86719 4.60547 9.0498 3.77051 8.71582V1.10449C3.77051 0.638672 3.39258 0.269531 2.92676 0.269531C2.46973 0.269531 2.08301 0.638672 2.08301 1.10449V8.70703C1.24805 9.0498 0.650391 9.86719 0.650391 10.8252C0.650391 11.7744 1.24805 12.6006 2.08301 12.9346V15.4658C2.08301 15.9053 2.46094 16.2744 2.92676 16.2744ZM7.91895 5.62207C7.91895 5.01562 8.39355 4.54102 9 4.54102C9.61523 4.54102 10.0811 5.01562 10.0811 5.62207C10.0811 6.2373 9.61523 6.70312 9 6.70312C8.39355 6.70312 7.91895 6.2373 7.91895 5.62207ZM13.9922 10.8252C13.9922 10.2188 14.4756 9.73535 15.082 9.73535C15.6973 9.73535 16.1631 10.2188 16.1631 10.8252C16.1631 11.4404 15.6973 11.9062 15.082 11.9062C14.4756 11.9062 13.9922 11.4404 13.9922 10.8252ZM1.8457 10.8252C1.8457 10.2188 2.32031 9.73535 2.92676 9.73535C3.54199 9.73535 4.00781 10.2188 4.00781 10.8252C4.00781 11.4404 3.54199 11.9062 2.92676 11.9062C2.32031 11.9062 1.8457 11.4404 1.8457 10.8252Z' fill='currentColor'/>
            </svg>
            Sort note
          </button>
          <ReactTooltip id='sortTip' effect='solid' type='dark' place='right' className='tooltip' backgroundColor='#000' arrowColor='transparent'>
            {sort ? <span>Sort alphabhetically</span> : <span>Sort from latest</span>}
          </ReactTooltip>
        </div>
        <div className='side__status'>
          <div className='side__status-btn'>
            <button type='button'>
              <svg width='12' height='16' viewBox='0 0 16 20' fill='none' xmlns='https://www.w3.org/2000/svg'>
                <path d='M3.31543 19.1816H12.6846C14.5654 19.1816 15.5498 18.1885 15.5498 16.29V3.02734C15.5498 1.12012 14.5742 0.135742 12.6846 0.135742H10.0566C9.73145 0.135742 9.5293 0.337891 9.5293 0.663086C9.5293 1.52441 8.93164 2.18359 8 2.18359C7.07715 2.18359 6.4707 1.52441 6.4707 0.663086C6.4707 0.337891 6.26855 0.135742 5.94336 0.135742H3.31543C1.43457 0.135742 0.450195 1.12012 0.450195 3.02734V16.29C0.450195 18.1885 1.43457 19.1816 3.31543 19.1816ZM3.47363 17.4238C2.62109 17.4238 2.19922 16.9756 2.19922 16.1758V3.1416C2.19922 2.33301 2.62109 1.88477 3.47363 1.88477H5.15234C5.53027 3.09766 6.59375 3.84473 8 3.84473C9.40625 3.84473 10.4697 3.09766 10.8477 1.88477H12.5264C13.3789 1.88477 13.8008 2.33301 13.8008 3.1416V16.1758C13.8008 16.9756 13.3789 17.4238 12.5264 17.4238H3.47363ZM4.80078 6.89453H11.208C11.5244 6.89453 11.7705 6.64844 11.7705 6.32324C11.7705 6.01562 11.5244 5.77832 11.208 5.77832H4.80078C4.4668 5.77832 4.22949 6.01562 4.22949 6.32324C4.22949 6.64844 4.4668 6.89453 4.80078 6.89453ZM4.80078 9.93555H7.90332C8.22852 9.93555 8.46582 9.68945 8.46582 9.38184C8.46582 9.06543 8.22852 8.81934 7.90332 8.81934H4.80078C4.4668 8.81934 4.22949 9.06543 4.22949 9.38184C4.22949 9.68945 4.4668 9.93555 4.80078 9.93555Z' fill='currentColor'/>
              </svg>
              Status
            </button>
          </div>
          <div className='side__status-list'>
            <button type='button' className='list__btn' onClick={() => setFilter(1)}>
              <div className='list__btn-stats active'></div>Active
              <p>{sortedActive.length}</p>
            </button>
          </div>
          <div className='side__status-list'>
            <button type='button' className='list__btn' onClick={() => setFilter(2)}>
              <div className='list__btn-stats delayed'></div>Delayed
              <p>{sortedDelayed.length}</p>
            </button>
          </div>
          <div className='side__status-list'>
            <button type='button' className='list__btn' onClick={() => setFilter(3)}>
              <div className='list__btn-stats completed'></div>Completed
              <p>{sortedCompleted.length}</p>
            </button>
          </div>
          <div className='side__status-list'>
            <button type='button' className='list__btn' onClick={() => setFilter(4)}>
              <div className='list__btn-stats dropped'></div>Dropped
              <p>{sortedDropped.length}</p>
            </button>
          </div>
        </div>
        <div className='side__notes'>
          <div className='side__notes-btn'>
            <div className='filter'>
              <svg width="12" height="18" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4688 19.7334C15.5674 19.1973 15.8574 18.7051 15.8574 17.5537V4.11523C15.8574 2.6123 15.1631 1.90039 13.7217 1.90039H12.8867V1.66309C12.8867 0.731445 12.4121 0.230469 11.5684 0.230469C11.2871 0.230469 10.9531 0.300781 10.5664 0.432617C7.91211 1.28516 5.48633 1.85645 2.39258 1.85645H1.72461C0.713867 1.85645 0.142578 2.43652 0.142578 3.35938V18.4414C0.142578 19.1797 0.318359 19.6279 1.00391 19.9619C2.51562 20.6387 4.76562 21.0693 7.10352 21.0781C9.65234 21.0693 12.4912 20.6826 14.4688 19.7334ZM1.79492 17.6504V3.86914C1.79492 3.63184 1.91797 3.49121 2.14648 3.49121H2.56836C5.53906 3.49121 8.36914 2.87598 10.7861 2.12891C11.0674 2.03223 11.2432 2.11133 11.2432 2.375V15.3125C11.2432 15.7432 11.1816 15.9277 10.7686 16.2002C9.01074 17.4307 5.96973 18.1602 2.10254 17.9668C1.88281 17.958 1.79492 17.8613 1.79492 17.6504ZM12.0342 17.3164C12.7021 16.8066 12.8867 16.4375 12.8867 15.6201V3.55273H13.6777C14.0381 3.55273 14.2051 3.7373 14.2051 4.1416V17.3779C14.2051 17.8965 14.1172 18.1162 13.6162 18.3271C11.9111 19.0742 9.39746 19.5488 7.10352 19.5576C6.24219 19.5576 5.40723 19.5312 4.56348 19.4521C7.6748 19.2852 10.5752 18.415 12.0342 17.3164ZM3.49121 5.75V8.65039C3.49121 8.78223 3.59668 8.85254 3.70215 8.85254C5.73242 8.85254 7.81543 8.49219 9.39746 7.85938C9.47656 7.82422 9.52051 7.74512 9.52051 7.66602V4.66016C9.52051 4.45801 9.33594 4.41406 9.23926 4.44922C7.41992 5.12598 5.65332 5.44238 3.70215 5.52148C3.5791 5.53027 3.49121 5.62695 3.49121 5.75Z" fill="currentColor"/>
              </svg>
              Notes
              <button type='button' data-filter={filter} className='filter__btn' onClick={() => setFilter(0)}>
                {filter == 0 && <p>All</p>}
                {filter == 1 && <p>Active</p>}
                {filter == 2 && <p>Delayed</p>}
                {filter == 3 && <p>Completed</p>}
                {filter == 4 && <p>Dropped</p>}
              </button>
            </div>
            <button type='button' aria-label='Add note' onClick={onAdd} data-tip data-for='addTip'>
              <svg width='10' height='10' viewBox='0 0 16 16' fill='none' xmlns='https://www.w3.org/2000/svg'>
                <path d='M1.63672 8.65625H6.99805V14.0176C6.99805 14.5625 7.44629 15.0195 8 15.0195C8.55371 15.0195 9.00195 14.5625 9.00195 14.0176V8.65625H14.3633C14.9082 8.65625 15.3652 8.20801 15.3652 7.6543C15.3652 7.10059 14.9082 6.65234 14.3633 6.65234H9.00195V1.29102C9.00195 0.746094 8.55371 0.289062 8 0.289062C7.44629 0.289062 6.99805 0.746094 6.99805 1.29102V6.65234H1.63672C1.0918 6.65234 0.634766 7.10059 0.634766 7.6543C0.634766 8.20801 1.0918 8.65625 1.63672 8.65625Z' fill='currentColor'/>
              </svg>
            </button>
            <ReactTooltip id='addTip' effect='solid' type='dark' place='right' className='tooltip' backgroundColor='#000' arrowColor='transparent'>
              <span>Create note</span>
            </ReactTooltip>   
          </div>
          <div className='side__notes-list'>
            {sortedNotes().map(({ id, title }) => {
            return (
              <div className={`note ${id === active && 'active'}`}
                  onClick={() => setActive(id)} 
                  key={id}>
                <svg width='12' height='16' viewBox='0 0 16 20' fill='none' xmlns='https://www.w3.org/2000/svg'>
                  <path d='M3.31543 19.1816H12.6846C14.5742 19.1816 15.5498 18.1885 15.5498 16.29V8.30957C15.5498 7.0791 15.3916 6.5166 14.627 5.73438L10.0303 1.06738C9.2832 0.311523 8.66797 0.135742 7.56055 0.135742H3.31543C1.43457 0.135742 0.450195 1.12891 0.450195 3.03613V16.29C0.450195 18.1885 1.43457 19.1816 3.31543 19.1816ZM3.46484 17.4238C2.62109 17.4238 2.19922 16.9844 2.19922 16.1758V3.1416C2.19922 2.3418 2.62109 1.89355 3.47363 1.89355H7.2002V6.6748C7.2002 7.94922 7.82422 8.56445 9.08984 8.56445H13.8008V16.1758C13.8008 16.9844 13.3789 17.4238 12.5264 17.4238H3.46484ZM9.25684 7.02637C8.8877 7.02637 8.72949 6.86816 8.72949 6.50781V2.12207L13.5635 7.02637H9.25684Z' fill='currentColor'/>
                </svg>
                <p className='note__title'>{handleTitle(title)}</p>
              </div>       
            )})
            }
          </div> 
        </div> 
      </section>  
    </>
  )
}