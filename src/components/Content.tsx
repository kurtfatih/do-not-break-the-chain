import React from "react"
import styled from "styled-components"

interface ContentBodyProps {}
const ContentBodyContainer = styled.div`
  background-color: red;
  justify-content: center;
`

export const Content: React.FC<ContentBodyProps> = ({ children }) => {
  return <ContentBodyContainer>{children}</ContentBodyContainer>
}
