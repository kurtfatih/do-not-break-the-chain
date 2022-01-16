import styled from "styled-components"

export const Image = styled.img<{
  rounded?: boolean
}>`
  z-index: 999;
  ${({ rounded }) => rounded && "border-radius:50%"}
`
