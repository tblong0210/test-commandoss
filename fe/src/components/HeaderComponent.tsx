import React from 'react'

import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit'

import TabNavigation from './TabNavigation'

const HeaderComponent: React.FC = () => {
  const currentAccount = useCurrentAccount()
  console.log('Current Account:', currentAccount)

  return (
    <div className='my-4 px-10 w-screen flex justify-between items-center'>
      <h1 className='text-center text-xl font-medium'>SkillSwap</h1>
      <TabNavigation activeTab='1' setActiveTab={() => {}} />
      <ConnectButton />
    </div>
  )
}

export default HeaderComponent
