
window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHTML();
});

const createInnerHTML = () => {
    const innerHtml = `<tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
</tr>
<tr>
    <td><img class="profile" alt="" src="../assets/images/photo2.png"></td>
    <td>Surya Kumar</td>
    <td>Male</td>
    <td><div class="dept-label">HR</div>
        <div class="dept-label">Sales</div>
        <div class="dept-label">Finance</div></td>
        <td>289000</td>
        <td>10 Dec 2020</td>
        <td><img id="1" src="../assets/images/delete.svg" onclick="remove(this)" alt="delete">
        <img id="1" src="../assets/images/create.svg" onclick="update(this)" alt="edit"></td>
</tr>`
    ;
    document.querySelector("#table-display").innerHTML = innerHtml;
}