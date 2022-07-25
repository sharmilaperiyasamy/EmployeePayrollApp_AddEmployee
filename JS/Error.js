window.addEventListener('DOMContentLoaded', (event)=> {
const name= document.querySelector('#name');
const textError= document.querySelector('.text-error');
name.addEventListener('input', function() {
    if(name.value.length==0){
    textError.textContent="";
    return;
    }
    try{
        (new Employee()).name=name.value;
        textError.textContent="";
    }
    catch(e)
    {
        textError.textContent=e;
    }
});
const salary= document.querySelector('#salary');
const output= document.querySelector('.salary-output');
output.textContent=salary.value;
salary.addEventListener('input', function() {
    output.textContent=salary.value;
});
});

const save=()=> {
    try{
        let Employee = createEmployeePayroll();
        createAndUpdateStorage(Employee);
    }
        catch(e)
        {
            return;
        }
    }
    function createAndUpdateStorage(Employee) {
        let EmployeeList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
        if(EmployeeList != undefined)
        {
            EmployeeList.push(Employee);
        }
        else
        {
            EmployeeList=[Employee]
        }
        alert(EmployeeList.toString());
        localStorage.setItem("EmployeePayrollList", JSON.stringify(EmployeeList));
    }
    
    const createEmployeePayroll=()=>
    {
        let Employee=new Employee();
        try{
            Employee.name=getInputValueById('#name');
        }
        catch(e)
        {
            setTextValue('.text-error', e);
            throw e;
        }
        Employee.profilePic=getSelectedValues('[name=profile]').pop;
        Employee.gender=getSelectedValues('[name=gender]').pop;
        Employee.department=getSelectedValues('[name=department]');
        Employee.salary=getInputValueById('#salary');
        Employee.note=getInputValueById('#notes');
        let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
        Employee.date=Date.parse(date);
        alert(Employee.toString());
        return Employee;
    }
    const getSelectedValues = (propertyValue)=>
    {
        let allItems = document.querySelectorAll(propertyValue);
        let selItems=[];
        allItems.forEach(item=>{
            if(item.checked) selItems.push(item.value);
        });
        return selItems;
    }
/*1. query selector is the newer feature.
2.The query selector method can be used when selecting by element name,nesting or class name.
3.query selector lets you find elements with rules that can't be expressed with getElementById */

const getInputValueById=(id)=>
{
    let value=document.querySelector(id).value;
    return value;
}
// 1.getElementById is better supported than querySelector in older versions of the browsers.
// 2.The thing with the getElementById is that it only allows to select an element by its id.

const getInputElementValue=(id)=>
{
    let value=document.getElementById(id).value;
    return value;
}

const resetForm=()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}

const unsetSelectedValues = (propertyValue)=>
{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
    item.checked=false;
    });
}
const setTextValue=(id, value)=>
{
    const element=document.querySelector(id);
    element.textContent = value;
}
const setValue=(id, value)=>
{
    const element=document.querySelector(id);
    element.value = value;
}