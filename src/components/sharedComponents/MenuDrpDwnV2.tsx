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
  handleSelectedItem: (selectedIds: number[]) => void;
  selectedId?: any;
}

const MenuDrpDwnV2: React.FC<MenuDrpDwnV2Props> = ({
  menuList,
  placeholder,
  handleSelectedItem,
  selectedId,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>(
    !selectedId ? [] : [selectedId]
  );
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
    return menuList.filter(
      (option) =>
        typeof option === "object" &&
        option.name?.toLowerCase().includes(debouncedFilter.toLowerCase())
    );
  }, [menuList, debouncedFilter]);

  // Toggle selection
  const handleToggle = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleClear = useCallback(() => {
    setSelectedIds([]);
  }, []);

  // Sync selected IDs with parent
  useEffect(() => {
    handleSelectedItem(selectedIds);
  }, [selectedIds]);

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
        key={option.id}
        onClick={() => handleToggle(option.id)}
        style={style}
      >
        <Checkbox size="small" checked={selectedIds.includes(option.id)} />
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
        {selectedIds.length === 0
          ? placeholder
          : `${placeholder} (${selectedIds.length})`}
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
                  key={option.id}
                  onClick={() => handleToggle(option.id)}
                >
                  <Checkbox
                    size="small"
                    checked={selectedIds.includes(option.id)}
                  />
                  <ListItemText
                    primary={option.name}
                    classes={{ primary: "!text-base" }}
                  />
                </MenuItem>
              ))}
            </List>
          )}
        </div>
        <Divider />
        <div style={{ padding: "8px", textAlign: "right" }}>
          <Button
            variant="text"
            size="small"
            onClick={handleClear}
            disabled={selectedIds.length === 0}
          >
            Clear
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default MenuDrpDwnV2;
