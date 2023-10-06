import styled from "styled-components";

const ButtonCustom = styled.button`
  background-color: ${(props) => props.lightTheme == true ? 'white' : '#002F24'};
  border-radius: ${(props) => props.rounded == true ? '2.5rem' : '0'};
  color: ${(props) => props.lightTheme == true ? '#002F24' : '#C1F1E0'};
  border-color: ${(props) => props.lightTheme == true ? '#002F24' : '#C1F1E0'};
  //width: 350px;
  //height: 50px;
  //width: ${(props) => props.width ? props.width : 'auto'};
  font-size: 1.2rem;
  margin: 1.2rem 15px;
  cursor: pointer;
`

export default ButtonCustom