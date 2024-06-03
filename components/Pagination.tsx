import React from 'react'
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";


interface PaginationProps  {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    currentPage: number
    numberOfPages: number
}

const Pagination = ({numberOfPages, setCurrentPage, currentPage}: PaginationProps) => {
  return (
    <div className='flex justify-center space-x-6 my-10'>
   
    <button className='cursor-pointer 'onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        <GrFormPreviousLink/>
    </button>
    <div>
        {Array.from({ length: numberOfPages }, (_, index) => (
            <button
                className={`mx-4  px-4 py-2 rounded-md ${index + 1 === currentPage ? 'bg-purple text-white' : 'bg-white '}`}
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
            >
                {index + 1}
            </button>
        ))}
    </div>
      <button className='cursor-pointer' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === numberOfPages}>
        <GrFormNextLink />
      </button>
 </div>
  )
}

export default Pagination