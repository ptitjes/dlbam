import styled from "styled-components"

const Container = styled.div`
  display: flow-root;
  box-sizing: content-box;

  max-width: 900px;

  margin-left: auto;
  margin-right: auto;

  padding-left: 15px;
  padding-right: 15px;

  @media (min-width: 960px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: 640px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`
export default Container
