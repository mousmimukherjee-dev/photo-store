import React from 'react'

export const SignOutButton = () => {
  return (
    <form action="/auth/signout" method='post' className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">
      <button type='submit'>
        Sign Out
      </button>
    </form>
  )
}
