class Employee {
    //getter and setter methods
    get id() {return this._id;}
    set id(id){
        this._id=id;
    }
    get name() {return this._name; }
    set name(name) {
    let nameRegex=RegExp('^[A-Z]{1}[a-zA-z]{2,}$');
    if(nameRegex.test(name))
    this._name=name;
    else
    throw 'Name is incorrect!'
    }
    get profilePic() {return this._profilePic;}
    set profilePic(profilePic){
        this._profilePic=profilePic;
    }
    get gender() {return this._gender;}
    set gender(gender){
        this._gender=gender;
    }
    get department() {return this._department;}
    set department(department){
        this._department=department;
    }
    get salary() {return this._salary;}
    set salary(salary){
        this._salary=salary;
    }
    //date should not be a future date or not beyond 30 days
    // get startDate() { return this._startDate; }
    // set startDate(startDate) {
    //     let now = new Date();
    //     var diff = Math.abs(now.getTime() - startDate.getTime());
    //     if (startDate > now)
    //     {
    //         throw "Start Date should not future date."
    //     }
    //     if (diff/(1000 * 60 * 60 * 24) > 30)
    //     {
    //         throw "Start date is beyond 30 days."
    //     }
    //     this._startDate = startDate; 
    // }
    get startDate() {return this._startDate;}
    set startDate(startDate){
        this._startDate=startDate;
    }
    get note() {return this._note;}
    set note(note){
        this._note=note;
    }

//method
toString() {
    const options = { year: 'numeric', month:'long',day:'numeric'};
    const startDate = !this.startDate ? "undefined":this.startDate.toLocaleDateString("en-US",options);
    return "id=" + this.id+", name="+this.name+", profilePic="+this.profilePic+", gender="+this.gender
    +", department="+this.department+", salary=" + this.salary+", startDate="+startDate+", note="+this._note;
}
}