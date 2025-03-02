document.addEventListener("DOMContentLoaded", () => {
  gsap.to(".container", { opacity: 1, y: 0, duration: 1 });

  const uploadBox = document.getElementById("uploadBox");
  const resumeInput = document.getElementById("resumeInput");
  const fileNameDisplay = document.getElementById("fileName");
  const uploadBtn = document.getElementById("uploadBtn");

  if (!uploadBox || !resumeInput || !fileNameDisplay || !uploadBtn) {
    console.error(
      "Some elements are missing in the DOM. Check your HTML structure."
    );
    return;
  }

  const allowedTypes = ["application/pdf"];
  let isUploading = false;

  // Drag & Drop Events
  uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("drag-over");
  });

  uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("drag-over");
  });

  uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("drag-over");

    const file = e.dataTransfer.files[0];
    if (file && allowedTypes.includes(file.type)) {
      resumeInput.files = e.dataTransfer.files;
      fileNameDisplay.innerText = `Selected: ${file.name}`;
    } else {
      alert("Only PDF files are allowed.");
    }
  });

  // File Input Change Event
  resumeInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      fileNameDisplay.innerText = `Selected: ${file.name}`;
    } else {
      alert("Only PDF files are allowed.");
      resumeInput.value = "";
    }
  });

  // Function to Display Feedback
  function displayFeedback(feedback) {
    const feedbackContainer = document.createElement("div");
    feedbackContainer.classList.add("feedback-container");
    feedbackContainer.innerHTML = `
    <h2>Resume Feedback</h2>
    <p><strong>Score:</strong> ${feedback.score}/100</p>
    <p><strong>Comments:</strong> ${feedback.comments}</p>
    <p><strong>Suggestions:</strong> ${feedback.suggestions}</p>
  `;
    document.querySelector(".right-section").appendChild(feedbackContainer);
  }

  // Upload Resume Function
  function uploadResume() {
    if (isUploading) return;

    const file = resumeInput.files[0];
    if (!file) {
      alert("Please select a resume to upload.");
      return;
    }

    isUploading = true;
    uploadBtn.innerText = "Uploading...";
    uploadBtn.disabled = true;

    const formData = new FormData();
    formData.append("resume", file);

    fetch("http://localhost:5000/api/resumes/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        uploadBtn.innerText = "Upload & Analyze";
        uploadBtn.disabled = false;
        isUploading = false;
        if (data.success) {
          displayFeedback(data.feedback); // ✅ Display feedback properly
        } else {
          alert("Upload failed: " + data.error);
        }
      })
      .catch((error) => {
        // alert(
        //   "Resume Analysis Summary for Gopal Choudhary ✅ Strengths: 🔹 Project Detailing: The resume effectively highlights key projects, specifying technologies used and their impact. This demonstrates hands-on experience and problem-solving skills.🔹 Technical Skills: Clearly lists relevant programming languages and web technologies, which are essential for technical roles.🔹 Educational Background: Academic qualifications are well-structured, providing a clear picture of the candidate’s educational journey.⚡ Areas for Improvement:❌ Lack of Professional Experience: The resume does not mention any prior work experience, which may be a concern depending on the job role. Adding internships, freelance work, or personal projects with real-world applications can help.❌ Resume Formatting: The structure can be improved for better readability. The Tech Stack & Skills section, in particular, could be better organized to make it more impactful. 📊 Resume Score: 72/100 🎯 📌 Job Role Fit: 65% 💡 Suggestions for Improvement: 🔹 1️⃣ Add Quantifiable Achievements to Projects 🔹 2️⃣ Optimize for ATS (Applicant Tracking Systems) 🔹 3️⃣ Enhance Formatting & Readability 🔹 4️⃣ Add a Professional Summary 🔹 5️⃣ Expand Certifications & Training Details 🔹 6️⃣ Include Internship or Freelance Experience (If applicable)"
        // );
        uploadBtn.innerText = "Upload & Analyze";
        uploadBtn.disabled = false;
        isUploading = false;
      });
  }

  uploadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    uploadResume();
  });
});

particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
});

let tl = gsap.timeline();

tl.from(".logo", {
  y: -20,
  opacity: 0,
  delay: 0.5,
  duration: 0.8,
  stagger: 0.15,
});

tl.from("ul li", {
  y: -20,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
});

tl.from(".head1", {
  x: -40,
  opacity: 0,
  duration: 0.7,
},"-=0.5");

tl.from(".head3", {
  x: -50,
  opacity: 0,
  duration: 0.8,
},"-=1");

// tl.from(".head1", {
//   x: -20,
//   opacity: 0,
//   duration: 0.2,
//   stagger: 0.6,
// });

tl.from(
  ".right video",
  {
    x: 200,
    opacity: 0,
    duration: 0.5,
  },
  "-=0.5"
);
