import { Button } from '@chakra-ui/react';
import React from 'react'

export default function Navbar({accounts,setAccounts}) {
    const isConnected = Boolean(accounts[0]);
    async function connectAcc(){
        if (window.ethereum){
            const acc=await window.ethereum.request({
                method:"eth_requestAccounts"
            });

            setAccounts(acc)
        }

    }
  return (
    <div className='nav'>
        {!isConnected ? <Button
        backgroundColor="#D6517D"
        borderRadius="5px"
        boxShadow="0px 2px 2px 1px #0F0F0F"
        color={"white"}
        cursor={"pointer"}
         fontFamily={"inherit"}
        padding={"15px"}
        className='connect'
         onClick={connectAcc}>Connect Wallet</Button
        
        >:<p  className='connected' >Connected</p>}
    </div>
  )
}
