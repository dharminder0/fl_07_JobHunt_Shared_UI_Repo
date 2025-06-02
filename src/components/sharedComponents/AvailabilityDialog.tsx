import React, { useEffect, useState } from "react";
import { AvailabilityStatus } from "../sharedService/shareData";
import { Button } from "@mui/material";

interface AvailabilityDialogProps {
  isOpen: boolean;
  selectedIds: any;
  onClose: () => void;
  onSave: (id: number) => void;
}

const AvailabilityDialog: React.FC<AvailabilityDialogProps> = ({
  isOpen,
  selectedIds,
  onClose,
  onSave,
}) => {
  const [selectedId, setSelectedId] = useState<number>(1);
  useEffect(() => {
    setSelectedId(selectedIds.availabilityId);
  }, [selectedIds]);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h5 className="text-heading mb-4">Update Availability Status</h5>
        <form className="space-y-3">
          {AvailabilityStatus.map((status: any) => (
            <label
              key={status.id}
              className="flex items-center space-x-2 cursor-pointer text-base"
            >
              <input
                type="radio"
                name="availability"
                value={status.id}
                checked={selectedId === status.id}
                onChange={() => setSelectedId(status.id)}
                className="form-radio text-blue-600"
              />
              <span>{status.name}</span>
            </label>
          ))}
        </form>

        <div className="mt-6 flex justify-end space-x-3">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>

          <Button onClick={() => onSave(selectedId)} variant="contained">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityDialog;
