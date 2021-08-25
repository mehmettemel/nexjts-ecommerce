import { Button, Table, Text } from '@geist-ui/react'
import React, { useEffect } from 'react'
import Check from '@geist-ui/react-icons/check'
import { X } from '@geist-ui/react-icons'
import Link from 'next/link'
const ProfileOrders = ({ orders }) => {
  const dataSource = orders.map((order) => ({
    id: order._id,
    createdAt: new Date(order.createdAt).toLocaleDateString(),
    total: '$' + order.total,
    delivered: order.delivered ? <Check /> : <X />,
    operation: (
      <Link href={`/order/${order._id}`}>
        <a>
          <Button type='success' auto scale={1 / 3}>
            Details
          </Button>
        </a>
      </Link>
    ),
  }))

  return (
    <div className=' overflow-x-auto'>
      <h2 className='text-lg md:text-2xl'>Orders</h2>
      <div className='my-2'>
        <Table data={dataSource} onChange={(value) => setData(value)}>
          <Table.Column prop='id' label='id' />
          <Table.Column prop='createdAt' label='createdAt' />
          <Table.Column prop='total' label='total' />
          <Table.Column prop='delivered' label='delivered' />
          <Table.Column
            prop='operation'
            label='operation'
            width={150}
          ></Table.Column>
        </Table>
      </div>
    </div>
  )
}

export default ProfileOrders
