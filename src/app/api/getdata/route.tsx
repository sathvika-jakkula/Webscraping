import {JSDOM} from "jsdom";
import axios from "axios";

// import { NextApiRequest, NextApiResponse } from "next";
// export async function POST  (req:any) {
// //     console.log(req.method)
// //   console.log("body:", req.body);
//   const body = await new Response(req.body).json();
//     const { name } = body;
//     console.log(name);
//     // const {input} = req.body;
//     // console.log(input);
//     const data = await fetch(`https://www.npmjs.com/package/${name}`);
//     const html = await data.text();
//     const dom = new JSDOM(html);
//     const document = dom.window.document;
//     const downloads = document.querySelector("._9ba9a726")
//     const count = downloads?.textContent || "Not found";
//     console.log("downloads",count);
//    return Response.json({downloads:count});
// }

export async function POST(req:Request): Promise<Response> {
       
       try{
        const body = await new Response(req.body).json();
        console.log(body);
        const {name} = body;
        const response = await axios.get(`https://www.npmjs.com/package/${name}`)
                const text_data = response.data;
              //   console.log(text_data);
                const Html_data = new JSDOM(text_data);
                const dom_element = Html_data.window.document;
                const count_of_downloads_element = dom_element.querySelector("._9ba9a726");
                const count_of_downloads = count_of_downloads_element?.textContent || "Not found";
                const latest_version = dom_element.querySelectorAll("._702d723c");
                const latest_versions = Array.from(latest_version).map(el => el.textContent?.trim() || "Unknown");
              const version = latest_versions[3]?? "Unknown";;
              const license = latest_versions[4]?? "Unknown";;
              
            
                
               
                return Response.json({downloads:count_of_downloads,version:version,license:license})
       }catch(err){
              console.error(err)
        return Response.json({downloads:"Not found"}, { status: 500 });
       }   
}
