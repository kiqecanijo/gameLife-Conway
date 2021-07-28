import styled from 'styled-components'
import { prop, ifProp } from 'styled-tools'

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(${prop('size')}, 30px)
`
export const Box = styled.div`
width: 30px;
height: 30px;
background:${ifProp('active', '#fff')};
box-shadow: 
0 0 .1rem #fff,
0 0 .1rem #fff,
0 0 0.5rem #fff,
0 0 0.2rem #fff
`
export const Button = styled.button`
font-size: 1rem;
font-weight: 200;
font-style: italic;
color: #fff;
padding: 0.5rem 1rem;
margin: 0.8rem;
background:none;
border: 0.4rem solid;
border-radius: 2rem;
text-shadow:
0 0 7px #fff,
0 0 11px #fff,
0 0 22px #fff,
0 0 2px #fff,
0 0 5px #fff,
0 0 10px #fff;
box-shadow: 
  0 0 .1rem #fff,
  0 0 .1rem #fff,
  0 0 0.3rem #fff,
  0 0 0.2rem #fff
`
