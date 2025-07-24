import React from 'react'

interface BadgeProps {
    verified: boolean;
  }

  const VerifiedProvider: React.FC<BadgeProps> = ({ verified }) => {
  return (
    <div
    className={`absolute top-2 left-2 px-2 py-2 rounded-lg text-white font-bold ${verified ? 'bg-green-500' : 'bg-orange-500'
      }`}
  >
    {verified ? 'Verified' : 'Unverified'}
  </div>
  )
}

export default VerifiedProvider