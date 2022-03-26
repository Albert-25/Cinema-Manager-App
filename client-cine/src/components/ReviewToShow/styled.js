import styled from "styled-components";

export const DivStar = styled.div`
    color:${({ value, puntuacion }) => parseInt(value) <= puntuacion ? "#523689 " : "#f2f2f25e"};
    padding: 0px 2px;
    font-size: 24px;
    display: inline-block;
`