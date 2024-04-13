import { cn } from '@/libs/cn'
import React from 'react'
import { GoDotFill } from 'react-icons/go'


interface StatusChipProps {
    isPaid: boolean | null
    className?: string
}
const StatusChip = ({isPaid, className} : StatusChipProps) => {

  return (
    <div className={cn("bg-[#fff8f0] px-6 py-3 text-orange-500 rounded-xl flex items-center", className,
        {"text-[#33d69f] bg-[#f3fcf6]" : isPaid}
    )}>
        <GoDotFill className='inline-block mb-1' height={24} width={20} /> 
        <p>{isPaid ? 'Paid' : 'Pending'}</p>
    </div>
  )
}

export default StatusChip