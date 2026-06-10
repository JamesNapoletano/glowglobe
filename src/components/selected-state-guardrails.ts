import { alpha, type Theme } from "@mui/material/styles";

export const contrastGuardClassNames = {
  primary: "contrast-guard-primary",
  secondary: "contrast-guard-secondary",
} as const;

export function getStrongSelectedListItemSx(theme: Theme, selected: boolean) {
  return {
    border: "1px solid",
    borderColor: selected ? theme.palette.primary.dark : alpha(theme.palette.text.primary, 0.12),
    bgcolor: selected ? theme.palette.primary.main : alpha(theme.palette.background.paper, 0.74),
    backgroundImage: selected
      ? `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
      : "none",
    color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
    boxShadow: selected ? `0 12px 24px ${alpha(theme.palette.primary.dark, 0.22)}` : "none",
    "& .MuiListItemIcon-root": {
      color: "inherit",
    },
    [`& .${contrastGuardClassNames.primary}`]: {
      color: selected ? theme.palette.primary.contrastText : "inherit",
    },
    [`& .${contrastGuardClassNames.secondary}`]: {
      color: selected ? alpha(theme.palette.primary.contrastText, 0.92) : theme.palette.text.secondary,
    },
    "&:hover": {
      bgcolor: selected ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.06),
      backgroundImage: selected ? `linear-gradient(180deg, ${theme.palette.primary.dark}, ${theme.palette.primary.dark})` : "none",
    },
  };
}

export function getSoftSelectedListItemSx(theme: Theme, selected: boolean) {
  return {
    border: "1px solid",
    borderColor: selected ? alpha(theme.palette.primary.main, 0.28) : theme.palette.divider,
    bgcolor: selected ? alpha(theme.palette.primary.main, 0.14) : alpha(theme.palette.background.paper, 0.84),
    color: theme.palette.text.primary,
    boxShadow: selected ? `0 10px 22px ${alpha(theme.palette.primary.dark, 0.12)}` : "none",
    "& .MuiListItemIcon-root": {
      color: "inherit",
    },
    [`& .${contrastGuardClassNames.primary}`]: {
      color: theme.palette.text.primary,
    },
    [`& .${contrastGuardClassNames.secondary}`]: {
      color: selected ? theme.palette.primary.dark : theme.palette.text.secondary,
    },
    "&:hover": {
      bgcolor: selected ? alpha(theme.palette.primary.main, 0.16) : alpha(theme.palette.primary.main, 0.05),
    },
  };
}
