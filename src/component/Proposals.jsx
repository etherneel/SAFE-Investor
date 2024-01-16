import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Proposals.css'
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  // eslint-disable-next-line no-unused-vars
  useContractWrite,
} from "@thirdweb-dev/react";


const Proposals = () => {
  const { contract } = useContract(
    "0x8b11B5Eb8D9e85BB1d5D74b8718Ab0d883cDb94B"
  );
  const address = useAddress()

  const { data: admin, isLoading: isAdminLoading } =
  useContractRead(contract, "owner");

    const [userDetails, setUserDetails] = useState([]);

    useEffect(()=>{
      getAllUsersProposals()
    },[])


    const getAllUsersProposals = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3100/allUsers`
          );
          const { data } = response;
          {admin == address ? setUserDetails(data.data) : setUserDetails([]) }
           console.log("data of all users; ",data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      console.log()
    
  return (
    <div>
     
    </div>
  )
}

export default Proposals