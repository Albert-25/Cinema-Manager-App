import styled from "styled-components";

export const BodyBackground = styled.div`
   background-image: url(${({ image }) => image});
   // background-image: url("https://img.freepik.com/vector-gratis/fondo-sala-cine_1017-8728.jpg?size=626&ext=jpg");
   background-size: cover;
   background-repeat: no-repeat;
   min-height: 100vh;
   width: 100vw;
`;
