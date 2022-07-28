let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    //empPayrollList=getEmployeePayrollDataFromStorage();
    if (siteProperties.use_local_storage.match("true"))
    {
      getEmployeeData();
    }
    else
    {
      getDataFromServer();
    }
  });
  
  function getEmployeeData()
  {
    empPayrollList = localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
  }
  
  function processEmployeePayrollDataResponse()
  {
   document.querySelector('.emp-count').textContent = empPayrollList.length;
   createInnerHTML();
   localStorage.removeItem('editEmp');
}
function getDataFromServer() 
{
  makeServiceCall("GET", siteProperties.server_url, true)
      .then(responseText =>{
          empPayrollList = JSON.parse(responseText);
          processEmployeePayrollDataResponse();
      })
      .catch(error => {
          console.log("Get Error Status: " + JSON.stringify(error));
          empPayrollList = [];
          processEmployeePayrollDataResponse();
      });
}

// const getEmployeePayrollDataFromStorage = () => {
//     return localStorage.getItem('EmployeePayrollList') ? 
//             JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];  
// }

const createInnerHTML = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>"+
    "<th>Start Date</th><th>Actions</th>";
    if (empPayrollList.length == 0) return;
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
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td><img id="${empPayrollData.id}" src="../assets/images/delete.svg" onclick="remove(this)" alt="delete">
        <img id="${empPayrollData.id}" src="../assets/images/create.svg" onclick="update(this)" alt="edit"></td>
</tr>
   `;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
}

  const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
  }

  const update = (node) =>
{
    let empPayrollData = empPayrollList.find(empData => empData._id == node._id);
    if(!empPayrollData){return;} 
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData));
    window.location.replace(siteProperties.add_emp_payroll_page);
}

const remove = (node) =>
{
    let empPayrollData = empPayrollList.find(empData => empData._id == node._id);
    if (!empPayrollData)
    return;
    const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
    empPayrollList.splice(index, 1);
    if(siteProperties.use_local_storage.match("true"))
    {
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHTML();
    window.location.replace(siteProperties.Home_Page);
}
else{
    const deleteUrl = siteProperties.server_url + empData._id.toString();
    makeServiceCall("DELETE", deleteUrl, false)
        .then(responseText =>{
            createInnerHTML();
        })
        .catch(error =>{
            console.log("Delete Error Status: " + JSON.stringify(error));
        });
}
}
function checkName(name)
{
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (!nameRegex.test(name)) throw 'Name is Incorrect!';
}
function checkStartDate(startDate)
{
    let now = new Date();
    if (startDate > now)
    {
        throw "Start Date should not future date."
    }
    var diff = Math.abs(now.getTime() - startDate.getTime());
    if (diff/(1000 * 60 * 60 * 24) > 30)
    {
        throw "Start date is beyond 30 days."
    }
}