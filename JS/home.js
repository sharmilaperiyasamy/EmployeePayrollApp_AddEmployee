let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList=getEmployeePayrollDataFromStorage();
   document.querySelector('.emp-count').textContent = empPayrollList.length;
   createInnerHTML();
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? 
            JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];  
}

const createInnerHTML = () => {
    if (empPayrollList.length == 0) return;
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>"+
    "<th>Start Date</th><th>Actions</th>";
    
    let innerHtml = `${headerHtml}`;
    //0 here is array[0] -1st value [1]-second value
    //let empPayrollList=createEmployeePayrollJSON();
    //This is for more than one array of data for multiple data using for loop
    for(const empPayrollData of empPayrollList) {
     innerHtml=`${innerHtml}
<tr>
    <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
    <td>${empPayrollData._name}</td>
    <td>${empPayrollData._gender}</td>
    <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${empPayrollData._startDate}</td>
        <td><img name="${empPayrollData._id}" src="../assets/images/delete.svg" onclick="remove(this)" alt="delete">
        <img name="${empPayrollData._id}" src="../assets/images/create.svg" onclick="update(this)" alt="edit"></td>
</tr>
   `;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
}

//UC5 creating a json object to assign the data
// const createEmployeePayrollJSON = () => {
//     let empPayrollListLocal = [
//         {
//             _name: 'Saran Kumar',
//             _gender: 'male',
//             _department: ['Engineering', 'Sales'],
//             _salary: '423000',
//             _startDate: '10 June 2022',
//             _note: 'Hi',
//             _id: new Date().getTime(),
//             _profilePic: '../assets/images/photo2.png'
//         },
//         {
//             _name: 'Saranya Dev',
//             _gender: 'female',
//             _department: ['sales'],
//             _salary: '350000',
//             _startDate: '29 April 2021',
//             _note: 'Hi',
//             _id: new Date().getTime() + 1,
//             _profilePic: '../assets/images/photo1.png'
//         }
//     ];
//     return empPayrollListLocal;
//   }
  const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
  }