import React from 'react'

const UserCard = ({ name, bio, age }) => {
  return (
    <div className="UserCard border p-2 mb-2">
      <div className="d-flex flex-nowrap">
        <div>
          <h6>{name}</h6>
          <p>{bio}</p>
          <small>{age}</small>
        </div>
      </div>
    </div>
  )
}

export default UserCard