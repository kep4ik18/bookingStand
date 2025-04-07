import { Header } from "./Header";
import { Wrapper } from "./styles";

type LayoutProps = {
  Component: React.FunctionComponent;
};

export const Layout = ({ Component }: LayoutProps) => (
  <Wrapper>
    <Header />
    <Component />
  </Wrapper>
);
