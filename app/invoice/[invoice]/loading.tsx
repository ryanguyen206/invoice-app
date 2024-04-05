import { Card, Skeleton } from '@nextui-org/react'
import React from 'react'

const Loading = () => {
  return (
    <div className=' '>
          <Card className="mt-20 space-y-5 p-4 mx-auto" radius="lg">
        <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        </div>
    </Card>


        <Card className="mt-20 space-y-5 p-4 mx-auto h-96" radius="lg">
        <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        </div>
        <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        </Card>
</div>
  )
}

export default Loading