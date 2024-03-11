
function SubmitToNotion(fullName, email, password) {
    fetch("/api/people/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        password: password,
      }),
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