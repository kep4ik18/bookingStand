import { Stack, Typography } from "@mui/material";
import { BurgerMenu } from "./BurgerMenu";

import SvgLogo from "./Logo.svg";

export const Header = () => {
  return (
    <Stack direction="row" alignItems="center" gap={2} mb={2}>
      <img src={SvgLogo} alt="logo" width={43} />
      <BurgerMenu />
      <Typography fontWeight={900}>
        Сервис управления стендами для бронирования
      </Typography>
    </Stack>
  );
};
