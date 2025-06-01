import React from 'react'

import { ConnectButton } from '@mysten/dapp-kit'

import TabNavigation from './TabNavigation'

const HeaderComponent: React.FC = () => {
  return (
    <div className='my-4 px-10 w-screen flex justify-between items-center'>
      <h1 className='text-center text-xl font-medium'>SkillSwap</h1>
      <TabNavigation />
      <ConnectButton />
    </div>
  )
}

export default HeaderComponent
