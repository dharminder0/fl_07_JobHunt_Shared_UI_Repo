import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Button,
  Checkbox,
  ListItemText,
  Popover,
  TextField,
  Divider,
  MenuItem,
  List,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { FixedSizeList } from "react-window";

interface MenuItemType {
  id: number;
  name: string;
  value: string;
}

interface MenuDrpDwnV2Props {
  menuList: MenuItemType[];
  placeholder: string;
  handleSelectedItem: (selectedValues: string[]) => void;
}

const MenuDrpDwnByValue: React.FC<MenuDrpDwnV2Props> = ({
  menuList,
  placeholder,
  handleSelectedItem,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("");
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
      option.name?.toLowerCase().includes(debouncedFilter.toLowerCase())
    );
  }, [menuList, debouncedFilter]);

  // Toggle selection
  const handleToggle = useCallback((value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  }, []);

  const handleClear = useCallback(() => {
    setSelectedValues([]);
  }, []);

  // Sync selected values with parent
  useEffect(() => {
    handleSelectedItem(selectedValues);
  }, [selectedValues]);

  const RenderRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const option = filteredMenuList[index];

    return (
      <MenuItem
        key={option.value}
        onClick={() => handleToggle(option.value)}
        style={style}
      >
        <Checkbox
          size="small"
          checked={selectedValues.includes(option.value)}
        />
        <ListItemText
          primary={option.name}
          classes={{ primary: "!text-base" }}
        />
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
        {selectedValues.length === 0
          ? placeholder
          : `${placeholder} (${selectedValues.length})`}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { width: 270 } } }}
      >
        {menuList.length > 10 && (
          <>
            <div style={{ padding: "8px" }}>
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
        )}

        <div style={{ maxHeight: "200px", overflow: "auto" }}>
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
                  key={option.value}
                  onClick={() => handleToggle(option.value)}
                >
                  <Checkbox
                    size="small"
                    checked={selectedValues.includes(option.value)}
                  />
                  <ListItemText
                    primary={option.name}
                    classes={{ primary: "!text-base" }}
                  />
                </MenuItem>
              ))}
            </List>
          )}

          {menuList.length <= 0 && placeholder == "Client" && (
            <>
              <p className="mb-3 text-base text-center">
                No client has been added yet.
              </p>
            </>
          )}
        </div>
        <Divider />
        <div style={{ padding: "8px", textAlign: "right" }}>
          <Button
            variant="text"
            size="small"
            onClick={handleClear}
            disabled={selectedValues.length === 0}
          >
            Clear
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default MenuDrpDwnByValue;
