import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import "../../../styles/Navigation.css"




const BlocksNav: React.FC = () => {
  const router = useRouter();
  const logout = () => {
    router.push('/api/logout');
  }

  return (
    <div className="container_navigation"> 
    <nav className="blocks">
    <Link href="/home" className="block">
        <div className="block__item">
            <p>Home</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
          <path d="M8 3V3.41667M3.41667 8H3M4.66667 4.66667L4.25 4.25M11.3333 4.66667L11.75 4.25M4.66667 11.3333L4.25 11.75M9.73244 7C9.38663 6.4022 8.74028 6 8 6C6.89543 6 6 6.89543 6 8C6 8.74028 6.4022 9.38663 7 9.73244M6 15L12.4083 9.01893C12.7929 8.65995 12.9852 8.48046 13.2041 8.41266C13.3969 8.35296 13.6031 8.35296 13.7959 8.41266C14.0148 8.48046 14.2071 8.65995 14.5917 9.01893L21 15M8 13.1333V19.4C8 19.9601 8 20.2401 8.10899 20.454C8.20487 20.6422 8.35785 20.7951 8.54601 20.891C8.75992 21 9.03995 21 9.6 21H17.4C17.9601 21 18.2401 21 18.454 20.891C18.6422 20.7951 18.7951 20.6422 18.891 20.454C19 20.2401 19 19.9601 19 19.4V13.1333" stroke="#f8f7f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          </div>
          </Link>
      <Link href="/patients" className="block">
        <div className="block__item">
            <p>Patients</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
          <path d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z" stroke="#f8f7f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          </div>
          </Link>
          <Link href="/providers" className="block">
          <div className="block__item">
            <p>Providers</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
        <path d="M14 8.5V6.2C14 5.0799 14 4.51984 13.782 4.09202C13.5903 3.71569 13.2843 3.40973 12.908 3.21799C12.4802 3 11.9201 3 10.8 3H7.2C6.0799 3 5.51984 3 5.09202 3.21799C4.71569 3.40973 4.40973 3.71569 4.21799 4.09202C4 4.51984 4 5.0799 4 6.2V17.8C4 18.9201 4 19.4802 4.21799 19.908C4.40973 20.2843 4.71569 20.5903 5.09202 20.782C5.51984 21 6.0799 21 7.2 21H9.5M4 13H9M4 17H9M11 8.00001L7 8M9 6V10M18.2 13.5C18.2 14.3284 17.5284 15 16.7 15C15.8716 15 15.2 14.3284 15.2 13.5C15.2 12.6716 15.8716 12 16.7 12C17.5284 12 18.2 12.6716 18.2 13.5ZM20 21V20.5C20 19.1193 18.8807 18 17.5 18H16C14.6193 18 13.5 19.1193 13.5 20.5V21H20Z" stroke="#f8f7f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
        </div>
      </Link>
      <Link href="/sonographers" className="block">
     
        <div className="block__item">
            <p>Sonographers</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
          <path d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M15 18C14.7164 16.8589 13.481 16 12 16C10.519 16 9.28364 16.8589 9 18M12 12H12.01M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" stroke="#f8f7f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          </div>
          </Link>
          <Link href="/study_locations" className="block">
          <div className="block__item">
            <p>Locations</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
          <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#f8f7f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#f8f7f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
        </div>
      </Link>
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
     
      <a onClick={logout} className="block">
          <div className="block__item">
            <p>Logout</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
      </svg>
        </div>
      </a>
     
   
      <a href="/settings_app" className="block">
          <div className="block__item">
            <p>Settings</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
          <path d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="#f8f7f7" stroke-width="1.5"></path>
      </svg>
        </div>
      </a>
    
    </nav>
    </div>
  );
};

export default BlocksNav;


export async function getServerSideProps(context: any) {
  const req = context.req;
  const res = context.res;
  var username = getCookie('username', { req, res });
  if (username == undefined){
    username = false;
  }
  return { props: { username } };
}