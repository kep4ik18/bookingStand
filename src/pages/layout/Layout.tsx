import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Wrapper } from "./styles";



export const Layout = () => (
  <Wrapper>
    <Header />
    <Outlet/>
  </Wrapper>
);



// import { Header } from "./Header";
// import { Wrapper } from "./styles";

// type LayoutProps = {
//   Component: React.FunctionComponent;
// };

// export const Layout = ({ Component }: LayoutProps) => (
//   <Wrapper>
//     <Header />
//     <Component />
//   </Wrapper>
// );
