async function fetchData() {
    const loadingText = document.getElementById("loading");
    const infoContainer = document.getElementById("info-container");
    const errorDiv = document.getElementById("error");
  
    // Hide error initially
    loadingText.style.display = "block";
    errorDiv.style.display = "none";
  
    try {
      const response = await fetch(
        "https://3f0tv6ipo2.execute-api.ap-southeast-3.amazonaws.com/dev/personal-info"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
  
      // Hide loading and error message
      loadingText.style.display = "none";
      errorDiv.style.display = "none";
  
      // Fill in the values
      const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
      document.getElementById("name").textContent = fullName 
      document.getElementById("email").textContent = data.email;
      document.getElementById("phone").textContent = data.phone;
      document.getElementById("address").textContent = data.address;
  
      // For LinkedIn and GitHub, set the link's text and href
      const linkedinLink = document.getElementById("linkedinUrl");
      linkedinLink.textContent = data.linkedinUrl;
      linkedinLink.href = data.linkedinUrl;
  
      const githubLink = document.getElementById("githubUrl");
      githubLink.textContent = data.githubUrl;
      githubLink.href = data.githubUrl;
  
      // Show the container
      infoContainer.style.display = "block";
    } catch (error) {
      loadingText.style.display = "none";
      errorDiv.style.display = "block";
      console.error("Error:", error);
    }
  }
  
  // Fetch data on page load
  window.onload = fetchData;