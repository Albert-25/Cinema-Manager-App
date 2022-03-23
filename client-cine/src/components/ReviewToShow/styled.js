import styled from "styled-components";

export const DivStar = styled.div`
    color:${({ value, puntuacion }) => parseInt(value) <= puntuacion ? "blue" : "#B2BABB"};
    margin: 0px 3px;
    padding: 0px 3px;
    font-size: 28px;
    display: inline-block;
`