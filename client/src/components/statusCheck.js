// Project.js
// changes colour of chip depending on project status

const statusCheck = (status) => {
    switch(status) {
        case "Active":
            return "primary";
        case "Next Up":
            return "secondary";
        case "Paused":
            return "error";
        case "Done":
            return "success";
        default:
            return "primary";
      }    
}

export default statusCheck
