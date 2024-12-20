import { Button, Checkbox, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

interface MenuDrpDwnProps {
  menuList: any[];
  placeholder: string;
  handleSelectedItem: (selectedItems:any[])=>void
}

const MenuDrpDwn: React.FC<MenuDrpDwnProps> = ({ menuList,placeholder,handleSelectedItem }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleToggle = (option: string) => {
    setSelectedItems((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  useEffect(()=>{
    handleSelectedItem(selectedItems);
  },[selectedItems,handleSelectedItem])
  return (
    <>
      <Button
        variant="text"
        endIcon={<ExpandMoreOutlinedIcon color="inherit" fontSize="small" />}
        onClick={handleClick}
        id={placeholder}
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {selectedItems.length === 0 ? placeholder : `${placeholder} (${selectedItems.length > 1 ? `+${selectedItems.length-1}`: selectedItems.length})`}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {menuList.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleToggle(option)}
          >
            <Checkbox size='small' checked={selectedItems.includes(option)} />
            <ListItemText 
            primary={option}
            classes={{
              primary: "!text-base"
            }} 
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuDrpDwn;