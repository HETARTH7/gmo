import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Checkbox,
  Typography,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  CheckCircleOutline,
  RadioButtonUnchecked,
} from "@mui/icons-material";

interface SubDepartment {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
  subDepartments: SubDepartment[];
}

const departmentData: Department[] = [
  {
    id: "1",
    name: "Customer Service",
    subDepartments: [
      {
        id: "1-1",
        name: "Support",
      },
      {
        id: "1-2",
        name: "Customer Success",
      },
    ],
  },
  {
    id: "2",
    name: "Design",
    subDepartments: [
      {
        id: "2-1",
        name: "Graphic Design",
      },
      {
        id: "2-2",
        name: "Product Design",
      },
      {
        id: "2-3",
        name: "Web Design",
      },
    ],
  },
];

const DepartmentList = () => {
  const [expandedDepartment, setExpandedDepartment] = useState<string | null>(
    null
  );
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<
    string[]
  >([]);

  const handleDepartmentClick = (departmentId: string) => {
    if (expandedDepartment === departmentId) {
      setExpandedDepartment(null);
    } else {
      setExpandedDepartment(departmentId);
    }
  };

  const handleDepartmentCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    departmentId: string
  ) => {
    const isChecked = event.target.checked;

    setSelectedDepartments((prevSelectedDepartments) => {
      if (isChecked) {
        return [...prevSelectedDepartments, departmentId];
      } else {
        const updatedSelectedDepartments = prevSelectedDepartments.filter(
          (id) => id !== departmentId
        );
        setSelectedSubDepartments((prevSelectedSubDepartments) =>
          prevSelectedSubDepartments.filter(
            (id) => !id.startsWith(departmentId)
          )
        );
        return updatedSelectedDepartments;
      }
    });

    setSelectedSubDepartments((prevSelectedSubDepartments) => {
      if (isChecked) {
        const subDepartmentIds =
          departmentData
            .find((department) => department.id === departmentId)
            ?.subDepartments.map((subDepartment) => subDepartment.id) || [];
        return [...prevSelectedSubDepartments, ...subDepartmentIds];
      } else {
        return prevSelectedSubDepartments.filter(
          (id) => !id.startsWith(departmentId)
        );
      }
    });
  };

  const handleSubDepartmentCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    subDepartmentId: string
  ) => {
    const isChecked = event.target.checked;

    setSelectedSubDepartments((prevSelectedSubDepartments) => {
      let updatedSelectedSubDepartments: string[];

      if (isChecked) {
        updatedSelectedSubDepartments = [
          ...prevSelectedSubDepartments,
          subDepartmentId,
        ];
      } else {
        updatedSelectedSubDepartments = prevSelectedSubDepartments.filter(
          (id) => id !== subDepartmentId
        );
      }

      const parentDepartmentId = subDepartmentId.split("-")[0];

      setSelectedDepartments((prevSelectedDepartments) => {
        const department = departmentData.find(
          (department) => department.id === parentDepartmentId
        );

        if (department) {
          const allSubDepartmentsSelected = department.subDepartments.every(
            (subDepartment) =>
              updatedSelectedSubDepartments.includes(subDepartment.id)
          );

          if (allSubDepartmentsSelected) {
            if (!prevSelectedDepartments.includes(parentDepartmentId)) {
              return [...prevSelectedDepartments, parentDepartmentId];
            }
          } else {
            return prevSelectedDepartments.filter(
              (id) => id !== parentDepartmentId
            );
          }
        }

        return prevSelectedDepartments;
      });

      return updatedSelectedSubDepartments;
    });
  };

  return (
    <div>
      <Typography variant="h6" color="inherit" component="div">
        Select the Departments
      </Typography>
      <List>
        {departmentData.map((department) => {
          const isDepartmentExpanded = expandedDepartment === department.id;
          const isDepartmentSelected = selectedDepartments.includes(
            department.id
          );
          return (
            <React.Fragment key={department.id}>
              <ListItem
                button
                onClick={() => handleDepartmentClick(department.id)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={isDepartmentSelected}
                    onChange={(e) =>
                      handleDepartmentCheckboxChange(e, department.id)
                    }
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<CheckCircleOutline />}
                  />
                </ListItemIcon>
                <ListItemText primary={department.name} />
                {isDepartmentExpanded ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={isDepartmentExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {department.subDepartments.map((subDepartment) => {
                    const isSubDepartmentSelected =
                      selectedSubDepartments.includes(subDepartment.id);

                    return (
                      <ListItem key={subDepartment.id} sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Checkbox
                            checked={isSubDepartmentSelected}
                            onChange={(e) =>
                              handleSubDepartmentCheckboxChange(
                                e,
                                subDepartment.id
                              )
                            }
                            icon={<RadioButtonUnchecked />}
                            checkedIcon={<CheckCircleOutline />}
                          />
                        </ListItemIcon>
                        <ListItemText primary={subDepartment.name} />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
};

export default DepartmentList;
