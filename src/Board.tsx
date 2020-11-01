import React, { useState, useEffect } from 'react'
import { Square } from './Square'

interface Props {}

const calculateWinner = (squares: []): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export const Board = (props: Props) => {
  const [squares, setSquares] = useState<[] | any>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [status, setStatus] = useState<string>('')
  const [gameOver, setGameOver] = useState<boolean>(false)

  const handleClick = (i: number): void => {
    if (calculateWinner(squares) || squares[i]) return
    const modifiedSquares = [...squares]
    modifiedSquares[i] = isXNext ? 'X' : 'O'
    setSquares(modifiedSquares)
    setIsXNext((x) => !x)
  }

  useEffect(() => {
    if (squares.every((sq: any) => sq !== null) === true && !gameOver) {
      setGameOver(true)
    }

    const winner = calculateWinner(squares)
    if (winner) {
      setStatus(`Winner: ${winner}`)
      setGameOver(true)
    } else {
      setStatus('Next Player: ' + (isXNext ? 'X' : 'O'))
    }
  }, [status, isXNext, squares, gameOver])

  return (
    <>
      <p className='status'>{status && status} </p>
      <div className='board'>
        {squares.map((value: any, i: number) => (
          <Square key={i} index={i} value={value} handleClick={handleClick} />
        ))}
      </div>
      {gameOver && (
        <button
          className='btn__playagain'
          onClick={() => window.location.reload()}
        >
          Play Again
        </button>
      )}
    </>
  )
}
