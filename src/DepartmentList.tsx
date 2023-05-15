import React, { useState } from "react";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

interface SubDepartment {
  id: number;
  name: string;
}

const departmentData: Department[] = [
  {
    id: 1,
    name: "Department A",
    subDepartments: [
      { id: 1, name: "Sub Department A1" },
      { id: 2, name: "Sub Department A2" },
      { id: 3, name: "Sub Department A3" },
    ],
  },
  {
    id: 2,
    name: "Department B",
    subDepartments: [
      { id: 4, name: "Sub Department B1" },
      { id: 5, name: "Sub Department B2" },
      { id: 6, name: "Sub Department B3" },
    ],
  },
];

const DepartmentList: React.FC = () => {
  const [expandedDepartments, setExpandedDepartments] = useState<number[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<
    number[]
  >([]);

  const handleDepartmentToggle = (departmentId: number) => {
    setExpandedDepartments((prevExpanded) => {
      if (prevExpanded.includes(departmentId)) {
        return prevExpanded.filter((id) => id !== departmentId);
      } else {
        return [...prevExpanded, departmentId];
      }
    });
  };

  const handleSubDepartmentSelect = (subDepartmentId: number) => {
    setSelectedSubDepartments((prevSelected) => {
      if (prevSelected.includes(subDepartmentId)) {
        return prevSelected.filter((id) => id !== subDepartmentId);
      } else {
        return [...prevSelected, subDepartmentId];
      }
    });
  };

  const isDepartmentExpanded = (departmentId: number) => {
    return expandedDepartments.includes(departmentId);
  };

  const isSubDepartmentSelected = (subDepartmentId: number) => {
    return selectedSubDepartments.includes(subDepartmentId);
  };

  return (
    <List component="nav">
      {departmentData.map((department) => (
        <div key={department.id}>
          <ListItem
            button
            onClick={() => handleDepartmentToggle(department.id)}
          >
            <ListItemText primary={department.name} />
            {isDepartmentExpanded(department.id) ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItem>
          <Collapse
            in={isDepartmentExpanded(department.id)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment) => (
                <ListItem
                  key={subDepartment.id}
                  button
                  onClick={() => handleSubDepartmentSelect(subDepartment.id)}
                  style={{ paddingLeft: "20px" }}
                  selected={isSubDepartmentSelected(subDepartment.id)}
                >
                  <ListItemText primary={subDepartment.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
