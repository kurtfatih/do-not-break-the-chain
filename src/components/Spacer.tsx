import styled from "styled-components"

export const Spacer = styled.div<{ value: number }>`
  display: flex;
  flex: ${({ value }) => value};
`
