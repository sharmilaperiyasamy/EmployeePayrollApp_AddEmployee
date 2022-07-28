window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHTML();
});
const createInnerHTML = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    //let emplist = createEmployeePayrollJSON();
    for (const emp of emplist)
    {
     innerHtml = `${innerHtml}
        <tr>
        <td><img class="profile" alt=""
            src="${emp._profilePic}">
        </td>
        <td>${emp._name}</td>
        <td>${emp._gender}</td>
        <td><div class="dept-label">${emp._department}</div></td>
        <td>${emp._salary}</td>
        <td>${emp._startDate}</td>
        <td>
            <img id="1" onclick="remove(this)" alt="delete"
                src="Images/delete.svg">
            <img id="1" onclick="update(this)" alt="edit"
                src="Images/create.svg">
        </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
//UC5 creating a json object to assign the data
// const createEmployeePayrollJSON = () => {
//     let empPayrollList = [
//         {
//             _name: 'Saran Kumar',
//             _gender: 'male',
//             _department: 'Engineering',
//             _salary: '423000',
//             _startDate: '10 June 2022',
//             _note: 'Hi',
//             _id: new Date().getTime(),
//             _profilePic: '../assets/images/photo2.png'
//         },
//         {
//             _name: 'Saranya Dev',
//             _gender: 'female',
//             _department: 'sales',
//             _salary: '350000',
//             _startDate: '29 April 2021',
//             _note: 'Hi',
//             _id: new Date().getTime() + 1,
//             _profilePic: '../assets/images/photo1.png'
//         }
//     ];
//     return empPayrollList;
//   }