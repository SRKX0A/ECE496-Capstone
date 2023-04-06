
import React, { Component,ReactElement, useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

export function Layout({children}: {children: ReactElement}) {
  
    const [toggle, setToggle] = useState<boolean>(true)
    const themeData:string|null = localStorage.getItem('theme')
    const [theme, setTheme] = useState<string>(themeData == null ? "Default" :themeData!.substring(1, themeData!.length-1))

    return (
      <div className='wrapper'>
          <div className='main' >
            <div className="content" style={{backgroundImage: "linear-gradient(to right top, #ffffff, #faf8fe, #f7f1fc, #f6eaf9, #f6e2f4)"}}>
              {children}
            </div>
          </div>
      </div>
    );
  
}
export interface IStateProps{
  children: ReactElement
}

export const LayoutProvider = ({children} : IStateProps): ReactElement => (
  <Layout children={children} />
)
