import React from 'react'
import {FireFilled} from '@ant-design/icons';
import LogoImg from '../logo/logo2.png'
const Logo = () => {
  return (
    <div className="flex items-center justify-center text-white p-[10px]">
      <div className="w-[40px] h-[40px] flex items-center justify-center text-white text-2xl rounded-full bg-opacity-88 bg-darkpurple">
        <img src={LogoImg} alt='logo'/>
      </div>
    </div>
  )
}

export default Logo
