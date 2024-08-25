// import React,{useState} from 'react'
// import LocationSearch from '../common/LocationSearch'

// const SearchFilterHome = () => {
//   const [location,setLocation] = useState()


//   return (
//     <>
//       <form ref={containerRef} onSubmit={handleSubmit} className="max-w-screen-xl mx-auto shadow-lg">
//         <div className="bg-white/30 p-8 shadow-lg rounded-xl flex flex-col gap-8 border border-slate-100 backdrop:blur-md">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div>
//               <label htmlFor="pickUpLocation" className="text-blue-500 block mb-2">
//                 Property location
//               </label>
//               <div className={`transition-opacity duration-500 ease-in-out ${showInput ? '' : 'hidden'}`}>
//                 <LocationSearch onLocationSelect={handleLocationSelect} />
//               </div>
//               <div className={`transition-opacity duration-500 ease-in-out ${showInput ? 'hidden' : ''}`}>
//                 <input
//                   type="text"
//                   name="location"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   placeholder="Enter location"
//                   className="input md:w-60 md:h-5  sm:h-20 mediumSm:h-12 mediumSm:w-60"
//                   onClick={showInputField}

//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="propertyStatus" className="text-blue-500 block mb-2">
//                 Property For
//               </label>
           

//                 <select
//                   name="propertfor"
//                   className="select w-full max-w-xs"
//                   {...getFieldProps('propertfor')}
//                   required=""
//                 >
//                   <option value="">Pick the purpose</option>
                
//                    {propertyFor && propertyFor.length > 0 ? (
//                   propertyFor.map((data) => (
//                     <option key={data} value={data}>
//                       {data}
//                     </option>
//                   ))
//                 ) : null}
//                 </select>
   

//               {errors.propertfor && <p className="text-red-500 text-sm mt-1">{errors.propertfor}</p>}
//             </div>

//             <div>
//               <label htmlFor="propertyType" className="text-blue-500 block ">
//                 Property Type
//               </label>

//               <select
//                 name="propertytype"
//                 className="select w-full max-w-xs "
//                 {...getFieldProps('propertytype')}
//                 required=""
//               >
//                 <option value="">Pick the property Type</option>
//                 {propertyType && propertyType.length > 0 ? (
//                   propertyType.map((data) => (
//                     <option key={data} value={data}>
//                       {data}
//                     </option>
//                   ))
//                 ) : null}
//               </select>

//               {errors.propertytype && <p className="text-red-500 text-sm mt-1">{errors.propertytype}</p>}
//             </div>
//           </div>

//           <button type="submit" className="btn-primary rounded-lg p-2">
//             Find your property
//           </button>
//         </div>
//       </form>
//     </>
//   )
// }

// export default SearchFilterHome
