import styled from "styled-components";

export const DivStar = styled.div`
    background-color:${({ value, puntuacion }) => parseInt(value) <= puntuacion ? "#EADD15" : "#B2BABB"};
    color: white;
    margin: 0px 3px;
    padding: 0px 3px;
    font-size: 28px;
    display: inline-block;
    cursor: pointer;
`