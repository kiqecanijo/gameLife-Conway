import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { ifProp } from 'styled-tools'

const SIZE:number = 20

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

const App = () => {
  const [grid, setGrid] = useState(create2DArray(SIZE))

  return (
    <Row>
    {grid.map((row, x) => row.map((col, y) =>
      <Box
      key={`${x}-${y}`}
      active={grid[x][y]}
      />))}
    </Row>
  )
}

export default App
