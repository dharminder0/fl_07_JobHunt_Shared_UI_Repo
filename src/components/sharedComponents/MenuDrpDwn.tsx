import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Button,
  Checkbox,
  ListItemText,
  Popover,
  TextField,
  Divider,
  MenuItem,
  List,
} from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { FixedSizeList } from 'react-window';

interface MenuDrpDwnProps {
  menuList: string[];
  placeholder: string;
  handleSelectedItem: (selectedItems: string[]) => void;
}

const MenuDrpDwn: React.FC<MenuDrpDwnProps> = ({ menuList, placeholder, handleSelectedItem }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [debouncedFilter, setDebouncedFilter] = useState<string>(filter);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Debounce the filter input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFilter(filter), 300);
    return () => clearTimeout(timer);
  }, [filter]);

  // Memoized filtered list
  const filteredMenuList = useMemo(() => {
    return menuList.filter((option) =>
      option.toLowerCase().includes(debouncedFilter.toLowerCase())
    );
  }, [menuList, debouncedFilter]);

  // Memoized toggle handler
  const handleToggle = useCallback(
    (option: string) => { 
      setSelectedItems((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    },
    []
  );

  // Memoized clear handler
  const handleClear = useCallback(() => {
    setSelectedItems([]);
  }, []);

  // Sync selected items with parent handler
  useEffect(() => {
    handleSelectedItem(selectedItems);
  }, [selectedItems]);

  // Render row for virtualized list
  const RenderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const option = filteredMenuList[index];

    return (
      <MenuItem
        key={option}
        onClick={() => handleToggle(option)}
        style={style}
        data-testid={`menu-item-${index}`} // Useful for debugging
      >
        <Checkbox size="small" checked={selectedItems.includes(option)} />
        <ListItemText primary={option} classes={{primary:'!text-base'}}/>
      </MenuItem>
    );
  };

  return (
    <>
      <Button
        variant="text"
        endIcon={<ExpandMoreOutlinedIcon />}
        onClick={handleClick}
      >
        {selectedItems.length === 0
          ? placeholder
          : `${placeholder} (${selectedItems.length > 1 ? `+${selectedItems.length - 1}` : selectedItems.length})`}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: { width: 270 },
          },
        }}
      >
        {/* Search Input */}
        {
          menuList.length > 10 && (
            <>
              <div style={{ padding: '8px' }}>
                <TextField
                  autoFocus 
                  placeholder="Search..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
              <Divider />
            </>

          )
        }

        {/* Conditionally render virtualized or regular list */}
        <div
          style={{
            maxHeight: '200px', // Limit height for scrollable list
            overflow: 'auto',
          }}
        >
          {menuList.length > 50 && false ? (
            <FixedSizeList
              height={200}
              width="100%"
              itemSize={30}
              itemCount={filteredMenuList.length}
              itemData={filteredMenuList}
            >
              {RenderRow}
            </FixedSizeList>
          ) : (
            <List>
              {filteredMenuList.map((option) => (
                <MenuItem
                  key={option}
                  onClick={() => handleToggle(option)}
                  data-testid={`menu-item-${option}`} // Debugging aid
                >
                  <Checkbox size="small" checked={selectedItems.includes(option)} />
                  <ListItemText primary={option} classes={{primary:'!text-base'}}/>
                </MenuItem>
              ))}
            </List>
          )}
        </div>
        <Divider />

        {/* Footer with Clear Button */}
        <div style={{ padding: '8px', textAlign: 'right' }}>
          <Button variant="text" size="small" onClick={handleClear} disabled={selectedItems.length === 0}>
            Clear
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default MenuDrpDwn;
