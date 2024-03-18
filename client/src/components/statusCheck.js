
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
      }    
}

export default statusCheck
