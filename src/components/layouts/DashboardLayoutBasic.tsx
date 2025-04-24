import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { AppProvider, Session, type Navigation } from "@toolpad/core/AppProvider";
import {
  DashboardLayout,
  ThemeSwitcher,
  type SidebarFooterProps,
} from "@toolpad/core/DashboardLayout";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { useDemoRouter } from "@toolpad/core/internal";
import { memo } from "react";
import CustomAppTitle from "./CustomAppTitle";
import { Outlet, useNavigate } from "react-router-dom";
import { COMPANY_NAVIGATION, VENDOR_NAVIGATION } from "./NavigationMenus";
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import { Account, AccountPopoverFooter, AccountPreview, AccountPreviewProps, SignOutButton } from "@toolpad/core";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: "inline", md: "none" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
      />
      <ThemeSwitcher />
    </Stack>
  );
}
function AccountSidebarPreview(props: AccountPreviewProps & { mini: boolean }) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

const accounts = [
  {
    id: 1,
    name: "Bharat Kashyap",
    email: "bharatkashyap@outlook.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
    projects: [
      {
        id: 3,
        title: "Project X",
      },
    ],
  },
  {
    id: 2,
    name: "Bharat MUI",
    email: "bharat@mui.com",
    color: "#8B4513", // Brown color
    projects: [{ id: 4, title: "Project A" }],
  },
];

function SidebarFooterAccountPopover() {
 
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
            component="button"
            sx={{
              justifyContent: "flex-start",
              width: "100%",
              columnGap: 2,
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: "0.95rem",
                  bgcolor: account.color,
                }}
                src={account.image ?? ""}
                alt={account.name ?? ""}
              >
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: "body2" }}
              secondaryTypographyProps={{ variant: "caption" }}
            />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

const createPreviewComponent = (mini: boolean) => {
  function PreviewComponent(props: AccountPreviewProps) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};


function SidebarFooterAccount({ mini }: SidebarFooterProps) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

interface DashboardLayoutBasicProps {}

const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

const DashboardLayoutBasic: React.FC<DashboardLayoutBasicProps> = React.memo(
  () => {
    // const { window } = props;
    const navigate = useNavigate();
    const activeRole = localStorage.getItem("activeRole") || "";
    const router = useDemoRouter(`/${activeRole}/dashboard`);
    // Remove this const when copying and pasting into your project.
    // const demoWindow = window !== undefined ? window() : undefined;
    React.useEffect(() => {
      if (router.pathname) {
        navigate(router.pathname);
      }
    }, [router.pathname, activeRole]);

    const [session, setSession] = React.useState<Session | null>(demoSession);
    const authentication = React.useMemo(() => {
      return {
        signIn: () => {
          setSession(demoSession);
        },
        signOut: () => {
          setSession(null);
        },
      };
    }, []);
    
    return (
      <AppProvider
        navigation={
          activeRole === "company" ? COMPANY_NAVIGATION : VENDOR_NAVIGATION
        }
        router={router}
        theme={demoTheme}
        authentication={authentication}
        session={session}
        // window={demoWindow}
      >
        <DashboardLayout
          slots={{
            appTitle: () => <CustomAppTitle activeType={activeRole} />,
            toolbarActions: ToolbarActionsSearch,
            sidebarFooter: SidebarFooterAccount,
          }}
        >
          <Outlet />
        </DashboardLayout>
      </AppProvider>
    );
  }
);

export default memo(DashboardLayoutBasic);
