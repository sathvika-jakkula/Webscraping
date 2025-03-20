"use client";
import { useState } from "react";
import axios from "axios";
export default function Home() {
  const [name,setName] = useState<string>("");
 
  const [downloads,setDownloads] = useState<string>("");
  const [license,setLicense] = useState<string>("");
  const [version,setVersion] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(false);



  // const handledata = async () => {
  //   setLoading(true);
  //   setData("");
  //   console.log(name);
  //       const response = await fetch("/api/getdata",{
  //         method:"POST",
  //         body:JSON.stringify({name}),
  //       });
  //       const {downloads} = await response.json();
  //       console.log(downloads);
        
  //       setData(downloads);
  //       setLoading(false);
  // }

  const handledata = async () => {
    setLoading(true);
    setDownloads("");
    setLicense("");
    setVersion("");
   try{
    if(name.length>0){
      const response =  await axios.post("/api/getdata",{name:name})
      console.log(response);
      console.log(response.data.downloads);
           setDownloads(response.data.downloads);
           setLicense(response.data.license);
           setVersion(response.data.version);
           console.log(response.data.totaldata)
    }
   
   }catch(err){
    console.log(err)
   }
   setLoading(false);
  }


  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">NPM PACKAGE CHECKER</h2>
      
      <input 
        type="text" 
        placeholder="Enter a package name" 
        className="border border-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg px-4 py-2 w-full text-gray-700 mb-4"
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
  
      <button 
        onClick={handledata} 
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 w-full"
      >
        Get Downloads
      </button>
  
      {loading && <div className="text-blue-500 font-medium text-center mt-4">Loading...</div>}
  
      {name.length > 0 && downloads && downloads === "Not found" ? (
        <div className="text-red-500 font-medium text-center mt-4">No Packages Found</div>
      ) : downloads !== "Not found" && downloads !== "" ? (
        <div className="text-gray-800 font-medium text-center mt-4 flex justify-between">
          <div >
            <h1 className="text-xl font-bold">Latest Version</h1>
            <p className="text-gray-600">{version}</p>
            </div>
            <div>
            <h1 className="text-xl font-bold">Downloads</h1>
            <p className="text-gray-600">{downloads}</p>
            </div>
            <div>
            <h1 className="text-xl font-bold">License</h1>
            <p className="text-gray-600">{license}</p>
            </div>
        </div>
      ) : null}
    </div>
  </div>
  
  );
}
