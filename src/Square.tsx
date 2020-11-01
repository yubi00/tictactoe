import React from 'react'

interface Props {
  value: string | null
  handleClick: (i: number) => void
  index: number
}

export const Square = ({ value, handleClick, index }: Props) => {
  return (
    <button
      className='square'
      onClick={() => {
        handleClick(index)
      }}
    >
      {value}
    </button>
  )
}
