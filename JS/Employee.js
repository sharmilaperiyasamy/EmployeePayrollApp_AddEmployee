class Employee{
    id;
    name;
    salary;
    gender;
    startDate;

constructor(...params){
    this.id=params[0];
    this.name=params[1];
    this.salary=params[2];
    this.gender=params[3];
    this.startDate=params[4];
}
// //getter and setter methods
// get name() {return this._name; }
// set name(name) {
//     let nameRegex=RegExp('^[A-Z]{1}[a-z]{3,}$');
//     if(nameRegex.test(name))
//     this._name=name;
//     else
//     throw 'Name is incorrect!';
// }
//method
toString() {
    const options = { year: 'numeric', month:'long',day:'numeric'};
    const empDate = !this.startDate ? "undefined":this.startDate.toLocaleDateString("en-US",options);
    return "id=" + this.id+", name="+this.name+",salary=" + this.salary+", "+"gender="+this.gender+
    ", startDate="+empDate;
}
}