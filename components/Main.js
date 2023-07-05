import React, { useEffect, useState } from 'react'
import {ethers, BigNumber} from "ethers"
import roboPunksAbi from "../backend/artifacts/contracts/RoboPunks.sol/RoboPunks.json"
import { Button, Input } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';
// QmWRpy3tvQFVz9MijrGmkGrDjz8dDcaavyyLA7tV2T5FDk
export default function Main({accounts,setAccounts}) {
    const cA="0x98EC285C192Ff92a9e65A3f355D85933904beF46"
    const [mintAmt,setMIntAmt]=useState(1)
    const isConnected = Boolean(accounts[0]);
    const [loading,setLoading]=useState(0)
    const [images,setImages]=useState([])

   async function handleMint(){


        try{
            if(window.ethereum){
                setLoading(1)
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner();
                const contract= new ethers.Contract(
                    cA,
                    roboPunksAbi.abi,
                    signer
                );
            const resp=await contract.mint(BigNumber.from(mintAmt),{
                value:ethers.utils.parseEther((0.02 * mintAmt).toString())
            });
            console.log("resp",resp);
        setLoading(0)
        toast.success("NFT minted!");

          }
          else{
            setLoading(0)
            toast.error("NO wallet found!");
        }
        }
        catch(err){
            console.error('Error', err)
        setLoading(0)
        toast.error(err.message);


        
        }

    

   }

   const handleDec=()=>{
    if (mintAmt <= 1) return;
    setMIntAmt(mintAmt-1)
   }
   const handleIncr=()=>{
    if (mintAmt >= 3) return;
    setMIntAmt(mintAmt+1)
   }
  return (
    <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:30,flexWrap:'wrap'}}>
        {
            loading ?
            <Loading/>:null
        }
        <h1>RoboPunks</h1>
        <p>Max Supply 5</p>
       
        {
            isConnected ?

            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',gap:30,flexWrap:'wrap',width:'80%'}}>
            <div  style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',gap:30}}>
            <img style={{width:150,borderRadius:15}} src='https://gateway.ipfs.io/ipfs/QmWRpy3tvQFVz9MijrGmkGrDjz8dDcaavyyLA7tV2T5FDk/1.png' alt=''/>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',gap:30,flexWrap:'wrap'}} >
            <Button
               backgroundColor="#D6517D"
               borderRadius="5px"
               boxShadow="0px 2px 2px 1px #0F0F0F"
               color={"white"}
               cursor={"pointer"}
               fontFamily={"inherit"}
               padding={"15px"}
               onClick={()=>{handleIncr()}}
            >
                +
            </Button>
            <Input
            readOnly
            backgroundColor="#fff"
               borderRadius="5px"
               boxShadow="0px 2px 2px 1px #0F0F0F"
               color={"black"}
               cursor={"pointer"}
               fontFamily={"inherit"}
               padding={"0 0 0 15px"}
               height={"40px"}
               value={mintAmt}
               type='number'
               textAlign={"center"}
               onChange={(e)=>{setMIntAmt(e.target.value)}}
            />
            <Button
               backgroundColor="#D6517D"
               borderRadius="5px"
               boxShadow="0px 2px 2px 1px #0F0F0F"
               color={"white"}
               cursor={"pointer"}
               fontFamily={"inherit"}
               padding={"15px"}
               onClick={()=>{handleDec()}}
            >
                -
            </Button>
            </div>

  
            <Button
            backgroundColor="#D6517D"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color={"white"}
            cursor={"pointer"}
            fontFamily={"inherit"}
            padding={"15px"}
            onClick={()=>{handleMint()}} >Mint</Button>
            </div>


          </div>
  
            :
            <div>
                <p>You must be connected to Mint</p>
            </div>
        }
    </div>
  )
}
