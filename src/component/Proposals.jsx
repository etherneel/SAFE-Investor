import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Proposals.css'
const Proposals = () => {
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
           setUserDetails(data.data)
           console.log("data of all users; ",data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
    
  return (
    <div>
        
        <div className="proTable" style={{"width":"100%" , "margin":"auto" , "marginLeft":"-10px"}}>
                <table>
                  <thead>
                    <tr>
                      
                      <th>Pre / Post</th>
                      <th>Invest. Amount</th>
                      <th>Date</th>
                      <th>Valuation cap</th>
                      <th>Discount</th>
                      <th>Company</th>
                      <th>Name</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {userDetails.map((row, index) => (
                      <tr key={index}>
                        {/* <td>{row.proposal_index}</td> */}
                        <td>{row.money}</td>
                        <td>${row.investmentamount}</td>
                        <td>{new Date(row.date).toLocaleDateString()}</td>
                        <td>${row.valuationcapnumber}</td>
                        <td>{row.discountnumber}%</td>
                        <td>{row.companylegalname}</td>
                        <td>{row.benificial}</td>
                        
                        {/* {call(row.name2, index)} */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
    </div>
  )
}

export default Proposals