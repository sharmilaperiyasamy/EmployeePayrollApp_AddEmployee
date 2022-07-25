
window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHTML();
});

const createInnerHTML = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>"+
    "<th>Start Date</th><th>Actions</th>";
    const innerHtml = `${headerHtml}`;
    //0 here is array[0] -1st value [1]-second value
    //let EmployeeList=createEmployeePayrollJSON()[0];
    let EmployeeList=createEmployeePayrollJSON();
    //This is for more than one array of data for multiple data using for loop
    for(const Employee of EmployeeList) {
        innerHtml=`${innerHtml}
    }
<tr>
    <td><img class="profile" alt="" src="${Employee._profilePic}"></td>
    <td>${Employee._name}</td>
    <td>${Employee._gender}</td>
    <td>${getDeptHtml(Employee._department)}</td>
        <td>${Employee._salary}</td>
        <td>${Employee._startDate}</td>
        <td><img name="${Employee._id}" src="../assets/images/delete.svg" onclick="remove(this)" alt="delete">
        <img name="${Employee._id}" src="../assets/images/create.svg" onclick="update(this)" alt="edit"></td>
</tr>
   `;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
}
// UC5 creating a json object to assign the data
const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Saran Kumar',
            _gender: 'male',
            _department: ['Engineering', 'Sales'],
            _salary: '423000',
            _startDate: '10 June 2022',
            _note: 'Hi',
            _id: new Date().getTime(),
            _profilePic: '../assets/images/photo2.png'
        },
        {
            _name: 'Saranya Dev',
            _gender: 'female',
            _department: ['sales'],
            _salary: '350000',
            _startDate: '29 April 2021',
            _note: 'Hi',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/images/photo1.png'
        }
    ];
    return empPayrollListLocal;
  }
  const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
  }