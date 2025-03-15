import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import styled from "@mui/material/styles/styled"; // LOCAL CUSTOM HOOK
import { useLayout } from "../dashboard-layout-context"; // STYLED COMPONENTS
import { BadgeValue, BulletIcon, StyledText, NavItemButton, ListIconWrapper, ChevronRightIcon } from "./styles"; // STYLED COMPONENT

const NavExpandRoot = styled("div")({
  "& .expansion-panel": {
    overflow: "hidden",
    "& .expansion-panel": {
      paddingLeft: 8,
    },
  },
});

export default function SidebarAccordion({ item, children, isOpen, onToggle }) {
  const { name, icon, iconText, badge } = item || {};
  const { COMPACT } = useLayout();
  const pathname = usePathname();
  const [hasActive, setHasActive] = useState(0);

  const find = item?.children?.find((li) => li.path === pathname);

  useEffect(() => {
    if (find) {
      setHasActive(1);
    } else {
      setHasActive(0);
    }
  }, [find]);

  return (
    <NavExpandRoot className="subMenu">
      <NavItemButton
        active={hasActive}
        onClick={onToggle}
        sx={{ justifyContent: "space-between" }}
      >
        <Box display="flex" alignItems="center">
          {icon ? (
            <ListIconWrapper>
              <item.icon />
            </ListIconWrapper>
          ) : null}

          {iconText ? <BulletIcon active={hasActive} /> : null}

          <StyledText compact={COMPACT}>{name}</StyledText>
        </Box>

        {badge ? <BadgeValue compact={COMPACT}>{badge.value}</BadgeValue> : null}

        <ChevronRightIcon
          color="disabled"
          compact={COMPACT}
          collapsed={isOpen ? 0 : 1} // Control icon collapse based on isOpen prop
        />
      </NavItemButton>

      <Collapse in={isOpen} unmountOnExit>
        <div className="expansion-panel">{children}</div>
      </Collapse>
    </NavExpandRoot>
  );
}
