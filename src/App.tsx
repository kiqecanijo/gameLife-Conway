import React, { useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { ifProp } from 'styled-tools'
import produce from 'immer'
// TODO: see how it works here: https://github.com/immerjs/immer/blob/master/src/core/immerClass.ts#L66

const SIZE:number = 25

const create2DArray = (length:number):boolean[][] =>
  [...Array(length)]
    .map(() => [...Array(length)]
      .map(() => Math.random() >= 0.9) // 1/10 to be alive
    )

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(${SIZE}, 30px)
`

const Box = styled.div`
width: 30px;
height: 30px;
background:${ifProp('active', '#fff')};
box-shadow: 
  0 0 .1rem #fff,
  0 0 .1rem #fff,
  0 0 0.5rem #fff,
  0 0 0.2rem #fff
`

const neighborhoodAddress:number[][] = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
]

const App:React.FC = () => {
  const [grid, setGrid] = useState(create2DArray(SIZE))
  const [running, setRunning] = useState(false)
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
    <button
        onClick={() => {
          setRunning(!running)
        }}
      >
        {running ? 'stop' : 'start'}
      </button>
    <Row>
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
