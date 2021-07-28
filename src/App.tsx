import React, { useEffect, useState, useRef, useCallback } from 'react'
import produce from 'immer'
// TODO: see how it works here: https://github.com/immerjs/immer/blob/master/src/core/immerClass.ts#L66
import { Button, Row, Box } from './styles'

const SIZE:number = 25

const create2DArray = (length:number, prefixPercent: number = 0.2):boolean[][] =>
  [...Array(length)]
    .map(() => [...Array(length)]
      .map(() => Math.random() <= (prefixPercent)) // 1/5 to be alive
    )

const neighborhoodAddress:number[][] = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 1], [0, 1], [1, 1],
  [-1, 0], [1, 0]
]

const App:React.FC = () => {
  const [grid, setGrid] = useState(create2DArray(SIZE))
  const [running, setRunning] = useState(false)
  const [randomPercent, setRandomPercent] = useState(0)

  const runningRef = useRef(running)

  const runSimulation = useCallback(() => {
    runningRef.current && setGrid(grid =>
      produce(grid, gridCopy => {
        grid.forEach((row, x) => row.forEach((_, y) => {
          const neighbors = neighborhoodAddress
            .map(([movX, movY]) => // inside grid
              (x + movX >= 0 && x + movX < SIZE && y + movY >= 0 && y + movY < SIZE) &&
          grid[x + movX][y + movY] // alive or not
            ).filter(Boolean).length

          if (neighbors < 2 || neighbors > 3) {
            gridCopy[x][y] = false
          } else if (!grid[x][y] && neighbors === 3) {
            gridCopy[x][y] = true
          }
        }))
      })
    )
    setTimeout(runSimulation, 100)
  }, [])

  useEffect(() => {
    runningRef.current = running
    running && runSimulation()
  }, [running])

  return (
      <>
      <Button onClick={() => setRunning(!running)}>
      {running ? 'stop' : 'start'}
      </Button>
      <Button onClick={() => {
        setGrid(create2DArray(SIZE, 0))
        setRunning(false)
      }}>clear</Button>
      <Button onClick={() => {
        setGrid(create2DArray(SIZE, 0.5))
        setRunning(false)
      }}>randomize</Button>

      <Row size={SIZE}>
      {grid.map((row, x) => row.map((_, y) =>
        <Box
        key={`${x}-${y}`}
        active={grid[x][y]}
        onClick={() => {
          const newGrid = produce(grid, gridCopy => { gridCopy[x][y] = !grid[x][y] })
          setGrid(newGrid)
        }}
        />))}
        </Row>
        </>
  )
}

export default App
