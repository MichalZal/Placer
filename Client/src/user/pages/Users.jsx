import React from 'react'
import UsersList from '../components/UserList'

const USERS = [
  {
    id: 1,
    name: 'John',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1024px-Image_created_with_a_mobile_phone.png',
    placeCount: 1,
  },
  {
    id: 2,
    name: 'John',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1024px-Image_created_with_a_mobile_phone.png',
    placeCount: 2,
  },
  {
    id: 3,
    name: 'John',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1024px-Image_created_with_a_mobile_phone.png',
    placeCount: 3,
  },
  {
    id: 4,
    name: 'John',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1024px-Image_created_with_a_mobile_phone.png',
    placeCount: 4,
  },
]

const Users = () => {
  return <UsersList items={USERS}/>
}

export default Users