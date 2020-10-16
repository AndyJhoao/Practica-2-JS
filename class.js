class stack {
    constructor(){
        this.stack=[];
    }

push(Element) {
    this.stack.push(Element);
    return this.stack;
}
pop() {
    return this.stack.pop();
}
peek() {
    return this.stack[this.stack.length -1];
}
size() {
    return this.stack.length;
}
print() {
    console.log(this.stack);
}


}
