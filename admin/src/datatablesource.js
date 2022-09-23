export const studentColumns = [
    { field: '_id', headerName: 'Student ID', width: 250 },
    { field: 'full_name', headerName: 'Full Names', width: 200 },
    { field: 'teacher_id', headerName: 'Teacher ID', width: 100 },
    { field: 'department_id', headerName: 'Department ID', width: 230 }
];

export const teacherColumns = [
    { field: '_id', headerName: 'Teacher ID', width: 250 },
    { field: 'full_name', headerName: 'Full Names', width: 200 },
    { field: 'department_id', headerName: 'Department ID', width: 230 }
];

export const departmentColumns = [
    { field: '_id', headerName: 'Department ID', width: 250 },
    { field: 'teacher_id', headerName: 'Teacher ID', width: 200 },
    { field: 'department_name', headerName: 'Department Name', width: 230 }
];
