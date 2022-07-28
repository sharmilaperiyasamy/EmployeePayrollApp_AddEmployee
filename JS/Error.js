let isUpdate=false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event)=> {
const name= document.querySelector('#name');
const textError= document.querySelector('.text-error');
name.addEventListener('input', function() {
    if(name.value.length==0){
        textError.textContent="";
    //setTextValue('.text-error',"");
    return;
    }
    try{
        // (new Employee()).name=name.value;
        // setTextValue('.text-error',"");
        checkName(name.value);
        textError.textContent="";
    }
    catch(e)
    {
        textError.textContent= e;
    }
});

const salary= document.querySelector('#salary');
//const output= document.querySelector('.salary-output');
//output.textContent=salary.value;
setTextValue('.salary-output',salary.value);
salary.addEventListener('input', function() {
    //output.textContent=salary.value;
    setTextValue('.salary-output',salary.value);
});

const date = document.querySelector('#date');
date.addEventListener('input', function(){
    let startDate=new Date(Date.parse(getInputValueById('#day')+" "+
    getInputValueById('#month')+" "+getInputValueById('#year')));
    try {
        (new Employee()).startDate = new Date(Date.parse(startDate));
        setTextValue('.date-error', "");
    }
    catch (e)
    {
        setTextValue('.date-error', e);
    }
});
checkForUpdate();
});

// const save=()=> {
//     try{
//         let employeePayrollData = createEmployeePayroll();
//         createAndUpdateStorage(employeePayrollData);
//     }
//         catch(e)
//         {
//             return;
//         }
//     }
    const createAndUpdateStorage =()=> {
        let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
        if(employeePayrollList)
        {
            let empPayrollData=employeePayrollList.find(empData=>empData._id==employeePayrollObj._id)
        if(!empPayrollData)
        {
            employeePayrollList.push(employeePayrollObj);
        }
        else
        {
            const index=employeePayrollList.map(empData=>empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1,employeePayrollObj);
        }   
        }
        else
        {
            employeePayrollList=[employeePayrollObj]
        }
         alert(employeePayrollList.toString());
        localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    }
    
    // const createEmployeePayroll=()=>
    // {
    //     let employeePayrollData=new Employee();
    //     try{
    //         employeePayrollData.name=getInputValueById('#name');
    //     }
    //     catch(e)
    //     {
    //         setTextValue('.text-error', e);
    //         throw e;
    //     }
    //     employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
    //     employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
    //     employeePayrollData.department=getSelectedValues('[name=department]');
    //     employeePayrollData.salary=getInputValueById('#salary');
    //     employeePayrollData.note=getInputValueById('#notes');
    //     let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    //     employeePayrollData.startDate=new Date(Date.parse(date));
    //     alert(employeePayrollData.toString());
    //     return employeePayrollData;
    // }
    const save=(event)=>
    {
        //event.preventDefault();
        //event.stopPropagation();
        try{
            setEmployeePayrollObject();
            if(siteProperties.use_local_storage.match("true")){
            createAndUpdateStorage();
            resetForm();
            window.location.replace(siteProperties.home_page);
        }else {
            createEmployeeJsonServer();
         resetForm();    
        }
        }
        catch(e)
        {
            return;
        }
    }
    
    
    function createEmployeeJsonServer()
{
    let postUrl = siteProperties.server_url;
    let methodCall = "POST";
    if(isUpdate){
        methodCall = "PUT";
        postUrl = siteProperties.server_url + employeePayrollObj.id.toString();
    }
    makeServiceCall(methodCall, postUrl, true, employeePayrollObj)
        .then(responseText =>{
            resetForm();
            window.location.replace(siteProperties.home_page);
        })
        .catch(error =>{
            throw error;
        });
}

    const setEmployeePayrollObject =()=>
    {
        if(!isUpdate && siteProperties.use_local_storage.match("true")){
            employeePayrollObj.id = createNewEmployeeId();
        } 
        employeePayrollObj._name=getInputValueById('#name');
        employeePayrollObj._profilePic=getSelectedValues('[name=profile]').pop();
        employeePayrollObj._gender=getSelectedValues('[name=gender]').pop();
        employeePayrollObj._department=getSelectedValues('[name=department]');
        employeePayrollObj._salary=getInputValueById('#salary');
        employeePayrollObj._note=getInputValueById('#notes');
        let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
        employeePayrollObj._startDate=date;
    }

    const createNewEmployeeId=()=>
    {
        let empId = localStorage.getItem("EmployeeId");
        empId=!empId?1:(parseInt(empId)+1).toString();
        localStorage.setItem("EmployeeId",empId);
        return empId;
    }
    const createEmployeePayrollData=(id)=>
    {
        let employeePayrollData=new Employee();
        if (!id) employeePayrollData.id=createNewEmployeeId;
        else employeePayrollData.id=id;
        setEmployeePayrollData(employeePayrollData);
        return employeePayrollData;
    }

    const setEmployeePayrollData =(employeePayrollData)=>
    {
        try{
            employeePayrollData.name=employeePayrollObj._name;
        }
        catch(e)
        {
            setTextValue('.text-error', e);
            throw e;
        }
        employeePayrollData.profilePic=employeePayrollObj._profilePic;
        employeePayrollData.gender=employeePayrollObj._gender;
        employeePayrollData.department=employeePayrollObj._department;
        employeePayrollData.salary=employeePayrollObj._salary;
        employeePayrollData.note=employeePayrollObj._note;
        try{
        employeePayrollData.startDate=new Date(Date.parse(employeePayrollObj._startDate));
        }
        catch(e)
        {
            setTextValue('.date-error', e);
            throw e;
        }
        alert(employeePayrollData.toString())
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
const setSelectedValues = (propertyValue, value) =>
{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value))
        {
            if (value.includes(item.value))
            {
                item.checked = true;
            }
        }
        else if (item.value == value)
            item.checked = true;
    });
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
const setSelectedIndex=()=>
{
    const element=document.querySelector(id);
    element.selectedIndex=index;
}
const setForm = ()=>
{
    setValue('#id', employeePayrollObj._id);
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary)
    setValue('#notes', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);   
}
const checkForUpdate=()=>
{
    const employeePayrollJSON = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJSON ? true : false;
    if (!isUpdate)
    return;
    employeePayrollObj = JSON.parse(employeePayrollJSON);
    setForm();
}