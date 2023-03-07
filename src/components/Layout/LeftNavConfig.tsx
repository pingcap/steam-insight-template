import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import {
  ChartBarIcon,
  LightBulbIcon,
  TableCellsIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

export interface LeftNavItemProps {
  active?: boolean;
  href: string;
  icon?: JSX.Element;
  disabled?: boolean;
  title: string;
}

export interface LeftNavConfigItemProps extends LeftNavItemProps {
  id: string;
}

export const LEFT_NAV_ITEMS: LeftNavConfigItemProps[] = [
  {
    id: "data-insight",
    title: "Data Insight",
    icon: (
      <SvgIcon>
        <ChartBarIcon />
      </SvgIcon>
    ),
    href: "/",
  },
  {
    id: "background",
    title: "Background",
    icon: (
      <SvgIcon>
        <LightBulbIcon />
      </SvgIcon>
    ),
    href: "/background",
    disabled: true,
  },
  {
    id: "data-cleaning",
    title: "Data Cleaning",
    icon: (
      <SvgIcon>
        <TableCellsIcon />
      </SvgIcon>
    ),
    href: "/data-cleaning",
    disabled: true,
  },
  {
    id: "comphrehensive",
    title: "Comprehensive",
    icon: (
      <SvgIcon>
        <AcademicCapIcon />
      </SvgIcon>
    ),
    href: "/comprehensive",
    disabled: true,
  },
];
