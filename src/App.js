import { React, useEffect, useState } from "react";
import axios from "axios";
import "./app.css";
import Loader from './component/loader/Loader'
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  // eslint-disable-next-line no-unused-vars
 
  useContractWrite,
} from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Proposals from "./component/Proposals";
function App() {
  const [fundData, setFundData] = useState("")
  const [maticData, setMaticData] = useState("")
  const [ethData, setETHData] = useState("")
  const address = useAddress();
  const [userDetails, setUserDetails] = useState([]);
  const [Loading, setloading] = useState(false);
  const { contract } = useContract(
    "0x8b11B5Eb8D9e85BB1d5D74b8718Ab0d883cDb94B"
  );
   // eslint-disable-next-line no-unused-vars
  const { mutateAsync: signProposal, isLoading } = useContractWrite(
    contract,
    "signProposal"
  );
  let [table , setTable]=useState(false)
  const [signed, setSigned] = useState([]);
  // eslint-disable-next-line no-unused-vars
 // const [singleData, setSingleData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [formData, setformData] = useState([]);

  const { data: admin, isLoading: isAdminLoading } =
    useContractRead(contract, "owner");
 

 console.log(admin)


 
  const handleInputChange = (singleData) => {
    console.log(singleData,"Single data console")
    let formData = {
      name: singleData.money,
      num1: singleData.num1,
      date: singleData.date,
      num2: singleData.num2,
      num3: 100 - singleData.num3,
      name2: singleData.name2,
      name3: singleData.name3,
      name4: singleData.name4,
      name5: singleData.name5,
      name6: singleData.name6,
      name7: singleData.name7,
      name8: singleData.name8,
      name9: singleData.name9,
      name10: singleData.name10,
      name11: singleData.name11,
      name12: singleData.name12,
      emailOfInvestor: singleData.emailOfInvestor,
      emailOfFounder: singleData.emailOfFounder,
    };
    setformData(formData);
  };

  async function handleSubmit(formData){
    console.log(formData,"this is formdataa")
    try {
     
      const response = await axios.post(
        "http://localhost:3100/create-pdf",
        formData
      );     
      
      if (response.status === 200) {
        setloading(false)
        toast.success(
          "SAFE agreement has been successfully signed and sent to your emails.!!",
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          }
        );
       
      } else {
        console.error("Failed to create PDF and send email");
      }
    } catch (error) {
      console.error("Error during the POST request:", error);
    }
    


  };
  

 const [errors, setErrors] = useState("")
  console.log(errors.message)

  async function sign (name2, _index, formData, handleSubmit) {
    console.log(name2, _index, formData, handleSubmit,"Signbutton console")
    try {
      setloading(true)
      const data = await signProposal({ args: [_index] });
      console.info("contract call successs", data);
      // console.log("hello2222");
     await handleSubmit(formData);
    } catch (err) {
      console.error(err.message);
      toast.error(
       "Investor needs to be whitelisted", 
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        }
      );
      setloading(false)
      setErrors(err)
      // console.log("hello 33333333");
    }
  };

  const getData = async (data) => {
    for (let i = 0; i < data.length; i++) {
      // console.log('Hii');

      let name = data[i].address;
      // eslint-disable-next-line no-unused-vars
      let index = data[i].proposal_index;
      // console.log(name, index);

      const data1 = await contract?.call("investorProposalApprovals", [name, i]);
        //console.log("d1 ",i, data1);
      if (data1 === true || data1 === false) {
        setSigned((signed) => [...signed, data1]);
      }
    }
  };
  
  
  const getUserProposals = async () => {
    try {
     
      const response = await axios.get(
        `http://localhost:3100/users?address=${address}`
      );
      const { data } = response;
      setUserDetails(data.db_results);
      await getData(data.db_results);

       console.log("data ; ",data.db_results);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  const getBnbFund = async () => {
    try {
     
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`
      );
      setFundData(response.data.binancecoin.usd);
 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(()=>{
    getBnbFund()
  }, [])

  const getMaticData = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd`
      );
      setMaticData(response.data["matic-network"]["usd"]);
 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(()=>{
    getMaticData()
  }, [])


  const getETHData = async () => {
    try {
     
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
      );
      setETHData(response.data.ethereum.usd);
 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(()=>{
    getETHData()
  }, [])




  // console.log(userDetails);

  useEffect(() => {
    if (address !== undefined && contract !== undefined) {
      getUserProposals();
      // InvData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, contract]);

  return (
    <div >
    <ToastContainer />
    <div>
      <div>
        <div className="content">
          <div className="search_top_bar">
            <div className="connectwallet">
              <ConnectWallet onClick={getUserProposals} />
            </div>
          </div>
        </div>
      </div>
      <div className="content rightsidediv">

        <div className="dashbord">
          <div className="container">
            <div className="section1">
          
            {
           Loading ?  <Loader/> : ""
            }
              <h1>Hello, Safe user !!</h1>
              <p>View your safe agreements</p>
            </div>
          </div>
          <div className="section2">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="fund">
                  <img className="box_logo" src="/bnblogo.svg"/>
                  <div className="data_box">
                    <h6>BNB</h6>
                    <h2>$ {fundData ? fundData : "0.00"}</h2>
                  </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="fund">
                  <img className="box_logo" src="/maticlogo.svg"/>
                  <div className="data_box">
                    <h6>MATIC</h6>
                    <h2>$ {maticData ? maticData : "0.00"}</h2>
                  </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="fund">
                   <img className="box_logo" src="/ethlogo.svg"/>
                   <div className="data_box">
                    <h6>ETH</h6>
                    <h2>$ {ethData ? ethData : "0.00"}</h2>
                    <div className="grow">
                  </div>
                 </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section3">
            <div className="container">
              <div className="propasal">
                <h4 onClick={()=>setTable(false)}> Proposals</h4>
                <div style={{width:"10px"}}></div>
               
               
              </div>

              {table===false ? <div className="proTable">
                <table>
                  <thead>
                    <tr>
                      <th>Prop.ID</th>
                      <th>Pre / Post</th>
                      <th>Invest. Amount</th>
                      <th>Date</th>
                      <th>Valuation cap</th>
                      <th>Discount</th>
                      <th>Company</th>
                      <th>Name</th>
                      <th>Sign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetails.map((row, index) => (
                      <tr key={index}>
                        <td>{row.proposal_index}</td>
                        <td>{row.money}</td>
                        <td>${row.investmentamount}</td>
                        <td>{new Date(row.date).toLocaleDateString()}</td>
                        <td>${row.valuationcapnumber}</td>
                        <td>{row.discountnumber}%</td>
                        <td>{row.companylegalname}</td>
                        <td>{row.benificial}</td>
                        <td>
                          {/* <button onClick={() => sign(row.name2, index)}>Sign</button> */}
                          {signed[index] ? (
                            <>
                              <button>Signed</button>
                            </>
                          ) : (
                            <button
                              onClick={async() => {
                                await sign(
                                  row.MMaddress,
                                  row.proposal_index,
                                  row,
                                  handleSubmit
                                );
                                handleInputChange(row);
                              }}
                            >
                              Sign
                            </button>
                          )}
                        </td>
                        {/* {call(row.name2, index)} */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> : <Proposals/>}
            </div>
          </div>
        </div>

      </div>
    </div>
    
    </div>
  );
}

export default App;
