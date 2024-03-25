
function SubmitToNotion(firstName,lastName, email, password,role) {
    fetch("http://localhost:3500/api/people/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit new user to Notion");
        }
        return response.json();
      })
      .then(() => {
        console.log("Success!, new user created");
      })
      .catch((error) => {
        console.log("Error!", error.message);
      });
}

export default SubmitToNotion;